package stocks

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateStock(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var createStock models.Stock
	err:=c.ShouldBindJSON(&createStock)
	if err!=nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{
			"message":err.Error(),
		})
		return
	}

	createQuery:=db.Create(&createStock).Error
	if createQuery != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":createQuery.Error()})
		return
	}

	c.JSON(http.StatusOK,gin.H{"data":createStock})

}