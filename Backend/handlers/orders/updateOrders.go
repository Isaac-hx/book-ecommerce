package orders

import (
	"Backend/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//handler yang digunakan untuk admin
func UpdateOrdersById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	fmt.Println(db)
	id:=c.Param("id")
	var inputOrder struct{
		StatusOrder string `json:"status_order" binding:"required"`
	}

	err:=c.ShouldBindJSON(&inputOrder)
	if err != nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}


	//update status order
	var ordersData models.Order
	updatedData:=db.Model(&ordersData).Where("id = ?",id).Updates(inputOrder)
	if updatedData.Error != nil{
		switch updatedData.Error{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":updatedData.Error.Error()})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":updatedData.Error.Error()})
			return
		}
	}


	//jika status order tidak sama dengan paid maka tidak ada pengurangan stock
	if inputOrder.StatusOrder != "paid"{
		c.JSON(http.StatusOK,gin.H{"message":"Berhasil update data"})
		return
	}
	
	var orderItem []models.OrderItem
	selectOrderItem:=db.Where("order_id = ? ",id).Find(&orderItem)
	if selectOrderItem.Error != nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":"Data yang dicari tidak ada"})
		return
	}
	//update batch stock
	for _, item := range orderItem {
		// Reset bookStock untuk setiap iterasi
		var bookStock models.Stock
		
		// Dapatkan informasi stok dari database
		err:=db.Where("book_id = ?", item.BookID).First(&bookStock).Error
		if err != nil{
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":err.Error()})
			return
		}
		if bookStock.Quantity == 0{
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":"Stock tidak ada!"})
			return
		}
		
		db.Model(&bookStock).Where("book_id = ?",item.BookID).Update("quantity",bookStock.Quantity - item.QuantityTotal)		
	}


	c.JSON(http.StatusOK,gin.H{"message":"Data berhasil di update"})
}
