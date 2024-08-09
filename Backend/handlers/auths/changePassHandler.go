package auths

import (
	"net/http"

	"Backend/models"
	"Backend/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func ChangePasswordHandler(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var requestData struct {
		Password    string `json:"password" binding:"required"`
		NewPassword string `json:"new_password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	var user models.User
	result := db.First(&user, userID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found!"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(requestData.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid current password!"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(requestData.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password!"})
		return
	}

	user.Password = string(hashedPassword)
	db.Save(&user)

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully!"})
}
