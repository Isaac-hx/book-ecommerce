package models

import (
	"Backend/utils"
	"errors"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	EmailAddress string `gorm:"unique;not null;type:varchar(100)" json:"email"`
	Password     string `gorm:"not null;type:varchar(255)" json:"password"`
	Role         string `gorm:"type:varchar(100)" json:"role"`
	Order		[]Order			`json:"orders"`

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

func LoginCheck(email string, password string, db *gorm.DB) (string, string, error) {
	var err error
	u := User{}

	err = db.Model(User{}).Where("email_address = ?", email).Take(&u).Error
	if err != nil {
		return "", "", err
	}

	err = VerifyPassword(u.Password, password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", "", errors.New("incorrect password")
	}

	token, err := utils.GenerateToken(u.ID, u.Role)
	if err != nil {
		return "", "", err
	}

	return token, u.Role, nil
}

func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
