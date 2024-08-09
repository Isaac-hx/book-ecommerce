package orderItems

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type OrderItemInput struct {
	TotalPrice    uint `json:"total_price"`
	QuantityTotal uint `json:"quantity_total"`
	BookID        uint `json:"book_id"`
	ProfileID     uint `json:"profile_id"`
}

type CreateOrderRequest struct {
	OrderItems      []OrderItemInput `json:"order_items"`
	PaymentMethodID int             `json:"payment_method_id"`
}

func CreateOrderItem(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var request CreateOrderRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the order
	var order models.Order
	order.StatusOrder = "pending"
	order.PaymentMethodID = 1 //default paymentmethod
	if err := db.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var orderItems []models.OrderItem
	for _, item := range request.OrderItems {
		orderItem := models.OrderItem{
			TotalPrice:    item.TotalPrice,
			QuantityTotal: item.QuantityTotal,
			OrderID:       order.ID, // Link to the newly created order
			BookID:        item.BookID,
			ProfileID:     item.ProfileID,
		}
		orderItems = append(orderItems, orderItem)
	}

	if err := db.Create(&orderItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "order dan item berhasil dibuat", "order_id": order.ID})
}