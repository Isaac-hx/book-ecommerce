package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name  string `gorm:"not null;type:varchar(255)" json:"name"`
	CategoryCover string `gorm:"not null;type:text" json:"category_cover"`
	Books []Book `gorm:"many2many:book_categories"`
}
