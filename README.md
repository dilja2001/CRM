Mini CRM Application 
Description
This is a full-stack Customer Relationship Management (CRM) web application built using the MERN stack.
It allows organizations to manage leads, assign them to sales users, and track interactions.


Features
*Authentication
*User Registration
*User Login
*JWT-based Authentication
*Protected Routes



Role-Based Access
*Admin
1.View all leads
2.Add / Edit / Delete leads
3.Assign leads to sales users
4.View all users
5.View all notes/interactions

*Sales
1.View assigned leads
2.Add new leads
3.Update lead status
4.Add notes/interactions
5.Cannot delete leads

Tech Stack

1.Backend: 
Node.js,Express.js,MongoDB,Mongoose,JWT Authentication,bcrypt (Password Hashing)
2.Frontend:
React.js,React Router,Axios,Bootstrap
3.Database:MongoDB
4.HTTP Client:Axios
5.Installation & Setup:
Clone Repository
git clone  https://github.com/dilja2001/CRM.git



Backend Setup

Go to backend folder (if backend is inside a folder called backend):

cd backend

Install dependencies:

npm install

Create a .env file in the backend folder with these environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:

node server.js

The backend will run on http://localhost:5000


Frontend Setup

Go to frontend folder (if frontend is inside a folder called frontend):

cd frontend

Install dependencies:

npm install

Start the React app:

npm run dev

The frontend will run on another port


Environment Variables

PORT → The port backend server runs on

MONGO_URI → MongoDB connection URL

JWT_SECRET → Secret key for user authentication








