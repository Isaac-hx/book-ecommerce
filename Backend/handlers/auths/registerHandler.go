package auths

import (
	"fmt"
	"net/http"
	"os"

	"Backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RegisterInput struct {
	EmailAddress string `json:"email" binding:"required"`
	Password     string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var input RegisterInput
	adminAddress := os.Getenv("ADMIN_EMAIL")
	adminPassword:=os.Getenv("ADMIN_PASSWORD")
	fmt.Println("email address admin :",adminAddress)
	fmt.Println("password  admin :",adminPassword)

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u := models.User{}

	if adminAddress == input.EmailAddress && adminPassword == input.Password{
		fmt.Println("Ini dijalankan")
		u.EmailAddress = adminAddress
		u.Password = adminPassword
		u.Role = "admin"
	}else{
		u.EmailAddress = input.EmailAddress
		u.Password = input.Password
		u.Role = "user"
	}

	_, err := u.SaveUser(db)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// menambahkan data profile default
	defaultProfile := models.Profile{
		UserID:    u.ID,
		AvatarURL: "", 
		FirstName: "",
		LastName:  "",
		Phone:     "",
		Address:   "",
	}

	if err := db.Create(&defaultProfile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "registration success"})	
}
