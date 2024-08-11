package cart

import (
	"Backend/models"
	"Backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteCart(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var cart models.Cart

	if err := utils.TokenValid(c); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	userID, err := utils.ExtractTokenUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Could not extract user ID from token"})
		return
	}

	if err := c.ShouldBindJSON(&cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Where("user_id = ? AND book_id = ?", userID, cart.BookID).First(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&cart)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
