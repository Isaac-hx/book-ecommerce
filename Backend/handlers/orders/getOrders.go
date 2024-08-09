package orders

import (
	"Backend/models"

	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrderAdmin(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	if err := db.Preload("OrderItems").Preload("PaymentMethod").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}
	var dataOrder []struct{
		ID		uint	`json:"order_id"`
		StatusOrder string `json:"status_order"`
		ProofPayment string `json:"proof_payment"`
		PaymentMethodId int `json:"payment_method_id"`
		PaymentMethodName string `json:"payment_method_name"`


	}

	for _,item := range orders{
		dataOrder = append(dataOrder, struct{
			ID		uint	`json:"order_id"`
			StatusOrder string `json:"status_order"`
			ProofPayment string `json:"proof_payment"`
			PaymentMethodId int `json:"payment_method_id"`
			PaymentMethodName string `json:"payment_method_name"`
		}{
			ID: item.ID,
			StatusOrder: item.StatusOrder,
			ProofPayment: item.ProofPayment,
			PaymentMethodId: item.PaymentMethodID,
			PaymentMethodName:item.PaymentMethod.Name,
		})
		
	}
	c.JSON(http.StatusOK, gin.H{"orders": dataOrder})
}

func GetOrderByIdAdmin(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	id:=c.Param("id") //get  order by order id
	var dataOrder models.Order
	querySelect:=db.Preload("OrderItems").Preload("PaymentMethod").First(&dataOrder,id).Error
	if querySelect != nil {
		switch querySelect{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":querySelect.Error()})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":querySelect.Error()})
			return
		}
	}
	var dataBookId []uint
	dataOrderItems:= dataOrder.OrderItems
	for _,item := range dataOrderItems{
		dataBookId = append(dataBookId, item.BookID)

	}
	var listBookID []models.Book
	queryAllBookID:=db.Find(&listBookID,dataBookId).Error
	if queryAllBookID != nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":queryAllBookID.Error()})
		return
	}
	var profileOrder models.Profile
	queryProfileOrder:=db.First(&profileOrder,dataOrder.OrderItems[0].ProfileID).Error
	if queryProfileOrder != nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":queryProfileOrder.Error()})
		return
	}
	var dataOrderById struct{
		ID uint `json:"order_id"`
		StatusOrder string `json:"status_order"`
		PaymentMethodName string `json:"payment_method_name"`
		ProofPayment string `json:"proof_payment"`
		Profile  models.Profile	`json:"profile_order"`
		BookOrder []models.Book `json:"book_order"`
		

	}
	dataOrderById.ID=dataOrder.ID
	dataOrderById.StatusOrder = dataOrder.StatusOrder
	dataOrderById.PaymentMethodName = dataOrder.ProofPayment
	dataOrderById.Profile = profileOrder
	dataOrderById.BookOrder  =listBookID
	c.JSON(http.StatusOK,gin.H{"data":dataOrderById})
}