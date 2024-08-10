package orders

import (
	"Backend/models"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


func GetHistoryOrder(c *gin.Context) {
	db:=c.MustGet("db").(*gorm.DB)
	//mengambil query pada url
	filterBy:=c.DefaultQuery("filterby","date")
	//merangkai query 
	filterString:=fmt.Sprintf("%s(updated_at)",strings.ToUpper(filterBy))
	//membuat variable order dengan tipe models.order
	var orders models.Order
	//membuat type data struct result
	type result struct {
		Date  time.Time `json:"date"`
		Total int	`json:"total_prie_order"`
	  }
	//inisialaassi data order
	var data []result	
	//query history
	queryHistoryOrder:=db.Model(&orders).Select("DATE(updated_at) AS date,SUM(total_price) AS total ").Where("status_order = ?","paid").Group(filterString).Find(&data).Error
	if queryHistoryOrder != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":queryHistoryOrder.Error()})
		return
	}

	c.JSON(http.StatusOK,gin.H{"data":data})

}