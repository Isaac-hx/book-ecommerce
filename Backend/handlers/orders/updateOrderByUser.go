package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


func UpdateOrderProofPaymentByUser(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.MustGet("userID").(uint)
	orderID := c.Param("id")

	var order models.Order
	if err := db.Where("id = ? AND user_id = ?", orderID, userID).First(&order).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "Order not found or not accessible"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}

	var input struct {
		ProofPayment string `json:"proof_payment"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	order.ProofPayment = input.ProofPayment

	if err := db.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update proof payment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Proof payment updated successfully"})
}
