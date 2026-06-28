# Blog Platform with Comments

## Overview

A full-stack blogging platform where users can register, log in, create blog posts, edit or delete posts, and interact through comments. The project demonstrates user authentication, content management, REST API development, and MySQL database integration.

---

## Features

### User Authentication

* User Registration
* User Login
* Session Management using Local Storage

### Blog Management

* Create Blog Posts
* View Blog Posts
* Edit Blog Posts
* Delete Blog Posts

### Comment System

* Add Comments
* View Comments
* User Interaction on Posts

### Backend Features

* RESTful APIs
* MySQL Database Integration
* CRUD Operations

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## Project Structure

blog-platform/

public/

* index.html

* login.html

* register.html

* create-post.html

* style.css

* script.js

* server.js

* db.js

* package.json

* blog.sql

---

## Database Tables

### Users

* id
* name
* email
* password

### Posts

* id
* title
* content
* user_id
* created_at

### Comments

* id
* post_id
* user_id
* comment_text
* created_at

---

## API Endpoints

### Authentication

* POST /register
* POST /login

### Posts

* GET /posts
* POST /posts
* PUT /posts/:id
* DELETE /posts/:id

### Comments

* GET /comments/:postId
* POST /comments

---

## Installation

1. Import blog.sql into MySQL.
2. Update database credentials in db.js.
3. Install dependencies:

npm install

4. Start server:

node server.js

5. Open:

http://localhost:5000/register.html

---

## Learning Outcomes

* Full Stack Development
* REST API Design
* Authentication Systems
* CRUD Operations
* Database Relationships
* User Interaction Features
* Content Management Systems

---

## Future Enhancements

* Admin Dashboard
* Rich Text Editor
* Blog Categories
* Search Functionality
* User Profiles
* Like and Share Features
* Image Upload Support
* JWT Authentication
* Password Encryption (bcrypt)

---

## Author
N Mohan krishna

Computer Science Engineering Student

Interested in Full Stack Development, Java, Web Technologies, and Database Management Systems.
