package api

import (
	"Backend/config"
	"Backend/routes"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var (
	app *gin.Engine
)

func init(){
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	app = gin.New()
	db:=config.ConnectDB()
	routes.SetupRouter(db, app)

}
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}