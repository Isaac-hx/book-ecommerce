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

	// Auth routes
	r.POST("/register", auths.Register)
	r.POST("/login", auths.Login)

	// Book routes with admin middleware
	bookMiddlewareRoute := r.Group("/books")
	bookMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	bookMiddlewareRoute.POST("", books.CreateBook)
	bookMiddlewareRoute.PUT("/:id", books.UpdateBook)
	bookMiddlewareRoute.DELETE("/:id", books.DeleteBook)

	// Public book routes
	r.GET("/books", books.GetListBooks)
	r.GET("/books/:id", books.GetBookById)

	// Category routes with admin middleware
	categoryMiddlewareRoute := r.Group("/category")
	categoryMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	categoryMiddlewareRoute.POST("", categories.CreateCategory)
	categoryMiddlewareRoute.DELETE("/:id", categories.DeleteCategory)
	categoryMiddlewareRoute.PUT("/:id", categories.UpdateCategory)

	// Private profile routes 
	profile := r.Group("/profile")
	profile.GET("/", profiles.GetAllProfiles)
	profile.GET("/:id", profiles.GetProfileByID)
	profile.PUT("/:id", profiles.UpdateProfileById)

	
	// Public category routes
	r.GET("/category", categories.GetAllCategory)
	//r.GET("/category/:id", categories.GetCategoryById)
	
	// Author routes with admin middleware
	authorMiddlewareRoute := r.Group("/author")
	authorMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	authorMiddlewareRoute.POST("", authors.CreateAuthor)
	authorMiddlewareRoute.DELETE("/:id", authors.DeleteAuthor)
	authorMiddlewareRoute.PUT("/:id", authors.UpdateAuthor)

	
	// Public author routes
	r.GET("/author", authors.GetAllAuthors)

	// publisher routes with admin middleware
	publisherMidldlewareRoute := r.Group("/publisher")
	publisherMidldlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	publisherMidldlewareRoute.POST("", publishers.CreatePublisher)
	publisherMidldlewareRoute.DELETE("/:id", publishers.DeletePublisherById)
	publisherMidldlewareRoute.PUT("/:id", publishers.UpdatePublisherById)

	// Public publisher routes
	r.GET("/publisher", publishers.GetAllPublisher)
	r.GET("/publisher/:id", publishers.GetPublisherById)
	// Admin dashboard route
	r.GET("/admin/dashboard", middlewares.RoleMiddleware("admin"), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the admin dashboard"})
	})

	stockMiddlewareRoute:=r.Group("/stock")
	stockMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	stockMiddlewareRoute.POST("",stocks.CreateStock)
	stockMiddlewareRoute.PUT("/:id",stocks.UpdateStockbyId)
	stockMiddlewareRoute.GET("",stocks.GetListStock)



	return r
}
