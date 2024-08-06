package categories

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteCategory(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var category models.Category
	if err := db.Where("id = ?", c.Param("id")).First(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&category)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
