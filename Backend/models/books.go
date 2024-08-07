package models

import (
	"time"

	"gorm.io/gorm"
)

// Model Book
type Book struct {
    gorm.Model
    Title         string     `gorm:"type:varchar(255)" json:"title"`
    Description   string     `gorm:"type:text" json:"description"`
    CoverUrl      string     `gorm:"type:varchar(255)" json:"cover_url"`
    TotalPages    uint       `gorm:"type:int" json:"total_pages"`
    Weight        float32    `gorm:"type:float" json:"weight"`
    Width         float32    `gorm:"type:float" json:"width"`
    Height        float32    `gorm:"type:float" json:"height"`
    Language      string     `gorm:"type:varchar(50)" json:"language"`
    PublishedDate time.Time  `gorm:"type:date" json:"published_date"`
    Price         int        `gorm:"type:int" json:"price"`
    AuthorID      uint       `json:"author_id"` // Foreign key for Author
    PublisherID   uint       `json:"publisher_id"` // Foreign key for Publisher
    Author        Author     `json:"author"` // Belongs to Author
    Publisher     Publisher  `json:"publisher"` // Belongs to Publisher
    Categories    []Category `gorm:"many2many:book_categories" json:"categories"` 
	Stocks	Stock 	`json:"stock"`
	// Many-to-many with Categories
}
