package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrdersByUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.MustGet("userID").(uint) 

	var orders []models.Order
	if err := db.Preload("OrderItems").Preload("PaymentMethod").Preload("User").Where("user_id = ?", userID).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Server Error"})
		return
	}

	if len(orders) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No orders found"})
		return
	}

	var dataOrder []struct {
		ID                uint   `json:"order_id"`
		StatusOrder       string `json:"status_order"`
		ProofPayment      string `json:"proof_payment"`
		PaymentMethodId   int    `json:"payment_method_id"`
		PaymentMethodName string `json:"payment_method_name"`
		OrderAt           string `json:"order_at"`
	}

	for _, item := range orders {
		dataOrder = append(dataOrder, struct {
			ID                uint   `json:"order_id"`
			StatusOrder       string `json:"status_order"`
			ProofPayment      string `json:"proof_payment"`
			PaymentMethodId   int    `json:"payment_method_id"`
			PaymentMethodName string `json:"payment_method_name"`
			OrderAt           string `json:"order_at"`
		}{
			ID:                item.ID,
			StatusOrder:       item.StatusOrder,
			ProofPayment:      item.ProofPayment,
			PaymentMethodId:   item.PaymentMethodID,
			PaymentMethodName: item.PaymentMethod.Name,
			OrderAt:           item.CreatedAt.String(),
		})
	}

	c.JSON(http.StatusOK, gin.H{"data": dataOrder})
}

func GetOrdersUserById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.MustGet("userID").(uint)
	orderID := c.Param("id")

	var order models.Order
	err := db.Preload("OrderItems").Preload("PaymentMethod").Preload("User").Where("user_id = ? AND id = ?", userID, orderID).First(&order).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Order not found"})
		return
	}

	var profile models.Profile
	err = db.Where("user_id = ?", userID).First(&profile).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Profile not found"})
		return
	}

	type bookOrder struct {
		ID            uint   `json:"book_id"`
		SubTotal      uint   `json:"subtotal"`
		Quantity      uint   `json:"quantity"`
		CoverUrl      string `json:"cover_url"`
		Title         string `json:"title"`
		PricePerBook  int    `json:"price_per_book"`
	}

	var books []bookOrder
	for _, item := range order.OrderItems {
		var book models.Book
		if err := db.First(&book, item.BookID).Error; err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Book not found"})
			return
		}

		books = append(books, bookOrder{
			ID:           book.ID,
			SubTotal:     item.SubTotal,
			Quantity:     item.QuantityTotal,
			CoverUrl:     book.CoverUrl,
			Title:        book.Title,
			PricePerBook: book.Price,
		})
	}

	type orderDetail struct {
		ID                uint        `json:"order_id"`
		StatusOrder       string      `json:"status_order"`
		ProofPayment      string      `json:"proof_payment"`
		PaymentMethodID   uint        `json:"payment_method_id"`
		PaymentMethodName string      `json:"payment_method_name"`
		TotalPrice        int         `json:"total_price"`
		FirstName         string      `json:"first_name"`
		LastName          string      `json:"last_name"`
		Address           string      `json:"address"`
		EmailAddress      string      `json:"email_address"`
		PaymentHolderName string      `json:"payment_holder_name"`
		PaymentHolderNumber string    `json:"payment_holder_number"`
		Books             []bookOrder `json:"list_order_book"`
	}

	data := orderDetail{
		ID:                order.ID,
		StatusOrder:       order.StatusOrder,
		ProofPayment:      order.ProofPayment,
		PaymentMethodID:   order.PaymentMethod.ID,
		PaymentMethodName: order.PaymentMethod.Name,
		TotalPrice:        order.TotalPrice,
		EmailAddress:      order.User.EmailAddress,
		FirstName:         profile.FirstName,
		LastName:          profile.LastName,
		Address:           profile.Address,
		PaymentHolderName: order.PaymentMethod.AccountHoldername,
		PaymentHolderNumber: order.PaymentMethod.AccountNumber,
		Books:             books,
	}

	c.JSON(http.StatusOK, gin.H{"data": data})
}