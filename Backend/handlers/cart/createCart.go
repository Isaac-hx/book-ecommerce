package cart

import (
	"Backend/models"
	"Backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CartInput struct {
	BookID   uint `json:"book_id" binding:"required"`
	Quantity uint `json:"quantity" binding:"required"`
}

func CreateCart(c *gin.Context) {
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

	cart.UserID = userID

	if err := db.Create(&cart).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}
