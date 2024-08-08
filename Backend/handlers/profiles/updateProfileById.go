package profiles

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func UpdateProfileById(c *gin.Context) {
	// db := c.MustGet("db").(*gorm.DB)
	// var input map[string]interface{}
	userID := c.MustGet("userID").(uint)
	fmt.Println(userID)

	// var profile models.Profile
	// if err := db.First(&profile).Where("user_id",userID); err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
	// 	return
	// }

	// if profile.UserID != userID {
	// 	c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized"})
	// 	return
	// }

	// if err := c.ShouldBindJSON(&input); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	// if avatarURL, ok := input["avatar_url"].(string); ok {
	// 	if _, err := url.ParseRequestURI(avatarURL); err != nil {
	// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid avatar URL"})
	// 		return
	// 	}
	// 	profile.AvatarURL = avatarURL
	// }
	// if firstName, ok := input["first_name"].(string); ok {
	// 	profile.FirstName = firstName
	// }
	// if lastName, ok := input["last_name"].(string); ok {
	// 	profile.LastName = lastName
	// }
	// if phone, ok := input["phone"].(string); ok {
	// 	profile.Phone = phone
	// }
	// if address, ok := input["address"].(string); ok {
	// 	profile.Address = address
	// }

	// if err := db.Save(&profile).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	// 	return
	// }

	// c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}


