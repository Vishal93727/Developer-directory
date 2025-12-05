Developer Directory – MERN Project

A simple Developer Directory application built using the MERN Stack (MongoDB, Express, React, Node.js).
Users can sign up, log in, add developers, edit developer profiles, delete developers, and view all developers.

This project includes all required major tasks:
User Registration (Signup)
Users can create an account with name, email, and password.
User Login System
Email + password login using JWT authentication.

Add Developer Profile
Logged-in users can add:

Name
Role
Tech Stack
Experience
About

Edit Developer Profile
Users can update any field.
Delete Developer Profile
View All Developers
Directory page shows all developers.
View Single Developer Profile

Protected Routes
Only authorized users can add/edit/delete.
This completes Project Task 1 successfully.

🚀 Features

Signup & Login with JWT
Add and manage developer profiles
Update developer details
Delete developer entries
View pull developer directory
Responsive UI with clean layout
Secure API with Mongoose models

🛠️ Tech Stack
Frontend

React.js
Tailwind CSS
Axios
React Router

Backend
Node.js
Express.js
MongoDB + Mongoose

JWT Authentication

Bcrypt Password Hashing

📂 Project Structure
developer-directory/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── App.jsx
    └── package.json

⚙️ How to Run
1️⃣ Start Backend
cd backend
npm install
npm start

2️⃣ Start Frontend
cd frontend
npm install
npm run dev

🔗 API Base URL
http://localhost:5000/api

📎 Environment Variables (Backend)

Create a .env file inside backend/ and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173

👨‍💻 Author

Vishal Mourya
Developer Directory Project
