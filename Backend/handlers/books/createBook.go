package books

import (
	"Backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)
type BookInput struct {
	Title         string    `json:"title" binding:"required"`
	Description   string    `json:"description" binding:"required"`
	CoverUrl      string    `json:"cover_url" binding:"required"`
	TotalPages    uint      `json:"total_pages" binding:"required"`
	Weight        float32   `json:"weight" binding:"required"`
	Width         float32   `json:"width" binding:"required"`
	Height        float32   `json:"height" binding:"required"`
	Language      string    `json:"language" binding:"required"`
	PublishedDate time.Time `json:"published_date" binding:"required"`
	Price         int       `json:"price" binding:"required"`
	AuthorID      uint      `json:"author_id" binding:"required"`    // Foreign key
	PublisherID   uint      `json:"publisher_id" binding:"required"` // Foreign key
	CategoryIDs   []uint    `json:"category_ids" binding:"required"`
}


func CreateBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

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

	book := models.Book{
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

	
	if err := db.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book})
}