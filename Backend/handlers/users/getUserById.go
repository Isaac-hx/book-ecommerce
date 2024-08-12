package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetUserById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.Param("id")

	var user struct {
		ID        uint   `json:"id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		AvatarURL string `json:"avatar_url"`
		Phone     string `json:"phone"`
		Email     string `json:"email"`
		Address   string `json:"address"`
		CreatedAt string `json:"created_at"`
	}

	if err := db.Table("users").
		Select("users.id, profiles.first_name, profiles.last_name, profiles.avatar_url, profiles.phone, users.email_address as email, profiles.address, users.created_at").
		Joins("left join profiles on profiles.user_id = users.id").
		Where("users.id = ?", userID).
		Scan(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load user data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}
