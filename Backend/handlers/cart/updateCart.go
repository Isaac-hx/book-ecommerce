package cart

import (
	"Backend/models"
	"Backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateCart(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var request CartInput

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON provided"})
		return
	}

	if err := utils.TokenValid(c); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	userID, err := utils.ExtractTokenUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Could not extract user ID from token"})
		return
	}

	var cart models.Cart
	if err := db.Where("user_id = ? AND book_id = ?", userID, request.BookID).First(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	cart.Quantity = request.Quantity
	if err := db.Save(&cart).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update quantity"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "cart updated successfully"})
}
