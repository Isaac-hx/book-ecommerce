package books

import (
	"Backend/models"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetListBooks(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var listBooks []models.Book
	var totalData int64

	pageIndex := c.DefaultQuery("page_index", "0")
	pageIndexInt, _ := strconv.Atoi(pageIndex)
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset := pageIndexInt * limit

	orderBy := c.DefaultQuery("order_by", "price")
	sortBy := c.DefaultQuery("sort_by", "desc")
	title := c.DefaultQuery("title", "")
	category := c.Query("category")

	if category != "" {
		db.Model(&models.Book{}).
			Joins("JOIN book_categories ON book_categories.book_id = books.id").
			Joins("JOIN categories ON categories.id = book_categories.category_id").
			Where("categories.name = ?", category).
			Where("title LIKE ?", "%"+title+"%").
			Count(&totalData)
	} else {
		db.Model(&models.Book{}).
			Where("title LIKE ?", "%"+title+"%").
			Count(&totalData)
	}

	var queryError error
	if category != "" {
		queryError = db.Preload("Categories").
			Preload("Author").
			Preload("Stocks").
			Joins("JOIN book_categories ON book_categories.book_id = books.id").
			Joins("JOIN categories ON categories.id = book_categories.category_id").
			Where("categories.name = ?", category).
			Where("title LIKE ?", "%"+title+"%").
			Order(fmt.Sprintf("%s %s", orderBy, sortBy)).
			Limit(limit).
			Offset(offset).
			Find(&listBooks).Error
	} else {
		queryError = db.Preload("Categories").
			Preload("Author").
			Preload("Stocks").
			Where("title LIKE ?", "%"+title+"%").
			Order(fmt.Sprintf("%s %s", orderBy, sortBy)).
			Limit(limit).
			Offset(offset).
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
		ID       		uint   `json:"id"`
		Title    		string `json:"title"`
		Description		string `json:"description"`
		Author   		string `json:"author_name"`
		Price    		int    `json:"price"`
		CoverURL 		string `json:"cover_url"`
		Quantity 		uint   `json:"quantity"`
	}

	for _, book := range listBooks {
		booksData = append(booksData, struct {
			ID       		uint   `json:"id"`
			Title    		string `json:"title"`
			Description		string `json:"description"`
			Author   		string `json:"author_name"`
			Price    		int    `json:"price"`
			CoverURL 		string `json:"cover_url"`
			Quantity 		uint   `json:"quantity"`
		}{
			ID:       		book.ID,
			Title:    		book.Title,
			Description:	book.Description,
			Author:   		book.Author.Name,
			Price:    		book.Price,
			CoverURL: 		book.CoverUrl,
			Quantity: 		book.Stocks.Quantity,
		})
	}

	// Kalkulasi total number of pages
	totalPages := (int(totalData) + limit - 1) / limit

	c.JSON(http.StatusOK, gin.H{
		"data":            booksData,
		"total_data":      totalData,  // Total jumlah buku sesuai pencarian
		"total_pages":     totalPages, // Total halaman yang ada berdasarkan jumlah data
		"current_page":    pageIndexInt + 1,
		"page_size":       limit,
	})
}



func GetBookById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var book models.Book
	id := c.Param("id")
	query := db.Preload("Categories").
		Preload("Author").
		Preload("Stocks"). // Preload Author
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
		Title         string            `json:"title"`
		Description   string            `json:"description"`
		CoverUrl      string            `json:"cover_url"`
		TotalPages    uint              `json:"total_pages"`
		Weight        float32           `json:"weight"`
		Width         float32           `json:"width"`
		Height        float32           `json:"height"`
		Language      string            `json:"language"`
		PublishedDate time.Time         `json:"published_date"`
		Price         int               `json:"price"`
		AuthorName    string            `json:"author_name"`
		PublisherName string            `json:"publisher_name"`
		Quantity      uint              `json:"quantity"`
		Category      []models.Category `json:"category"`
	}
	bookData.Title = book.Title
	bookData.Description = book.Description
	bookData.CoverUrl = book.CoverUrl
	bookData.TotalPages = book.TotalPages
	bookData.Weight = book.Weight
	bookData.PublishedDate = book.PublishedDate
	bookData.Width = book.Width
	bookData.Height = book.Height
	bookData.Language = book.Language
	bookData.Price = book.Price
	bookData.AuthorName = book.Author.Name
	bookData.PublisherName = book.Publisher.Name
	bookData.Category = book.Categories
	bookData.Quantity = book.Stocks.Quantity
	c.JSON(http.StatusOK, gin.H{
		"data": bookData,
	})
}
