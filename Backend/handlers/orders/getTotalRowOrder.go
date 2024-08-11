package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetTotalRowOrders(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	type result struct {
		Total string `json:"total_order"`
	}
	var data result
	queryCountRow := db.Model(&order).Select("COUNT(id) as total").Find(&data).Error
	if queryCountRow != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": queryCountRow.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": data})}