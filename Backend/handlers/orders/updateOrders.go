package orders

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func UpdateOrders(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	fmt.Println(db)
}