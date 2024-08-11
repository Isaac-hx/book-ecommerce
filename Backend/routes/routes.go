package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"Backend/handlers/authors"
	"Backend/handlers/auths"
	"Backend/handlers/books"
	"Backend/handlers/cart"
	"Backend/handlers/categories"
	"Backend/handlers/orders"
	"Backend/handlers/paymentMethods"
	"Backend/handlers/profiles"
	"Backend/handlers/publishers"
	"Backend/handlers/stocks"

	"Backend/middlewares"
)

func SetupRouter(db *gorm.DB,r *gin.Engine)  {

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AllowHeaders = []string{"Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization"}
	corsConfig.AllowCredentials = true
	corsConfig.AddAllowMethods("OPTIONS")

	r.Use(cors.New(corsConfig))

	// Middleware to set database in context
	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	// Public Auth routes
	r.POST("/register", auths.Register)
	r.POST("/login", auths.Login)

	// Private Book routes with admin middleware
	bookMiddlewareRoute := r.Group("/books")
	bookMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	bookMiddlewareRoute.POST("", books.CreateBook)
	bookMiddlewareRoute.PUT("/:id", books.UpdateBook)
	bookMiddlewareRoute.DELETE("/:id", books.DeleteBook)

	// Public book routes
	r.GET("/books", books.GetListBooks)
	r.GET("/books/:id", books.GetBookById)

	// Private Category routes with admin middleware
	categoryMiddlewareRoute := r.Group("/category")
	categoryMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	categoryMiddlewareRoute.POST("", categories.CreateCategory)
	categoryMiddlewareRoute.DELETE("/:id", categories.DeleteCategory)
	categoryMiddlewareRoute.PUT("/:id", categories.UpdateCategory)

	// Public category routes
	r.GET("/category", categories.GetAllCategory)
	r.GET("/category/:id", categories.GetCategoryById)

	// Private profile routes with user middleware
	profileMiddlewareRoute := r.Group("/profile")
	profileMiddlewareRoute.Use(middlewares.UserMiddleware())
	profileMiddlewareRoute.PUT("", profiles.UpdateProfile)
	profileMiddlewareRoute.GET("", profiles.GetAllProfiles)
	profileMiddlewareRoute.GET("/:id", profiles.GetProfileByID)

	// Private Author routes with admin middleware
	authorMiddlewareRoute := r.Group("/author")
	authorMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	authorMiddlewareRoute.POST("", authors.CreateAuthor)
	authorMiddlewareRoute.DELETE("/:id", authors.DeleteAuthor)
	authorMiddlewareRoute.PUT("/:id", authors.UpdateAuthor)

	// Public author routes
	r.GET("/author", authors.GetAllAuthors)
	r.GET("/author/:id", authors.GetAuthorById)

	// Private publisher routes with admin middleware
	publisherMidldlewareRoute := r.Group("/publisher")
	publisherMidldlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	publisherMidldlewareRoute.POST("", publishers.CreatePublisher)
	publisherMidldlewareRoute.DELETE("/:id", publishers.DeletePublisherById)
	publisherMidldlewareRoute.PUT("/:id", publishers.UpdatePublisherById)

	// Public publisher routes
	r.GET("/publisher", publishers.GetAllPublisher)
	r.GET("/publisher/:id", publishers.GetPublisherById)

	// Private stock routes with admin middleware
	stockMiddlewareRoute := r.Group("/stock")
	stockMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	stockMiddlewareRoute.POST("", stocks.CreateStock)
	stockMiddlewareRoute.PUT("/:id", stocks.UpdateStockbyId)

	// Public stock routes
	r.GET("/stock", stocks.GetListStock)
	r.GET("/stock/:id", stocks.GetStockById)

	//summary for admin
	summaryMiddlewareRoute := r.Group("/summary")
	summaryMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	summaryMiddlewareRoute.GET("/history-order", orders.GetHistoryOrder)
	summaryMiddlewareRoute.GET("/publisher", publishers.GetTotalRowPublisher)
	summaryMiddlewareRoute.GET("/book", books.GetTotalRowBooks)
	summaryMiddlewareRoute.GET("/author", authors.GetTotalRowAuthor)
	summaryMiddlewareRoute.GET("/order", orders.GetTotalRowOrders)



	paymentMethodMiddlewareRoute := r.Group("/payment-method")
	paymentMethodMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	paymentMethodMiddlewareRoute.POST("", paymentMethods.CreatePaymentMethod)
	paymentMethodMiddlewareRoute.PUT("/:id", paymentMethods.UpdatePaymentById)

	// Public route for list payment method
	r.GET("/payment-method", paymentMethods.GetAllPayment)
	r.GET("/payment-method/:id", paymentMethods.GetPaymentById)



	// // Private Create Order routes with user middleware
	// OrderItemsMiddlewareRoute := r.Group("/order-items")
	// OrderItemsMiddlewareRoute.Use(middlewares.UserMiddleware())
	// OrderItemsMiddlewareRoute.POST("", orderItems.CreateOrderItem)
	// OrderItemsMiddlewareRoute.PUT("/:id", orderItems.UpdateOrderItemById)
	// OrderItemsMiddlewareRoute.DELETE("/:id", orderItems.DeleteOrderItem)
	
	// r.GET("/order-items", orderItems.GetAllOrderItems)
	// r.GET("/order-items/:id", orderItems.GetOrderItemsById)

	ordersMiddlewareRoute := r.Group("/admin/order")
	ordersMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	ordersMiddlewareRoute.GET("", orders.GetAllOrdersAdmin)
	ordersMiddlewareRoute.GET("/:id", orders.GetOrdersByIdAdmin)
	ordersMiddlewareRoute.PUT("/:id", orders.UpdateOrderByIDAdmin)

	ordersUserMiddlewareRoute := r.Group("/order")
	ordersUserMiddlewareRoute.Use(middlewares.UserMiddleware())
	ordersUserMiddlewareRoute.POST("", orders.CreateOrderByUser)
	ordersUserMiddlewareRoute.GET("", orders.GetAllOrdersByUser)
	ordersUserMiddlewareRoute.GET("/:id", orders.GetOrdersUserById)
	ordersUserMiddlewareRoute.PUT("/:id", orders.UpdateOrderProofPaymentByUser)

	// Private Change password routes with user middleware
	changePasswordMiddlewareRoute := r.Group("/change-password")
	changePasswordMiddlewareRoute.Use(middlewares.UserMiddleware())
	changePasswordMiddlewareRoute.POST("", auths.ChangePasswordHandler)



	cartDebugMiddlewareRoute := r.Group("/cart") 
	cartDebugMiddlewareRoute.Use(middlewares.UserMiddleware())
	cartDebugMiddlewareRoute.POST("", cart.CreateCart) 
	cartDebugMiddlewareRoute.PUT("", cart.UpdateCart) 
	cartDebugMiddlewareRoute.DELETE("", cart.DeleteCart)
	cartDebugMiddlewareRoute.GET("", cart.GetListCarts)

}
