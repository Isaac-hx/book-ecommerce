package publishers

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllPublisher(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var listPublisher []models.Publisher

	queryAll := db.Find(&listPublisher).Error
	if queryAll != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{
			"message":queryAll.Error(),
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"data":listPublisher,
	})
}

func GetPublisherById(c *gin.Context){
	db:= c.MustGet("db").(*gorm.DB)
	id:=c.Param("id")
	var publisher models.Publisher

	queryById:=db.First(&publisher,id).Error
	if queryById != nil{
		switch queryById{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound,gin.H{
				"message":queryById.Error(),
			})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{
				"message":"Server Error",
			})
			return
		}
	}

	c.JSON(http.StatusOK,gin.H{
		"data":publisher,
	})
}
