package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	EmailAddress string `gorm:"unique;not null;type:varchar(100)" json:"email"`
	Password string `gorm:"not null;type:varchar(255)" json:"password"`
}