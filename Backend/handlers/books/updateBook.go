package books

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var book models.Book
	if err := db.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input BookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var categories []models.Category
	if err := db.Where("id IN ?", input.CategoryIDs).Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	updatedBook := models.Book{
		Title:         input.Title,
		Description:   input.Description,
		CoverUrl:      input.CoverUrl,
		TotalPages:    input.TotalPages,
		Weight:        input.Weight,
		Width:         input.Width,
		Height:        input.Height,
		Language:      input.Language,
		PublishedDate: input.PublishedDate,
		Price:         input.Price,
		AuthorID:      input.AuthorID,
		PublisherID:   input.PublisherID,
		Categories:    categories,
	}

	db.Model(&book).Updates(updatedBook)

	c.JSON(http.StatusOK, gin.H{"message" : "data berhasil diubah"})
}