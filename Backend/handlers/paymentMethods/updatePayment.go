package paymentMethods

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdatePaymentById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id:=c.Param("id")
	var inputPaymentMethod struct{
		Name string `json:"name"`
		AccountNumber string `json:"account_number"`
		AccountHoldername string `json:"account_holder_name"`
	}
	err:= c.ShouldBindJSON(&inputPaymentMethod)
	if err!=nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{"message":err.Error()})
		return
	}
	var paymentModel models.PaymentMethod
	updateData:=db.Model(&paymentModel).Where("id = ?",id).Updates(inputPaymentMethod)
	if updateData.Error != nil{
		switch updateData.Error{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":updateData.Error.Error()})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":updateData.Error.Error()})
			return
		}
	}

	if updateData.RowsAffected == 0{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":"Data tidak berhasil di update"})
		return
	}

	c.JSON(http.StatusOK,gin.H{"message":"Payment berhasil di update"})

}