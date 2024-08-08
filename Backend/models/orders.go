package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	StatusOrder     string       `gorm:"not null;type:enum('pending','paid','rejected');default:'pending'" json:"status_order"`
	ProofPayment    string       `gorm:"type:varchar(255)" json:"proof_payment"`
	PaymentMethodID uint         `gorm:"not null" json:"payment_method_id"`
	OrderItems      []OrderItem  `gorm:"foreignKey:OrderID"`
}
