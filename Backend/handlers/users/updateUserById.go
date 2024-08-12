package users

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateUserById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.Param("id")

	var input struct {
		AvatarURL string `json:"avatar_url"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Address   string `json:"address"`
		Status    string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Status != "active" && input.Status != "blocked" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid status value"})
		return
	}

	var user models.User
	if err := db.Unscoped().Where("id = ?", userID).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find user"})
		return
	}

	var profile models.Profile
	if err := db.Where("user_id = ?", userID).First(&profile).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to find profile"})
		return
	}

	profile.AvatarURL = input.AvatarURL
	profile.FirstName = input.FirstName
	profile.LastName = input.LastName
	profile.Address = input.Address
	if err := db.Save(&profile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	if input.Status == "blocked" {
		// Soft delete: Set DeletedAt pada User dan ubah status menjadi "blocked"
		if err := db.Model(&user).Updates(map[string]interface{}{
			"status":     "blocked",
			"deleted_at": gorm.DeletedAt{},
		}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to block user"})
			return
		}
	} else if input.Status == "active" {
		// Set DeletedAt kembali ke NULL dan ubah status menjadi "active"
		if err := db.Unscoped().Model(&user).Updates(map[string]interface{}{
			"status":     "active",
			"deleted_at": nil,
		}).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to activate user"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
