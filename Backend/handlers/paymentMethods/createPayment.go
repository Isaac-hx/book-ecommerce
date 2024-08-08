package paymentMethods

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePaymentMethod(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var inputPaymentMethod struct{
		Name string `json:"name"`
		AccountNumber string `json:"account_number"`
		AccountHolderName string `json:"account_holder_name"`

	}

	err:= c.ShouldBindJSON(&inputPaymentMethod)
	if err != nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{
			"message":err.Error(),
		})
		return
	}

	var newPaymentMethod models.PaymentMethod
	newPaymentMethod.Name = inputPaymentMethod.Name
	newPaymentMethod.AccountNumber = inputPaymentMethod.AccountNumber
	newPaymentMethod.AccountHoldername = inputPaymentMethod.AccountHolderName

	createPayment := db.Create(&newPaymentMethod).Error
	if createPayment != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":createPayment.Error()})
		return
	}

	c.JSON(http.StatusOK,gin.H{"message":"Data berhasil ditambah"})
}