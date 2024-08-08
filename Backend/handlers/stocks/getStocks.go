package stocks

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetListStock(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var listBookStocks []models.Book
	queryListStock := db.Preload("Stocks").Find(&listBookStocks).Error
	if queryListStock != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": queryListStock.Error(),
		})
		return

	}
	var stockData []struct {
		ID       uint   `json:"id"`
		Quantity uint   `json:"quantity"`
		Title    string `json:"title"`
	}

	// Loop through the listBooks and transform data into the new structure
	for _, book := range listBookStocks {
		stockData = append(stockData, struct {
			ID       uint   `json:"id"`
			Quantity uint   `json:"quantity"`
			Title    string `json:"title"`
		}{
			ID:       book.ID,
			Quantity: book.Stocks.Quantity,
			Title:    book.Title,
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"data": stockData,
	})
}
func GetStockById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	var stock models.Stock

	queryById := db.First(&stock, id).Error
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
		"data": stock,
	})
}
