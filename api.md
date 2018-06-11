# API Structure

- / => Check for API Availability

#### Base URL => /api/v1/
Use Postman for Accessing Whole Structure.

###### Auth

- /auth/signup , POST ,  Accept Username( Email ) , Password , Name
- /auth/login , POST , Accept Username( Email ) , Password and Return JWT for accessing private routes.
- /auth/login/google , POST , Accept Username( Email ) , GoogleToken and Return JWT for accessing private routes.

###### Profile

- /profile , GET,  Getting Details of Current Profile
- /profile/update , POST , Updating the Current Profile 
- /profile/measurements , POST , Updating the Current Profile Measurements
