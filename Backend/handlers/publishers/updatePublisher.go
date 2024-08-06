package publishers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdatePublisherById(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	var inputPublisher struct{
		Name string `json:"name"`
	}
	id:= c.Param("id")
	err:=c.ShouldBindJSON(&inputPublisher)
	if err != nil{
		c.AbortWithStatusJSON(http.StatusBadRequest,gin.H{
			"message":err.Error(),
		})
		return
	}

	queryUpdate:=db.Where("id = ?",id).Update("name",inputPublisher.Name)
	if queryUpdate.Error != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{"message":queryUpdate.Error.Error()})
		return
	}

	if queryUpdate.RowsAffected == 0{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{
			"message":"Data tidak berhasil di update",
		})
		return
	}

	c.JSON(http.StatusOK,gin.H{"message":"Data Berhasil di Update"})
}