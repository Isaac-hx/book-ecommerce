package categories

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CategoryInput struct {
	Name string `json:"name" binding:"required"`
	CategoryCover string `json:"category_cover" binding:"required"`

}

func CreateCategory(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var input CategoryInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category := models.Category{Name: input.Name,CategoryCover: input.CategoryCover}
	db.Create(&category)

	c.JSON(http.StatusOK, gin.H{"data": category})
}
