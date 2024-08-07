package middlewares

import (
	"Backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RoleMiddleware checks if the user has the required role to access a route
func RoleMiddleware(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		err := utils.TokenValid(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		role, err := utils.ExtractTokenRole(c)
		if err != nil || role != requiredRole {
			c.JSON(http.StatusForbidden, gin.H{"error": "Cant acces this resource"})
			c.Abort()
			return
		}

		c.Next()
	}
}

// UserMiddleware checks if the user has the appropriate user_id token to access the route.
func UserMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := utils.TokenValid(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		userID, err := utils.ExtractTokenUserID(c)
		if err != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "Can't access this resource"})
			c.Abort()
			return
		}

		c.Set("userID", userID)
		c.Next()
	}
}