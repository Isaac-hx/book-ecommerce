package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	StatusOrder     string       `gorm:"not null;type:enum('pending','paid','rejected');default:'pending'" json:"status_order"`
	ProofPayment    string       `gorm:"type:varchar(255)" json:"proof_payment"`
	PaymentMethodID int         `json:"payment_method_id"` // Pointer to allow null
	PaymentMethod   PaymentMethod `gorm:"foreignKey:PaymentMethodID" json:"payment_method"` // GORM relation

	OrderItems      []OrderItem  `gorm:"foreignKey:OrderID"`
}
