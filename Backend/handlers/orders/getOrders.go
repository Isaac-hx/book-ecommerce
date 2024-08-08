package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrder(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	if err := db.Preload("OrderItems").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}
