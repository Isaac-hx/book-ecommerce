package authors

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type AuthorInput struct {
	Name string `json:"name" binding:"required"`
}

func CreateAuthor(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var input AuthorInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	author := models.Author{Name: input.Name}
	db.Create(&author)

	c.JSON(http.StatusOK, gin.H{"message": "data berhasil dibuat"})
}




