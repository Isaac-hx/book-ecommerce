package orders

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllOrder(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	if err := db.Preload("OrderItems").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}
	var dataOrder []struct{
		ID		uint	`json:"id"`
		StatusOrder string `json:"status_order"`
		ProofPayment string `json:"proof_payment"`
		PaymentMethodId int `json:"payment_method_id"`
		

	}


	for _,item := range orders{
		dataOrder = append(dataOrder, struct{
			ID		uint	`json:"id"`
			StatusOrder string `json:"status_order"`
			ProofPayment string `json:"proof_payment"`
			PaymentMethodId int `json:"payment_method_id"`
		}{
			ID: item.ID,
			StatusOrder: item.StatusOrder,
			ProofPayment: item.ProofPayment,
			PaymentMethodId: item.PaymentMethodID,
		})
		
	}
	c.JSON(http.StatusOK, gin.H{"orders": dataOrder})
}
