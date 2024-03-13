package user

import (
	"context"
	"log"
	"pockethealth/internchallenge/pkg/datastore"
)

// ApiServices are an instance of an ApiServicer that implement the api actions for an ApiServicer
type UserApiService struct{}

// NewUserApiService creates a new Api Service
func NewUserApiService() UserApiService {
	return UserApiService{}
}

// PostRegister - Register a User
func (s UserApiService) PostRegister(ctx context.Context, name string, email string, colour string) (string, error) {
	// save user to datastore
	userId, err := datastore.CreateUser(ctx, name, email, colour)
	if err != nil {
		log.Printf("error creating user: %q", err.Error())
		return "", err
	}
	log.Printf("created user with id: %s\n and favourite colour %s\n", userId, colour)

	// return the user id
	return userId, err
}

// // GetUser - Get User Information
// func (s UserApiService) GetUser(ctx context.Context, userId string) (User, error) {
// 	// Retrieve user information from datastore based on userId
// 	user, err := datastore.GetUserByID(ctx, userId)
// 	if err != nil {
// 		log.Printf("error getting user information: %q", err.Error())
// 		return User{}, err
// 	}

// 	// Return the user information
// 	return user, nil
// }
