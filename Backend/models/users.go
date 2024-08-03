package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	EmailAddress string `gorm:"unique;not null;type:varchar(100)" json:"email"`
	Password     string `gorm:"not null;type:varchar(255)" json:"password"`
	Role         string `gorm:"type:varchar(100)" json:"role"`
}

func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	hashedPassword, errPassword := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if errPassword != nil {
		return &User{}, errPassword
	}
	u.Password = string(hashedPassword)

	var err error = db.Create(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}
