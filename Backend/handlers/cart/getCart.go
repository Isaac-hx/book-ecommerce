package cart

import (
	"Backend/models"
	"Backend/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetListCarts(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var listCarts []models.Cart
	var totalData int64

	pageIndex := c.DefaultQuery("page_index", "0")
	pageIndexInt, _ := strconv.Atoi(pageIndex)
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset := pageIndexInt * limit

	if err := utils.TokenValid(c); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or missing token"})
		return
	}

	userID, err := utils.ExtractTokenUserID(c)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Could not extract user ID from token"})
		return
	}

	if err := db.Model(&models.Cart{}).
		Where("user_id = ?", userID).
		Count(&totalData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to count carts"})
		return
	}

	queryError := db.Preload("User").
		Preload("Book").
		Where("user_id = ?", userID).
		Order("user_id ASC, book_id ASC").
		Limit(limit).
		Offset(offset).
		Find(&listCarts).Error

	if queryError != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": queryError.Error()})
		return
	}

	if len(listCarts) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No carts found"})
		return
	}

	totalPages := (int(totalData) + limit - 1) / limit

	c.JSON(http.StatusOK, gin.H{
		"data":         listCarts,
		"total_data":   totalData,
		"total_pages":  totalPages,
		"current_page": pageIndexInt + 1,
		"page_size":    limit,
	})
}
