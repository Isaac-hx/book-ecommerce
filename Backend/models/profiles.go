package models

import (
	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model 
	UserID      uint 			`gorm:"unique;not null" json:"user_id"`
	AvatarURL   string 			`gorm:"type:varchar(255)" json:"avatar_url"`
	FirstName	string 			`gorm:"type:varchar(100)" json:"first_name"`
	LastName    string 			`gorm:"type:varchar(255)" json:"last_name"`
	Phone       string 			`gorm:"type:varchar(15)" json:"phone"`
	Address		string 			`gorm:"type:text" json:"address"`
	User		User   			`gorm:"constraint:OnDelete:CASCADE;foreignKey:UserID;references:ID" json:"-"`
}