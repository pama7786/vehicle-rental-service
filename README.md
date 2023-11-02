# Vehicle Rental Service

Welcome to the Vehicle Rental Service project! This Node.js-based application allows users to rent vehicles of various types, manage their bookings, and provides administrators with tools to oversee the system. This README provides an overview of the project, its features, setup instructions, and more.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Features

- **User Registration and Authentication**: Users can register and log in securely.
- **Admin Role**: Administrators have the authority to manage the service.
- **Vehicle Management**: Create, retrieve, update, and delete vehicles with details like name, model, and type.
- **Availability Scheduling**: Schedule vehicles for availability.
- **Booking Functionality**: Users can book vehicles and manage returns.
- **Database Integration**: Prisma is used to interact with the database.
- **Customizable Vehicle Types**: Extend the system to support various types of vehicles.

## Prerequisites

Before you get started, make sure you have the following:

- Node.js and npm installed
- Prisma CLI (`npx prisma`) installed
- A basic understanding of Node.js, Express.js, and Prisma

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/pama7786/vehicle-rental-service
   cd vehicle-rental-service

2. **Install Dependencies:**

```
npm install
```

3. **Configure Environment Variables:**

- Create a .env file in the project root and set your environment variables, such as the database connection string and authentication secrets. Use the provided .env.example as a reference.

4. **Database Setup:**

- Create and migrate your database schema with Prisma:

```
npx prisma migrate dev
```
Generate the Prisma Client:

```
npx prisma generate
```
5. **Usage**

*Start the Application:*

```
npm start
```
6. **Access the API:**

The API is available at http://localhost:3000. You can interact with it using tools like Postman, curl, or a web browser.
***
***API Documentation:***

For detailed information about each API endpoint, their request/response structures, and usage examples, please refer to the code or official API documentation.


**API Endpoints**

- /register: User registration

- /login: User login

- /vehicles: Vehicle listing and creation

- /vehicles/:id: Vehicle retrieval, update, and deletion

- /availability: Availability scheduling

- /booking: Vehicle booking and return management


## Project Structure
The project structure is organized as follows:

- prisma/: Prisma schema definition, migrations, and seed data.

- src/: Main source code directory.

- middleware/: Custom middleware functions, such as authentication middleware.

- config/: Configuration files, including database configuration.

- routes/: Express.js route definitions.

- controllers/: Route logic and data handling.

- models/: Data models defined using Prisma.

***Contributing***

- We welcome contributions from the community. If you have suggestions, discover issues, or want to enhance the project, please open a GitHub issue or create a pull request.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments
- We extend our gratitude to the open-source community for providing the tools and libraries that made this project possible. Special thanks to [DURAAN ALI] for his contributions.

### Contact

- If you have questions or need assistance, please reach out to [abdirahmanfarmajo7786@gmail.com]. Call this number {+254727106403} for more information.

Enjoy using the Vehicle Rental Service! 🚗🏁