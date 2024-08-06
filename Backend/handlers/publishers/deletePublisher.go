package publishers

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)
func DeletePublisherById(c *gin.Context){
	db:=c.MustGet("db").(*gorm.DB)
	id:=c.Param("id")
	var listPublisher models.Publisher
	queryDelete := db.Unscoped().Where("id = ?",id).Find(&listPublisher)
	if queryDelete.Error != nil{
		c.AbortWithStatusJSON(http.StatusInternalServerError,gin.H{
			"message":queryDelete.Error.Error(),
		})
		return
	}

	if queryDelete.RowsAffected == 0{
		c.AbortWithStatusJSON(http.StatusNotFound,gin.H{
			"message":"Data gagal di hapus",
		})
		return
	}
	c.JSON(http.StatusOK,gin.H{
		"message":"Data berhasil di hapus",
	})
}