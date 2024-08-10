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
	for _,item := range dataOrder.OrderItems{
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
	type BookWithStock struct{
		ID uint `json:"book_id"`
		Title string `json:"title"`
		CoverUrl string `json:"cover_url"`
		Price int `json:"price"`
		QuantityTotal uint `json:"quantity_total"`
	}

	var listBookWithStock []BookWithStock

	for index,item:=range dataOrder.OrderItems{
		dataUpdated:=BookWithStock{
			ID: listBookID[index].ID,
			Title: listBookID[index].Title,
			CoverUrl: listBookID[index].CoverUrl,
			Price: listBookID[index].Price,
			QuantityTotal: item.QuantityTotal,
		}
		listBookWithStock = append(listBookWithStock, dataUpdated)
	}
	var dataOrderById struct{
		ID uint `json:"order_id"`
		StatusOrder string `json:"status_order"`
		PaymentMethodName string `json:"payment_method_name"`
		ProofPayment string `json:"proof_payment"`
		Profile  models.Profile	`json:"profile_order"`
		//BookOrder []models.Book `json:"book_order"`
		BookWithStocks []BookWithStock `json:"book_order"`
		

	}
	dataOrderById.ID=dataOrder.ID
	dataOrderById.StatusOrder = dataOrder.StatusOrder
	dataOrderById.PaymentMethodName = dataOrder.PaymentMethod.Name
	dataOrderById.Profile = profileOrder
	dataOrderById.BookWithStocks = listBookWithStock
	// dataOrderById.BookOrder  =listBookID
	// dataOrderById.TotalPrice = dataOrder.
	c.JSON(http.StatusOK,gin.H{"data":dataOrder})
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
	type searchBook struct{
		ID uint  `json:"book_id"`
		SubTotal uint `json:"subtotal"`
		Quantity uint	`json:"quantity"`
		PriceTotalBook uint `json:"price_total_book"`
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
			PriceTotalBook: item.SubTotal,
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
		TotalPrice		int	`json:"total_price"`
		UserEmail	string	`json:"user_email"`
		ListBookOrder []searchBook `json:"list_order_book"`

	}

	data:=dataOrderByID{
		ID: order.ID,
		StatusOrder: order.StatusOrder,
		ProofPayment: order.ProofPayment,
		PaymentMethodID: order.PaymentMethod.ID,
		PaymentMethodName: order.PaymentMethod.Name,
		TotalPrice: order.TotalPrice,
		UserEmail: order.User.EmailAddress,
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