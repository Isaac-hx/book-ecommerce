package config

import (
	// "fmt"
	"Backend/models"
	"Backend/utils"
	"fmt"
	"os"

	"gorm.io/driver/mysql"

	"gorm.io/driver/postgres"

	"gorm.io/gorm"
)

//variabel pointer untuk menyimpan nilai yang sudah didapat dari function connectdb
var DB *gorm.DB


//function mengkoneksikan ke database
func ConnectDB(){

	//mengambil nilai env
	dbProvider := utils.Getenv("DB_PROVIDER", "mysql")


	if dbProvider == "mysql" {
		fmt.Println(dbProvider)
		//username:= utils.Getenv("USERNAME","root")
		//password:= ""
		database:= utils.Getenv("DATABASE_NAME","ecommerce_books")
		host:= utils.Getenv("HOST","127.0.0.1")
		port:=utils.Getenv("PORT","3306")

		dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local", "root","", host, port, database)
		dbGorm,err := gorm.Open(mysql.Open(dsn),&gorm.Config{})

		if err!= nil{
			fmt.Println(dsn)
			panic(err.Error())
		}

		//auto migration table if exist in models
		dbGorm.AutoMigrate(
			&models.Publisher{}, // 1. Tabel Publisher
			&models.Author{},    // 2. Tabel Author
			&models.Category{}, 
			&models.BookCategory{}, // Pastikan tabel pivot diciptakan			// 3. Tabel Category
			&models.Book{},      // 4. Tabel Book
			&models.User{},      // 5. Tabel User (jika ada)
		)
		DB = dbGorm


	
	}else{
		username := os.Getenv("DB_USERNAME")
		password := os.Getenv("DB_PASSWORD")
		host := os.Getenv("DB_HOST")
		port := os.Getenv("DB_PORT")
		database := os.Getenv("DB_NAME")
		// production
		dsn := "host=" + host + " user=" + username + " password=" + password + " dbname=" + database + " port=" + port + " sslmode=require"
		dbGorm, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic(err.Error())
		}
		//auto migration table if exist in models
		dbGorm.AutoMigrate(&models.User{})
		DB = dbGorm

	}



	//Auto migration saat terjadi perubahan atau penambahan models


}