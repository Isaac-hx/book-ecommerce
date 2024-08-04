package main

import (
	"Backend/config"
	"Backend/routes"
)

func main() {
	config.ConnectDB()

	r := routes.SetupRouter(config.DB)
	r.Run()
}
