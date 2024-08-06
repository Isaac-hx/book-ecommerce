package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name  string `gorm:"not null;type:varchar(255)" json:"name"`
	Books []Book `gorm:"many2many:book_categories"`
}
