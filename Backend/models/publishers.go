package models

import "gorm.io/gorm"

type Publisher struct {
	gorm.Model
	Name string `gorm:"not null;type:varchar(255)" json:"name"`
	Books []Book `gorm:"foreignKey:PublisherID"` // Mengacu ke kolom PublisherID di model Book
}