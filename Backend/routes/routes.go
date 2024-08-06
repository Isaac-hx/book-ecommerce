package routes

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"Backend/handlers/auths"
	"Backend/handlers/books"
	"Backend/handlers/publishers"

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


	r.POST("/register",auths.Register)
	r.POST("/login",auths.Login)



	r.GET("/books", books.GetListBooks)
	r.GET("/books/:id", books.GetBookById)

	r.GET("/publisher",publishers.GetAllPublisher)
	r.GET("/publisher/:id",publishers.GetPublisherById)

	// In your route setup
	accesAdmin:=r.Group("/admin")
	accesAdmin.Use(middlewares.RoleMiddleware("admin"))
	{
		accesAdmin.GET("/dashboard",func(c *gin.Context){
			c.JSON(http.StatusOK,gin.H{"message":"Halaman index diakses"})
		})
		accesAdmin.POST("/publisher",publishers.CreatePublisher)
		accesAdmin.PUT("/publisher/:id",publishers.UpdatePublisherById)
		accesAdmin.DELETE("/publisher/:id",publishers.DeletePublisherById)

	}


	return r
}
