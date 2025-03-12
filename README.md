# MERN Appointment App

This is a MERN (MongoDB, Express, React, Node.js) stack application for managing appointments. The app allows users to create, view, and delete appointments.

## Features

- User authentication
- Create, view, and delete appointments
- Responsive design

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mern-appointment-app.git
    cd mern-appointment-app
    ```

2. Install dependencies for both the frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Running the App

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Register a new account or log in with an existing account.
- Create new appointments by filling out the appointment form.
- View a list of your appointments.
- Delete appointments as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
