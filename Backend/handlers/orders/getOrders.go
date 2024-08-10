package orders

import (
	"Backend/models"
	"fmt"

	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// admin handler
func GetAllOrdersAdmin(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	if err := db.Preload("OrderItems").Preload("PaymentMethod").Preload("User").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Server Error"})
		return
	}
	var dataOrder []struct{
		ID		uint	`json:"order_id"`
		StatusOrder string `json:"status_order"`
		ProofPayment string `json:"proof_payment"`
		PaymentMethodId int `json:"payment_method_id"`
		PaymentMethodName string `json:"payment_method_name"`
		UserEmail	string 	`json:"user_email"`
		OrderAt		string	`json:"order_at"`


	}

	for _,item := range orders{
		dataOrder = append(dataOrder, struct{
			ID		uint	`json:"order_id"`
			StatusOrder string `json:"status_order"`
			ProofPayment string `json:"proof_payment"`
			PaymentMethodId int `json:"payment_method_id"`
			PaymentMethodName string `json:"payment_method_name"`
			UserEmail	string	`json:"user_email"`
			OrderAt		string	`json:"order_at"`
			}{
			ID: item.ID,
			StatusOrder: item.StatusOrder,
			ProofPayment: item.ProofPayment,
			PaymentMethodId: item.PaymentMethodID,
			PaymentMethodName:item.PaymentMethod.Name,
			UserEmail: item.User.EmailAddress,
			OrderAt: item.CreatedAt.String(),
		})
		
	}
	c.JSON(http.StatusOK, gin.H{"data": dataOrder})
}



func GetOrdersByIdAdmin(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	id:=c.Param("id")
	var order models.Order
	err := db.Preload("OrderItems").Preload("PaymentMethod").Preload("User").First(&order,id).Error
	if err != nil{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":err.Error()})
		return
	}
	var searchProfileById models.Profile
	querySearhcProfile:= db.Where("user_id = ?",order.UserID).First(&searchProfileById).Error
	if querySearhcProfile != nil {
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":querySearhcProfile.Error()})
		return
	}

	type searchBook struct{
		ID uint  `json:"book_id"`
		SubTotal uint `json:"subtotal"`
		Quantity uint	`json:"quantity"`
		CoverUrl string 	`json:"cover_url"`
		Title string	`json:"title"`
		PricePerBook int  `json:"price_per_book"`
		
	}
	var bookListOrder []searchBook
	for _,item :=range order.OrderItems{
		var bookOrder models.Book
		err:=db.First(&bookOrder,item.BookID).Error
		if err != nil{
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{"message":err.Error()})
			return
		}

		data:=searchBook{
			ID: bookOrder.ID,
			SubTotal: item.SubTotal,
			Quantity: item.QuantityTotal,
			CoverUrl: bookOrder.CoverUrl,
			Title: bookOrder.Title,
			PricePerBook:bookOrder.Price,
		}

		bookListOrder=append(bookListOrder, data)
	}

	type dataOrderByID struct{
		ID	uint	`json:"order_id"`
		StatusOrder string `json:"status_order"`
		ProofPayment	string	`json:"proof_payment"`
		PaymentMethodID uint `json:"payment_method_id"`
		PaymentMethodName  string	`json:"payment_method_name"`
		PaymentHolderName	string	`json:"payment_holder_name"`
		PaymentHolderNumber	string	`json:"payment_holder_number"`
		TotalPrice		int	`json:"total_price"`
		FirstName	string	`json:"first_name"`
		LastName	string	`json:"last_name"`
		Address		string `json:"address"`
		EmailAddress string `json:"email_address"`

		ListBookOrder []searchBook `json:"list_order_book"`

	}

	data:=dataOrderByID{
		ID: order.ID,
		StatusOrder: order.StatusOrder,
		ProofPayment: order.ProofPayment,
		PaymentMethodID: order.PaymentMethod.ID,
		PaymentMethodName: order.PaymentMethod.Name,
		TotalPrice: order.TotalPrice,
		EmailAddress: order.User.EmailAddress,
		FirstName: searchProfileById.FirstName,
		LastName: searchProfileById.LastName,
		Address: searchProfileById.Address,
		PaymentHolderName: order.PaymentMethod.AccountHoldername,
		PaymentHolderNumber: order.PaymentMethod.AccountNumber,

		ListBookOrder: bookListOrder,
	}
	
	c.JSON(http.StatusOK,gin.H{"data":data})
}

//fixing bug
func GetAllOrdersByProfile(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	userID := c.MustGet("userID").(uint)
	fmt.Println(userID)
	var profile models.Profile
	db.Where("user_id",userID).First(&profile)

	var orders []models.Order
	err := db.Joins("JOIN order_items ON order_items.order_id = orders.id").
    Where("order_items.profile_id = ?", profile.ID).
    Preload("OrderItems").
    Preload("PaymentMethod").
    Find(&orders).Error

if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
}

	c.JSON(http.StatusOK,gin.H{"data":orders})



}