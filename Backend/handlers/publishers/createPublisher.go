package publishers

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreatePublisher(c *gin.Context){
	var publisher models.Publisher
	db := c.MustGet("db").(*gorm.DB)

	err:= c.ShouldBindJSON(&publisher)
	if err  !=nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{
			"message":err.Error(),
		})

		return
	}
	createRecord := db.Create(&publisher).Error
	if createRecord != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{
			"message":createRecord.Error(),
		})
	}
	c.JSON(http.StatusOK,gin.H{
		"message":"Berhasil menambah data publisher",
	})
}

