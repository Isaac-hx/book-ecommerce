package routes

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"Backend/handlers/authors"
	"Backend/handlers/auths"
	"Backend/handlers/books"
	"Backend/handlers/categories"
	"Backend/handlers/orderItems"
	"Backend/handlers/orders"
	"Backend/handlers/paymentMethods"
	"Backend/handlers/profiles"
	"Backend/handlers/publishers"
	"Backend/handlers/stocks"

	"Backend/middlewares"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

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

	// r.POST("/create-orders", orderItems.CreateOrderItem)       //dev state <- must be deleted
	// r.GET("/get-order-item", orderItems.GetAllOrderItems)      //dev state <- must be deleted
	// r.GET("/get-order-item/:id", orderItems.GetOrderItemsById) //dev state <- must be deleted
	// r.PUT("/order-item/:order-item-id", orderItems.UpdateOrderItemById) //dev state <- must be deleted

	r.GET("/list-orders", orders.GetAllOrder)

	paymentMethodMiddlewareRoute := r.Group("/payment-method")
	paymentMethodMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	paymentMethodMiddlewareRoute.POST("", paymentMethods.CreatePaymentMethod)
	paymentMethodMiddlewareRoute.PUT("/:id", paymentMethods.UpdatePaymentById)

	// Public route for list payment method
	r.GET("/payment-method", paymentMethods.GetAllPayment)
	r.GET("/payment-method/:id", paymentMethods.GetPaymentById)

	// Private Create Order routes with user middleware
	OrderItemsMiddlewareRoute := r.Group("/order-items")
	OrderItemsMiddlewareRoute.Use(middlewares.UserMiddleware())
	OrderItemsMiddlewareRoute.POST("", orderItems.CreateOrderItem)
	OrderItemsMiddlewareRoute.PUT("/:id", orderItems.UpdateOrderItemById) 

	// Public route for list order-item sementara mungkin
	r.GET("/order-items", orderItems.GetAllOrderItems)      
	r.GET("/order-items/:id", orderItems.GetOrderItemsById) 

	// Private Change password routes with user middleware
	changePasswordMiddlewareRoute := r.Group("/change-password")
	changePasswordMiddlewareRoute.Use(middlewares.UserMiddleware())
	changePasswordMiddlewareRoute.POST("", auths.ChangePasswordHandler)

	// Admin dashboard route with admin middleware
	r.GET("/admin/dashboard", middlewares.RoleMiddleware("admin"), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the admin dashboard"})
	})

	return r
}
