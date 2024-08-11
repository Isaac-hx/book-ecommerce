package authors

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetTotalRowAuthor(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var author models.Author
	type result struct {
		Total string `json:"total_authors"`
	}
	var data result
	queryCountRow := db.Model(&author).Select("COUNT(id) as total").Find(&data).Error
	if queryCountRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": queryCountRow.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": data})
}