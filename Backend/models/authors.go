package models

import "gorm.io/gorm"

type Author struct {
	gorm.Model
	Name  string `gorm:"not null;type:varchar(255)" json:"name"`
	Books []Book `gorm:"foreignKey:AuthorID"`
}
