package routes

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"Backend/handlers"
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

	r.Use(func(c *gin.Context) {
		c.Set("db", db)
	})

	r.POST("/register", handlers.Register)
	r.POST("/login", handlers.Login)

	bookMiddlewareRoute := r.Group("/books")
	bookMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	bookMiddlewareRoute.POST("", handlers.CreateBook)
	bookMiddlewareRoute.DELETE("/:id", handlers.DeleteBook)

	r.GET("/books", handlers.GetListBooks)
	r.GET("/books/:id", handlers.GetBookById)

	categoryMiddlewareRoute := r.Group("/category")
	categoryMiddlewareRoute.Use(middlewares.RoleMiddleware("admin"))
	categoryMiddlewareRoute.POST("", handlers.CreateCategory)
	categoryMiddlewareRoute.DELETE("/:id", handlers.DeleteCategory)
	categoryMiddlewareRoute.PUT("/:id", handlers.UpdateCategory)

	r.GET("/category", handlers.GetAllCategory)
	r.GET("/category/:id", handlers.GetCategoryById)
  
  r.GET("/admin/dashboard", middlewares.RoleMiddleware("admin"), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Welcome to the admin dashboard"})
	})

	return r
}
