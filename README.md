# TaskFlow — Modern Task Management Dashboard

A full-stack, responsive task management web application built with FastAPI, PostgreSQL, HTML5, and Tailwind CSS. TaskFlow provides secure user authentication, full CRUD operations for tasks, real-time priority filtering, and dynamic search capabilities wrapped in a modern glassmorphism interface.

---

## 🌐 Live Demo & Deployment

* **Live Frontend Demo:** [https://taskflow-dashboard1-ten.vercel.app](https://taskflow-dashboard1-ten.vercel.app)
* **Interactive API Docs (Swagger UI):** [https://<your-render-backend-url>.onrender.com/docs](https://taskflow-dashboard-b7lr.onrender.com)
* **GitHub Repository:** [https://github.com/Lucy-oop/TaskFlow-Dashboard](https://github.com/Lucy-oop/TaskFlow-Dashboard)

---

## ✨ Features

* **Secure Authentication:** User registration and login utilizing hashed passwords (Bcrypt) and JSON Web Tokens (JWT).
* **Complete Task Management (CRUD):** Create, view, edit, and delete daily tasks with real-time DOM updates.
* **Smart Search & Filtering:** Instant client-side filtering by title or description keywords and priority status (`High`, `Medium`, `Low`).
* **Dark Mode Toggle:** Smooth theme switching between light mode and dark mode styles.
* **Modern UI Design:** Clean layout built with Tailwind CSS, glassmorphism cards, interactive modals, and responsive grid structures.

---

## 🛠️ Tech Stack

### **Backend**
* **Framework:** FastAPI (Python)
* **Database:** PostgreSQL (Hosted on Render)
* **ORM:** SQLAlchemy
* **Authentication:** Passlib (Bcrypt) & PyJWT

### **Frontend**
* **Markup & Styling:** HTML5, Tailwind CSS
* **Scripting:** JavaScript (ES6 Modules & Async/Fetch API)

### **Infrastructure & Deployment**
* **Backend Host:** Render
* **Database Host:** Render (PostgreSQL)
* **Frontend Host:** Vercel

---

## ⚡ Local Installation & Setup

### **Prerequisites**
* Python 3.10+
* Git
* PostgreSQL (Local instance or Cloud URL)

### **1. Clone the Repository**
```bash
git clone [https://github.com/Lucy-oop/TaskFlow-Dashboard.git](https://github.com/Lucy-oop/TaskFlow-Dashboard.git)
cd TaskFlow-Dashboard
