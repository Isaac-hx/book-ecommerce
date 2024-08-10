package models

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model
	SubTotal    uint    `gorm:"type:int" json:"subtotal"`
	QuantityTotal uint    `gorm:"type:int" json:"quantity"`
	Price		  int 	   `json:"price"`
	OrderID       uint    `json:"order_id"` // Foreign key to orders
	BookID        uint    `json:"book_id"`
	ProfileID     uint    `json:"profile_id"`
	Book          Book    `json:"book"`
	Profile       Profile `json:"profile"`
}
