# Lost & Found MERN Application

A full-stack Lost & Found web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Users can register, log in, create lost/found item listings, view item details, submit claims, and manage their own items.

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### Item Management

* Create Lost/Found Item Posts
* Upload Item Images
* View All Items
* View Item Details
* Edit Item Information
* Delete Items

### Claims System

* Submit Claims for Items
* View Claims Received
* Approve Claims
* Reject Claims
* Mark Items as Resolved

### User Dashboard

* View Personal Listings
* Manage Posted Items
* Track Claims

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```bash
lost-found-mern/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── app.js
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/prajikta08/lost-found-mern.git
cd lost-found-mern
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| POST   | /api/register | Register User |
| POST   | /api/login    | Login User    |
| GET    | /api/logout   | Logout User   |

### Items

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/items     | Get All Items   |
| GET    | /api/items/:id | Get Single Item |
| POST   | /api/items     | Create Item     |
| PUT    | /api/items/:id | Update Item     |
| DELETE | /api/items/:id | Delete Item     |

### Claims

| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | /api/items/:id/claim    | Submit Claim  |
| GET    | /api/claims             | View Claims   |
| POST   | /api/claims/:id/approve | Approve Claim |
| POST   | /api/claims/:id/reject  | Reject Claim  |

---

## Deployment Links

### Frontend

https://lost-found-mern-mu.vercel.app

### Backend API

https://lost-found-mern-c9zy.onrender.com

---

## Future Improvements

* Email Notifications
* Search & Filters
* Real-Time Chat
* Admin Dashboard
* User Profile Pictures
* Password Reset
* AI-based Item Matching

---

## Author

**Prajikta Sati**

GitHub: https://github.com/prajikta08

---

## License

This project is licensed under the MIT License.
