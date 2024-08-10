package models

type Cart struct {
	UserID   uint `gorm:"primaryKey;not null" json:"user_id"`
	BookID   uint `gorm:"primaryKey;not null" json:"book_id"`
	Quantity uint `gorm:"type:int;not null" json:"quantity"`
	User     User `gorm:"foreignKey:UserID;references:ID"` // Referensi ke tabel users
	Book     Book `gorm:"foreignKey:BookID;references:ID"` // Referensi ke tabel books
}
