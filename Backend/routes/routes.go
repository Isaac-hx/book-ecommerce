package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"Backend/handlers"
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

	return r
}
