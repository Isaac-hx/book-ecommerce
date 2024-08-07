package models

import "gorm.io/gorm"
type Stock struct {
    gorm.Model
    Quantity uint  `gorm:"not null" json:"quantity"`
    BookID   uint  `gorm:"not null;unique" json:"book_id"` // Unique foreign key for Book
}