package authors

import (
	"Backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetAllAuthors(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var authors []models.Author
	db.Find(&authors)

	c.JSON(http.StatusOK, gin.H{"data": authors})
}
