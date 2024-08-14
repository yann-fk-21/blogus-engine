# blogus-engine

Backend of blogus

## Backend of Blog Application

This repository contains the backend code for a blog application. It provides the necessary APIs and functionalities to manage blog posts, user authentication, and other related features.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-backend.git
   ```

2. Install the dependencies:

   ```bash
   cd blog-backend
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_NAME=your-database-name
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   ```

4. Start the server:

   ```bash
   npm start
   ```

### API Documentation

The backend provides the following APIs:

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/signin`: Log in an existing user.

For detailed API documentation, please refer to the [API Documentation](/api-docs) page.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more information.
