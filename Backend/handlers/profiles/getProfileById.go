package profiles

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


func GetProfileByID(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var profile models.Profile
	id := c.Param("id")
	
	if err := db.First(&profile, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"data": profile})
}


// dibuat untuk debug all data saja
func GetAllProfiles(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var profiles []models.Profile

	if err := db.Find(&profiles).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": profiles})
}