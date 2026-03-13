# Mini Social Media Platform

A full-stack **social media web application** where users can register, login, create posts with images, like and comment on posts, follow other users, and view profiles.

This project was built to demonstrate **full-stack development using Node.js, Express, MongoDB, and vanilla JavaScript**.

---

## Features

* User Registration and Login
* Persistent Login Session
* Create Posts with Text and Images
* Like Posts
* Comment System
* Delete Only Your Own Posts
* Follow / Unfollow Users
* View User Profiles
* Search Users
* News Feed

---

## Tech Stack

Frontend

* HTML
* CSS
* JavaScript

Backend

* Node.js
* Express.js

Database

* MongoDB

File Upload

* Multer

---

## Project Structure

```
CodeAlpha_Social-media-app
│
├── Backend
│   ├── server.js
│   ├── models
│   ├── routes
│   └── uploads
│
├── frontend
│   ├── index.html
│   ├── profile.html
│   ├── script.js
│   ├── profile.js
│   └── style.css
│
├── .gitignore
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/YOUR_USERNAME/CodeAlpha_Social-media-app.git
```

### 2. Go to project folder

```
cd CodeAlpha_Social-media-app
```

### 3. Install backend dependencies

```
cd Backend
npm install
```

### 4. Start the backend server

```
node server.js
```

Server will start at:

```
http://localhost:5000
```

### 5. Run the frontend

Open `frontend/index.html` using **Live Server** in VS Code.

---

## Usage

1. Register a new user
2. Login to your account
3. Create posts with text or images
4. Like and comment on posts
5. Follow other users
6. View your profile and posts

---

## Future Improvements

* Profile picture upload
* Dark mode
* Real-time notifications
* Post editing
* Deployment on cloud

---

## License

This project is created for learning and demonstration purposes.
