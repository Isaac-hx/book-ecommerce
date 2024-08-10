package stocks

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateStockbyId(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	var stock models.Stock
	var inputStock struct {
		Quantity uint `json:"quantity"`
	}
	err := c.ShouldBindBodyWithJSON(&inputStock)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	updateStock := db.Model(&stock).Where("id = ?",id).Update("quantity",inputStock.Quantity)
	if updateStock.Error != nil{
		switch updateStock.Error{
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Data tidak ditemukan"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": updateStock.Error.Error()})
			return
		}

	}


	c.JSON(http.StatusOK, gin.H{"message": "Data berhasil di update"})

}
