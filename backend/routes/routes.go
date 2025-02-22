package routes

import (
	"net/http"

	"github.com/TejaswiniYammanuru/LMS/backend/controllers"
	"github.com/TejaswiniYammanuru/LMS/backend/middleware"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

func SetupRoutes(router *mux.Router, db *gorm.DB) {
	authController := controllers.NewAuthController(db)

	router.HandleFunc("/api/signup", authController.SignUp).Methods("POST")
	router.HandleFunc("/api/login", authController.Login).Methods("POST")

	protected := router.PathPrefix("/api").Subrouter()
	protected.Use(middleware.AuthMiddleware)

	
	protected.HandleFunc("/logout", authController.Logout).Methods("POST")
	protected.HandleFunc("/user/profile", authController.GetProfile).Methods("GET")
	protected.HandleFunc("/user/profile", authController.UpdateProfile).Methods("PUT")

	
	router.PathPrefix("/").Handler(optionsHandler()).Methods("OPTIONS")
}

func optionsHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}