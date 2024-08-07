package authors

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func DeleteAuthor(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var author models.Author
	if err := db.Where("id = ?", c.Param("id")).First(&author).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	db.Delete(&author)

	c.JSON(http.StatusOK, gin.H{"message": "data berhasil dihapus"})
}