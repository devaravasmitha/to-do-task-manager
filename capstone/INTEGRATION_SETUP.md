# Frontend & Backend Integration Setup Guide

## ✅ Current Configuration Status

### Backend (Spring Boot - Port 8081)
- **Server Port**: 8081
- **API Base URL**: `http://localhost:8081/api/tasks`
- **Database**: MySQL (`task_manager_db`)
- **CORS**: Enabled for all origins (`@CrossOrigin(origins = "*")`)
- **Java Version**: 17
- **Dependencies**: Spring Web, Data JPA, MySQL Driver, Mail Starter

### Frontend (Angular 21.1.0)
- **API URL**: `http://localhost:8081/api/tasks`
- **HTTP Client**: Configured via `provideHttpClient(withFetch())`
- **Node Version**: npm 11.1.0 required
- **Port**: Default 4200 (ng serve)

---

## 📋 Pre-requisites

### 1. **MySQL Database Setup**
Ensure MySQL is running with the following:
```sql
CREATE DATABASE IF NOT EXISTS task_manager_db;
```

**Check credentials in backend** [application.properties](backend/taskmanager-backend/src/main/resources/application.properties):
- Username: `root`
- Password: `rps@123`
- Host: `localhost:3306`

### 2. **Java Environment**
- Java 17+ installed
- Maven available (mvnw included in project)

### 3. **Node.js/npm**
- Node.js 18+ (npm 11.1.0 or compatible)

---

## 🚀 Quick Start Steps

### Step 1: Start Backend
```bash
cd backend/taskmanager-backend

# Build the project
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

**Expected Output**:
```
Started TaskmanagerApplication in X.XXX seconds
Exposing 1 endpoint(s) for inspection
```

**Verify**: Open `http://localhost:8081/api/tasks` in browser (should return empty array `[]` or task list)

---

### Step 2: Start Frontend
```bash
cd frontend/task-manager-frontend

# Install dependencies (if not already done)
npm install

# Run development server
npm start
```

**Expected Output**:
```
✔ Compiled successfully.
✔ Built successfully.

Application bundle generation complete. [X seconds]

Watch mode enabled. Watching for file changes...
```

**Open**: `http://localhost:4200/` in browser

---

## 🔧 Troubleshooting

### Issue 1: Frontend Build Fails
**Error**: Module not found, peer dependency warnings
**Solution**:
```bash
cd frontend/task-manager-frontend
npm install --legacy-peer-deps
npm start
```

### Issue 2: Backend: "Connection refused" for MySQL
**Error**: `Failed to determine a suitable driver class`
**Solution**:
1. Start MySQL service
2. Verify database exists: `CREATE DATABASE task_manager_db;`
3. Check credentials in [application.properties](backend/taskmanager-backend/src/main/resources/application.properties)

### Issue 3: CORS Errors in Browser Console
**Error**: `Access to XMLHttpRequest blocked by CORS policy`
**Solution**: Already configured with `@CrossOrigin(origins = "*")` - verify backend is running on port 8081

### Issue 4: 404 on API calls
**Error**: Frontend shows "Cannot GET /api/tasks"
**Solution**: 
- Verify backend is running on `http://localhost:8081`
- Check TaskService URL: should be `http://localhost:8081/api/tasks`
- Check browser console for network requests

---

## 📡 API Endpoints

All endpoints are prefixed with: `http://localhost:8081/api/tasks`

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/` | Get all tasks |
| POST | `/` | Create new task |
| PUT | `/{id}` | Update task |
| DELETE | `/{id}` | Delete task |

---

## 🔄 Data Model Compatibility

### Task Entity (Backend ↔ Frontend)
```
Backend (Java)          → Frontend (TypeScript)
Long id                 → number id?
String title            → string title
String description      → string description
String status           → 'PENDING' | 'COMPLETED'
LocalDate dueDate       → string dueDate (ISO format)
List<Person> assignedTo → Person[] assignedTo
                        → string teamName?
```

**Note**: Frontend also has optional `teamName` field not in backend entity

---

## 📧 Email Configuration (Optional)

If you want to enable email notifications, update [application.properties](backend/taskmanager-backend/src/main/resources/application.properties):
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

Generate app password: https://myaccount.google.com/apppasswords

---

## ✨ Verification Checklist

- [ ] MySQL running and `task_manager_db` exists
- [ ] Backend starts at `http://localhost:8081`
- [ ] Frontend starts at `http://localhost:4200`
- [ ] Browser can fetch tasks from `/api/tasks`
- [ ] Can create, update, delete tasks in UI
- [ ] No CORS errors in browser console
- [ ] No 404 errors for API calls

---

## 🛑 Stop Services

```bash
# Backend: Ctrl+C in terminal
# Frontend: Ctrl+C in terminal
```

---

Generated: 2025-02-06
