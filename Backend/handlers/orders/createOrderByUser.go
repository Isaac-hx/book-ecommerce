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
		Orders []struct {
			BookID   uint `json:"book_id" binding:"required"`
			Quantity uint `json:"quantity" binding:"required"`
		} `json:"orders" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Mulai transaksi
	tx := db.Begin()

	var totalOrderPrice int
	orderItems := []models.OrderItem{}

	for _, order := range input.Orders {
		// Cek jika buku ada dan ambil harga serta stoknya
		var book models.Book
		if err := tx.Preload("Stocks").First(&book, order.BookID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
			return
		}

		// Cek jika stok mencukupi
		if book.Stocks.Quantity < order.Quantity {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"error": "Insufficient stock for book ID: ", "book_id": order.BookID})
			return
		}

		// Hitung total harga untuk item pesanan
		subTotal := book.Price * int(order.Quantity)
		totalOrderPrice += subTotal

		// Tambahkan item pesanan ke dalam slice orderItems
		orderItem := models.OrderItem{
			SubTotal:      uint(subTotal),
			QuantityTotal: order.Quantity,
			Price:         book.Price,
			BookID:        order.BookID,
			ProfileID:     userID,
		}
		orderItems = append(orderItems, orderItem)

		// Kurangi stok buku
		book.Stocks.Quantity -= order.Quantity
		if err := tx.Save(&book.Stocks).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book stock"})
			return
		}

		// Hapus item dari keranjang
		if err := tx.Where("user_id = ? AND book_id = ?", userID, order.BookID).Delete(&models.Cart{}).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove item from cart"})
			return
		}
	}

	// Buat pesanan dengan status default "pending"
	order := models.Order{
		StatusOrder:     "pending",
		UserID:          userID,
		TotalPrice:      totalOrderPrice,
		PaymentMethodID: 1, // Metode pembayaran default
	}

	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Tambahkan OrderID ke setiap order item dan simpan ke dalam database
	for i := range orderItems {
		orderItems[i].OrderID = order.ID
		if err := tx.Create(&orderItems[i]).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
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
