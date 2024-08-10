package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//handler yang digunakan untuk admin
func UpdateOrderByIDAdmin(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id:=c.Param("id") //order id


	var inputOrder struct{
		StatusOrder string `json:"status_order" binding:"required"`
	}

	err:=c.ShouldBindJSON(&inputOrder)
	if err != nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}

	if inputOrder.StatusOrder != "paid" || inputOrder.StatusOrder != "rejected" || inputOrder.StatusOrder != "pending"{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{"message":"Input tidak dikenali"})
		return
	}

	if inputOrder.StatusOrder == "rejected"{
		var order models.Order
		querySearchOrderItem:=db.Preload("OrderItems").First(&order,id).Error
		if querySearchOrderItem != nil{
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":querySearchOrderItem.Error()})
			return
		}
		for _,item := range order.OrderItems {
			var stockBook models.Stock
			//query untuk mendapatkan stock buku
			queryStock:=db.Where("book_id = ?",item.BookID).Find(&stockBook).Error
			if queryStock != nil{
				c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":queryStock.Error()})
				return
			}
			//query untuk update stock buku berdasarkan book_id
			queryUpdate:=db.Model(&stockBook).Where("book_id = ?",item.BookID).Update("quantity",stockBook.Quantity +  item.QuantityTotal).Error
			if queryUpdate != nil{
				c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":queryUpdate.Error()})
				return
			}
		}
	}
	//update status di order
	var orderStatus models.Order
	db.Model(&orderStatus).Where("id = ?",id).Update("status_order",inputOrder.StatusOrder)
	c.JSON(http.StatusOK,gin.H{"message":"Data telah terupdate!"})


}
