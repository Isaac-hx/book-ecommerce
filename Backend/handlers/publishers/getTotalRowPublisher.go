package publishers

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetTotalRowPublisher(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var publishers models.Publisher
	type result struct {
		Total string `json:"total_publisher"`
	}
	var data result
	queryCountRow:=db.Model(&publishers).Select("COUNT(id) as total").Find(&data).Error
	if queryCountRow !=nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":queryCountRow.Error()})
		return

	}
	c.JSON(http.StatusOK,gin.H{"data":data})
}
