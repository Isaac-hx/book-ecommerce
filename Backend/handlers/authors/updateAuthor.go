package authors

import (
	"Backend/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateAuthor(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)

	var author models.Author
	if err := db.Where("id = ?", c.Param("id")).First(&author).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input AuthorInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updatedInput models.Author
	updatedInput.Name = input.Name
	updatedInput.UpdatedAt = time.Now()

	db.Model(&author).Updates(updatedInput)

	c.JSON(http.StatusOK, gin.H{"message": "data berhasil diperbarui"})
}