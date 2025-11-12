# 🧾 AttendEase – Attendance Management System  

**AttendEase** is a web-based platform that automates attendance tracking for students and employees. It eliminates manual entry through a secure, role-based system with real-time access and analytics.

---

## 🚀 Tech Stack  
- **Frontend:** React.js, React Router, TailwindCSS / Bootstrap  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose ORM)  
- **Authentication:** JWT-based login/signup (Admin / Teacher / Student)  
- **Hosting:** Vercel (frontend), Render / Railway (backend), MongoDB Atlas (DB)

---

## 🔑 Features  
- 🔒 Role-based authentication (Admin / Teacher / Student)  
- ➕ Add, ✏️ edit, 🗑️ delete, and 👁️ view students & attendance  
- 📅 Mark and update daily attendance  
- 🔍 Search, filter, and sort records  
- 📊 Server-side pagination  
- 🧾 Attendance reports and analytics  

---

## 🧩 API Endpoints  

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **POST** | `/api/auth/signup` | Register new user |
| **POST** | `/api/auth/login` | User login |
| **GET** | `/api/students` | Get all students |
| **POST** | `/api/students` | Add student |
| **PUT** | `/api/students/:id` | Update student |
| **DELETE** | `/api/students/:id` | Delete student |
| **GET** | `/api/attendance` | Fetch attendance records |
| **POST** | `/api/attendance` | Mark attendance |
| **PUT** | `/api/attendance/:id` | Update attendance |

---

## ⚙️ Setup  

```bash
# Clone the repository
git clone https://github.com/yourusername/attendease.git
cd attendease
