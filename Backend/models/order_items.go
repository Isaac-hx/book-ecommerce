package models

import (
	"gorm.io/gorm"
)

type OrderItem struct {
	gorm.Model
	TotalPrice    uint    `gorm:"type:int" json:"total_price"`
	QuantityTotal uint    `gorm:"type:int" json:"quantity_total"`
	TransactionID string  `json:"transaction_id"`
	BookID        uint    `json:"book_id"`
	ProfileID     uint    `json:"profile_id"`
	Book          Book    `json:"book"`
	Profile       Profile `json:"profile"`
}
