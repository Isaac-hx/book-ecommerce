package orderItems

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateOrderItemById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	orderItemID := c.Param("id")

	var orderItem models.OrderItem
	if err := db.First(&orderItem, orderItemID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"message": "OrderItem not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}

	var input OrderItemInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the fields if provided
	if input.TotalPrice != 0 {
		orderItem.TotalPrice = input.TotalPrice
	}
	if input.QuantityTotal != 0 {
		orderItem.QuantityTotal = input.QuantityTotal
	}
	if input.BookID != 0 {
		orderItem.BookID = input.BookID
	}
	if input.ProfileID != 0 {
		orderItem.ProfileID = input.ProfileID
	}

	if err := db.Save(&orderItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update order item"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order_item berhasil diubah"})
}

