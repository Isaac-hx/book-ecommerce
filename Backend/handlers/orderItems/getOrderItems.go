package orderItems

import (
	"Backend/models"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrderItems(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var orderItems []models.OrderItem

	if err := db.Preload("Book").Preload("Profile").Find(&orderItems).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItems})
}

func GetOrderItemsById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	id := c.Param("id")

	var orderItem models.OrderItem

	if err := db.Preload("Book").Preload("Profile").First(&orderItem, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "OrderItem not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orderItem})
}
