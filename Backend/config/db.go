package config

import (
	// "fmt"
	"Backend/models"
	"Backend/utils"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"

	"gorm.io/gorm"
)

// variabel pointer untuk menyimpan nilai yang sudah didapat dari function connectdb

// function mengkoneksikan ke database
func ConnectDB() *gorm.DB{
	var db *gorm.DB

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file",err)
	}
	//mengambil nilai env
	environment:=utils.Getenv("ENVIRONMENT","local")

	if environment == "local"{
		//username:= utils.Getenv("USERNAME","root")
		//password:= ""
		database := utils.Getenv("DATABASE_NAME", "ecommerce_books")
		host := utils.Getenv("HOST", "127.0.0.1")
		port := utils.Getenv("PORT", "3306")

		dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local", "root", "", host, port, database)
		dbGorm, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

		if err != nil {
			fmt.Println(dsn)
			panic(err.Error())
		}
		db = dbGorm

	} else {
		username := os.Getenv("DB_USERNAME")
		password := os.Getenv("DB_PASSWORD")
		host := os.Getenv("DB_HOST")
		port := os.Getenv("DB_PORT")
		database := os.Getenv("DB_NAME")
		// production
		dsn := fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, database)
		dbGorm, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			panic(err.Error())
		}

		db = dbGorm
	}

	//auto migration table saat terjadi perubahan atau penambahan models
	// ini gw pindahin biar ngubah sekali aja
	db.AutoMigrate(
		&models.Publisher{},
		&models.Author{},
		&models.Category{},
		&models.BookCategory{},
		&models.Stock{},
		&models.Book{},
		&models.User{},
		&models.Profile{},
		&models.Order{},
		&models.OrderItem{},
		&models.PaymentMethod{},
		&models.Cart{},
	)
	return db
	
}
