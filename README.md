TaskFlow — Modern Task Management Dashboard

A full-stack, responsive task management web application built with FastAPI, PostgreSQL, HTML5, and Tailwind CSS. TaskFlow provides secure user authentication, full CRUD operations for tasks, real-time priority filtering, and dynamic search capabilities wrapped in a modern glassmorphism interface.


 🌐 Live Demo & Deployment

* **Live Frontend Demo:** [https://taskflow-app.vercel.app](https://taskflow-app.vercel.app) *(Replace with your Vercel/Netlify URL)*
* **Interactive API Docs (Swagger UI):** [https://taskflow-backend.onrender.com/docs](https://taskflow-backend.onrender.com/docs) *(Replace with your Render API URL)*
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
* **Framework:** FastAPI (Python 3.14)
* **Database:** PostgreSQL (Hosted on Render)
* **ORM:** SQLAlchemy
* **Authentication:** Passlib (Bcrypt) & PyJWT

### **Frontend**
* **Markup & Styling:** HTML5, Tailwind CSS
* **Scripting:** JavaScript (ES6 Modules & Async/Fetch API)

### **Infrastructure & Deployment**
* **Backend Host:** Render (Web Service)
* **Database Host:** Render (PostgreSQL)
* **Frontend Host:** Vercel / Netlify

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
```

### **2. Set Up Virtual Environment**
```bash
# Create virtual environment
python -m venv venv

# Activate on macOS/Linux
source venv/bin/activate

# Activate on Windows
# venv\Scripts\activate
```

### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **4. Configure Environment Variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/taskflow
SECRET_KEY=your_super_secret_jwt_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### **5. Run Development Server**
```bash
uvicorn app.main:app --reload
```
Open your browser and navigate to `http://127.0.0.1:8000`.

---

## 🔑 Environment Variables

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | Connection string for the PostgreSQL database instance. |
| `SECRET_KEY` | Secret key used for signing and verifying JWT tokens. |
| `ALGORITHM` | Cryptographic algorithm used for JWT token encoding (e.g., `HS256`). |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration duration in minutes. |

---

## 🖼️ Screenshots

| Login Page | Dashboard |
| :---: | :---: |
| ![Login Page](./app/statics/images/login-preview.png) | ![Dashboard Page](./app/statics/images/dashboard-preview.png) |

---

## 📌 API Endpoints

### **Authentication**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Register a new user account | No |
| `POST` | `/users/login` | Authenticate user & return JWT token | No |

### **Tasks**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Retrieve all tasks for logged-in user | Yes |
| `POST` | `/tasks` | Create a new task | Yes |
| `GET` | `/tasks/{id}` | Fetch details of a single task | Yes |
| `PUT` | `/tasks/{id}` | Update an existing task | Yes |
| `DELETE` | `/tasks/{id}` | Delete a specific task | Yes |

---

## 🔮 Future Improvements

* **Drag-and-Drop Kanban Board:** Allow task state updates by dragging items between columns (`To Do`, `In Progress`, `Completed`).
* **Subtasks & Checklists:** Enable breakdown of tasks into smaller actionable items.
* **Email Due Date Notifications:** Automate background email alerts for overdue tasks.
