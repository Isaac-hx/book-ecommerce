package models

type BookCategory struct {
    BookID     uint `gorm:"primaryKey"`
    CategoryID uint `gorm:"primaryKey"`
}
