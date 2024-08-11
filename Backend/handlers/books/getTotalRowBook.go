package books

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


func GetTotalRowBooks(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var books models.Book
	type result struct {
		Total string `json:"total_books"`
	}
	var data result
	queryCountRow:=db.Model(&books).Select("COUNT(id) as total").Find(&data).Error
	if queryCountRow !=nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":queryCountRow.Error()})
		return

	}
	c.JSON(http.StatusOK,gin.H{"data":data})
}
