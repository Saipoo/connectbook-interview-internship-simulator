# ConnectBook - Mock Interview and Internship Simulator

ConnectBook is a comprehensive platform designed to help students and freshers prepare for their careers through mock interviews and simulated internship experiences.

## Features

- **Mock Interview Simulator**: Practice interviews with real-time feedback and scoring
- **Internship Simulator**: Gain practical experience through 5 different virtual internships
- **Certificate Generation**: Earn verifiable certificates upon completion
- **User Dashboard**: Track progress, skills, and achievements
- **Authentication System**: Secure user accounts and data

## Tech Stack

### Frontend
- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- HTML2Canvas and jsPDF for certificate generation
- React Confetti for visual effects

### Backend
- Node.js with Express
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd connectbook
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/connectbook
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   ```

4. **Seed the database**
   The application includes seed routes to populate the database with initial data:
   ```
   # Start the server first
   npm run server
   
   # In a separate terminal or using a tool like Postman:
   # Seed interview data
   POST http://localhost:5000/api/interviews/seed
   
   # Seed internship data
   POST http://localhost:5000/api/internships/seed
   ```

5. **Start the application**
   ```
   # Start both frontend and backend concurrently
   npm run dev:full
   
   # Or start them separately
   npm run server  # Backend
   npm run dev     # Frontend
   ```

6. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## MongoDB Setup on Your Laptop

1. **Install MongoDB Community Edition**
   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Follow the installation instructions for your operating system

2. **Start MongoDB Service**
   - On Windows: MongoDB should be installed as a service and start automatically
   - On macOS/Linux: Run `sudo systemctl start mongod` or `brew services start mongodb-community`

3. **Verify MongoDB is running**
   ```
   mongo --version
   mongosh  # Connect to MongoDB shell
   ```

4. **Create the database**
   ```
   use connectbook
   ```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get internship by ID
- `POST /api/users/enroll` - Enroll in a course (protected)
- `PUT /api/users/progress` - Update course progress (protected)
- `POST /api/internships/complete` - Complete an internship (protected)

### Interviews
- `GET /api/interviews/roles` - Get all interview roles
- `GET /api/interviews/questions/:roleId` - Get interview questions by role
- `POST /api/users/interview` - Save interview results (protected)

### Certificates
- `GET /api/certificates/:id` - Get certificate by ID
- `GET /api/certificates/verify/:id` - Verify certificate
- `GET /api/certificates/user/all` - Get user certificates (protected)

## License

This project is licensed under the MIT License.