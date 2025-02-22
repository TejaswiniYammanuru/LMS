// config/database.go
package config

import (
	"fmt"
	"log"

	"github.com/TejaswiniYammanuru/LMS/backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)


var DB *gorm.DB


func InitialMigration() *gorm.DB {
	
	dsn := "host=localhost user=postgres password=abc123 dbname=lms port=5432 sslmode=disable TimeZone=Asia/Kolkata"


	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database: ", err)
	}


	err = DB.AutoMigrate(
		&models.User{},
		&models.Course{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database: ", err)
	}

	
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatal("Failed to get database instance: ", err)
	}

	
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)

	fmt.Println("Database connected and migrated successfully")

	return DB
}

func GetDB() *gorm.DB {
	return DB
}