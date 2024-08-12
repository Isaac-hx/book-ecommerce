package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllUsers(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var users []struct {
		ID        uint   `json:"id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		AvatarURL string `json:"avatar_url"`
		Email     string `json:"email"`
		Status    string `json:"status"`
	}

	if err := db.Table("users").
		Select("users.id, profiles.first_name, profiles.last_name, profiles.avatar_url, users.email_address as email, users.status").
		Joins("left join profiles on profiles.user_id = users.id").
		Scan(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load user data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}
