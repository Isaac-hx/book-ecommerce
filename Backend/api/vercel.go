package api

import (
	"Backend/config"
	"Backend/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

var (
	app *gin.Engine
)

func init(){
	app = gin.New()
	db:=config.ConnectDB()
	routes.SetupRouter(db, app)

}
func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}