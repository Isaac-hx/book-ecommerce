package categories

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllCategory(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var category []models.Category
	db.Find(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}

func GetCategoryById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	var category models.Category

	queryById := db.First(&category, id).Error
	if queryById != nil {
		switch queryById {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
				"message": queryById.Error(),
			})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"data": category,
	})
}
