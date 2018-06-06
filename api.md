# API Structure

- / => Check for API Availability

#### Base URL => /api/v1/
Use Postman for Accessing Whole Structure.

###### Auth

- POST /auth/signup => Accept Username( Email ) , Password , Name
- POST /auth/login => Accept Username( Email ) , Password and Return JWT for accessing private routes.
- POST /auth/login/google => Google OAuth2 login

###### Profile

- GET /profile => finds client and sends it back
- POST /profile/update => updates client info
- POST /profile/measurements => Accepts measurements to add or update them