package publishers

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdatePublisherById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var inputPublisher struct {
		Name string `json:"name"`
	}
	id := c.Param("id")
	err := c.ShouldBindJSON(&inputPublisher)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var publisher models.Publisher
	if err := db.Where("id = ?", c.Param("id")).First(&publisher).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	var updatedInput models.Publisher
	updatedInput.Name = inputPublisher.Name

	queryUpdate := db.Model(&publisher).Where("id = ?", id).Updates(updatedInput)
	if queryUpdate.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": queryUpdate.Error.Error()})
		return
	}

	// if queryUpdate.RowsAffected == 0{
	// 	c.AbortWithStatusJSON(http.StatusNotFound,gin.H{
	// 		"message":"Data tidak berhasil di update",
	// 	})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{"message": "Data Berhasil di Update"})
}
