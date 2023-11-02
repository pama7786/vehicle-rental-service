Vehicle Renting API

This is a basic Node.js backend for a vehicle renting system. It provides endpoints for managing vehicles, users, and rentals.

Installation

1. Clone this repository.
2. Install dependencies using npm install.

Usage

1. Start the server using node app.js.
2. Access the API at http://localhost:3000 (or your specified port).

API Endpoints

Vehicles

- Create a new vehicle
  - Method: POST
  - Endpoint: /api/vehicles
  - Request Body:
    {
      "brand": "Toyota",
      "model": "Camry",
      "year": 2022,
      "price": 30000
      // Other vehicle properties
    }
  - Response:
    {
      "brand": "Toyota",
      "model": "Camry",
      "year": 2022,
      "price": 30000
      // Other vehicle properties
    }

- List all vehicles
  - Method: GET
  - Endpoint: /api/vehicles
  - Response: Array of vehicle objects.

- Get a specific vehicle
  - Method: GET
  - Endpoint: /api/vehicles/:vehicleId
  - Response: Details of the specified vehicle.

- Update a vehicle
  - Method: PUT
  - Endpoint: /api/vehicles/:vehicleId
  - Request Body: Updated vehicle data.
  - Response: Updated vehicle details.

- Delete a vehicle
  - Method: DELETE
  - Endpoint: /api/vehicles/:vehicleId
  - Response: Success message.

Users

- Define endpoints for user management in a similar manner as vehicles.

Rentals

- Define endpoints for rental management in a similar manner as vehicles.

Database

This project uses MongoDB as the database. Make sure to configure your database connection in app.js.

License

This project is licensed under the MIT License. See the LICENSE file for details.
