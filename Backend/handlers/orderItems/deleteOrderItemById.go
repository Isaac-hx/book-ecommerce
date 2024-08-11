package orderItems

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteOrderItem(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	orderItemID := c.Param("id")

	userID := c.MustGet("userID").(uint)

	var orderItem models.OrderItem
	if err := db.First(&orderItem, orderItemID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Order item not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	if orderItem.ProfileID != userID {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized to delete this order item"})
		return
	}

	if err := db.Delete(&orderItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order item successfully deleted"})
}
