package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"Backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type bookInput struct {
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

func GetListBooks(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var listBooks []models.Book
	var pageIndexInt = 0
	var numberOfPages = 1

	pageIndex := c.DefaultQuery("page_index", "0")
	if pageIndex != "0" {
		pageIndexing, _ := strconv.Atoi(fmt.Sprintf("%s%s", pageIndex, "0"))
		pageIndexInt += pageIndexing
		numberOfPageIndexing, _ := strconv.Atoi(pageIndex)
		numberOfPages += numberOfPageIndexing

	}
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	orderBy := c.DefaultQuery("order_by", "price")
	sortBy := c.DefaultQuery("sort_by", "desc")
	title := c.DefaultQuery("title", "")
	category := c.Query("category")

	var queryError error

	if category != "" {
		// Filter buku berdasarkan kategori jika kategori disediakan
		queryError = db.Preload("Categories").
			Preload("Author"). // Preload Author
			Joins("JOIN book_categories ON book_categories.book_id = books.id").
			Joins("JOIN categories ON categories.id = book_categories.category_id").
			Where("categories.name = ?", category).
			Where("title LIKE ?", "%"+title+"%").
			Order(fmt.Sprintf("%s %s", orderBy, sortBy)).
			Limit(limit).
			Offset(pageIndexInt).
			Find(&listBooks).Error
	} else {
		// Jika kategori tidak disediakan, cari berdasarkan title saja
		queryError = db.Preload("Categories").
			Preload("Author"). // Preload Author
			Where("title LIKE ?", "%"+title+"%").
			Order(fmt.Sprintf("%s %s", orderBy, sortBy)).
			Limit(limit).
			Offset(pageIndexInt).
			Find(&listBooks).Error
	}

	if queryError != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": queryError.Error(),
		})
		return
	}

	if len(listBooks) == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "No books found",
		})
		return
	}
	var booksData []struct {
		ID       uint   `json:"id"`
		Title    string `json:"title"`
		Author   string `json:"author"`
		Price    int    `json:"price"`
		CoverURL string `json:"cover_url"`
	}

	// Loop through the listBooks and transform data into the new structure
	for _, book := range listBooks {
		booksData = append(booksData, struct {
			ID       uint   `json:"id"`
			Title    string `json:"title"`
			Author   string `json:"author"`
			Price    int    `json:"price"`
			CoverURL string `json:"cover_url"`
		}{
			ID:       book.ID,
			Title:    book.Title,
			Author:   book.Author.Name,
			Price:    book.Price,
			CoverURL: book.CoverUrl,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"data":            booksData,
		"total_data":      len(booksData),
		"page_index":      pageIndexInt,
		"number_of_pages": numberOfPages,
	})
}

func GetBookById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var book models.Book
	id := c.Param("id")
	query := db.Preload("Categories").
		Preload("Author"). // Preload Author
		Preload("Publisher").
		Joins("JOIN book_categories ON book_categories.book_id = books.id").
		Joins("JOIN categories ON categories.id = book_categories.category_id").
		First(&book, id).Error

	if query != nil {
		switch query {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Data tidak ditemukan"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
			return
		}
	}

	var bookData struct {
		Title         string    `json:"title"`
		Description   string    `json:"description"`
		CoverUrl      string    `json:"cover_url"`
		TotalPages    uint      `json:"total_pages"`
		Weight        float32   `json:"weight"`
		Width         float32   `json:"width"`
		Height        float32   `json:"height"`
		Language      string    `json:"language"`
		PublishedDate time.Time `json:"published_date"`
		Price         int       `json:"price"`
		AuthorName    string    `json:"author_name"`
		PublisherName string    `json:"publisher_name"`
	}
	bookData.Title = book.Title
	bookData.Description = book.Description
	bookData.CoverUrl = book.CoverUrl
	bookData.TotalPages = book.TotalPages
	bookData.Weight = book.Weight
	bookData.Width = book.Width
	bookData.Height = book.Height
	bookData.Language = book.Language
	bookData.Price = book.Price
	bookData.AuthorName = book.Author.Name
	bookData.PublisherName = book.Publisher.Name

	c.JSON(http.StatusOK, gin.H{
		"data": bookData,
	})
}

func CreateBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var input bookInput
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

func DeleteBook(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var book models.Book
	if err := db.Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&book)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
