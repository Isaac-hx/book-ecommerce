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


