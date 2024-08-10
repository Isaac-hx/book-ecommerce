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
		ProofPayment    string `json:"proof_payment"`
		PaymentMethodID int    `json:"payment_method_id"`
		TotalPrice      int    `json:"total_price"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var paymentMethod models.PaymentMethod
	if err := db.First(&paymentMethod, input.PaymentMethodID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment method not found"})
		return
	}

	order := models.Order{
		StatusOrder:     "pending",
		ProofPayment:    input.ProofPayment,
		PaymentMethodID: input.PaymentMethodID,
		TotalPrice:      input.TotalPrice,
		UserID:          userID,
	}

	if err := db.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Order User berhasil dibuat"})
}
