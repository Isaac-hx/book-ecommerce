package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateOrderByUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.MustGet("userID").(uint)

	var input struct {
		BookID   uint `json:"book_id" binding:"required"`
		Quantity uint `json:"quantity" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Mulai transaksi
	tx := db.Begin()

	// Cek jika buku ada dan ambil harga serta stoknya
	var book models.Book
	if err := tx.Preload("Stocks").First(&book, input.BookID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	// Cek jika stok mencukupi
	if book.Stocks.Quantity < input.Quantity {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient stock"})
		return
	}

	// Hitung total harga untuk item pesanan
	totalPrice := book.Price * int(input.Quantity)

	// Buat pesanan dengan status default "pending"
	order := models.Order{
		StatusOrder:     "pending",
		UserID:          userID,
		TotalPrice:      totalPrice,
		PaymentMethodID: 1, // Metode pembayaran default
	}

	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Buat item pesanan
	orderItem := models.OrderItem{
		SubTotal:      uint(totalPrice),
		QuantityTotal: input.Quantity,
		Price:         book.Price,
		OrderID:       order.ID,
		BookID:        input.BookID,
		ProfileID:     userID,
	}

	if err := tx.Create(&orderItem).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Hapus item dari keranjang
	if err := tx.Where("user_id = ? AND book_id = ?", userID, input.BookID).Delete(&models.Cart{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove item from cart"})
		return
	}

	// Kurangi stok buku
	book.Stocks.Quantity -= input.Quantity
	if err := tx.Save(&book.Stocks).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book stock"})
		return
	}

	// Commit transaksi
	tx.Commit()

	// Preload User dan PaymentMethod pada Order untuk response
	if err := db.Preload("User").Preload("PaymentMethod").First(&order, order.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load order details"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Order successfully created", "order": order})
}
