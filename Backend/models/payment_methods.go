package models

import "gorm.io/gorm"

type PaymentMethod struct {
	gorm.Model
	Name string `gorm:"not null;type:varchar(255)" json:"name"`
	AccountNumber string `gorm:"not null;type:varchar(255)" json:"account_number"`
	AccountHoldername string `gorm:"not null;type:varchar(255)" json:"account_holder_name"`
	Orders      []Order  `json:"orders"`

}