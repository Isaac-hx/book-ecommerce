package paymentMethods

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllPayment(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var listPayment []models.PaymentMethod

	paymentData:=db.Find(&listPayment).Error
	if paymentData != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":paymentData.Error()})
		return
	}


	c.JSON(http.StatusOK,gin.H{"data":listPayment})

}


func GetPaymentById(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	id:=c.Param("id")
	
	var paymentMethodById models.PaymentMethod

	paymentData:=db.First(&paymentMethodById,id).Error
	if paymentData != nil{
		switch paymentData{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":paymentData.Error()})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":paymentData.Error()})
			return
		}
	}

	c.JSON(http.StatusOK,gin.H{"data":paymentMethodById})
}