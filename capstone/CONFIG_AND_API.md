# Configuration Checklist & API Documentation

## 📋 Pre-Deployment Checklist

### Database Setup
- [ ] MySQL Server is running
- [ ] Database created: `CREATE DATABASE task_manager_db;`
- [ ] User credentials valid: `root` / `rps@123`

### Backend Configuration
- [ ] Java 17+ installed
- [ ] Maven available (mvnw in project root)
- [ ] Server port set to 8081 in `application.properties`
- [ ] CORS enabled: `@CrossOrigin(origins = "*")` in TaskController
- [ ] Email configuration (optional):
  - `spring.mail.username` set to your Gmail
  - `spring.mail.password` set to app-specific password

### Frontend Configuration
- [ ] Node.js 18+ and npm 11.1.0+ installed
- [ ] API URL points to `http://localhost:8081/api/tasks`
- [ ] HttpClient provider configured in `app.config.ts`
- [ ] All dependencies installed via `npm install`

---

## 🔌 API Reference

### Base URL
```
http://localhost:8081/api/tasks
```

### Endpoints

#### 1. Get All Tasks
```
GET /api/tasks
Response: Task[]
```

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task manager application",
    "status": "PENDING",
    "dueDate": "2025-02-15",
    "assignedTo": [
      {
        "name": "John Doe",
        "email": "john@example.com"
      }
    ]
  }
]
```

---

#### 2. Create Task
```
POST /api/tasks
Content-Type: application/json

Body: {
  "title": "string",
  "description": "string",
  "status": "PENDING" | "COMPLETED",
  "dueDate": "YYYY-MM-DD" (optional),
  "assignedTo": [
    {
      "name": "string",
      "email": "string"
    }
  ]
}
```

**Response:** 201 Created with created Task object

---

#### 3. Update Task
```
PUT /api/tasks/{id}
Content-Type: application/json

Body: Task object (same structure as POST)
```

**Response:** 200 OK with updated Task object

---

#### 4. Delete Task
```
DELETE /api/tasks/{id}
```

**Response:** 204 No Content

---

## 🔄 Data Models

### Task (Frontend & Backend)

**Frontend (TypeScript):**
```typescript
export interface Task {
  id?: number;                          // Optional (auto-generated)
  title: string;                        // Required
  description: string;                  // Required
  status: 'PENDING' | 'COMPLETED';      // Required
  dueDate: string;                      // ISO format: YYYY-MM-DD
  teamName?: string;                    // Optional
  assignedTo: Person[];                 // Required, min 1
}

export interface Person {
  name: string;                         // Required
  email: string;                        // Required
}
```

**Backend (Java):**
```java
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status;               // "PENDING" or "COMPLETED"
    private LocalDate dueDate;           // Serialized as ISO date string

    @ElementCollection
    @CollectionTable(name = "task_assigned_to", joinColumns = @JoinColumn(name = "task_id"))
    private List<Person> assignedTo;
}

@Embeddable
public class Person {
    private String name;
    private String email;
}
```

---

## ⚙️ Business Logic & Validation

### Frontend Validation
1. **Task Title**: Required, non-empty
2. **Assigned People**: At least 1 person required
3. **Due Date**: 
   - Must be today or later (not in the past)
   - Format: YYYY-MM-DD (HTML5 date input)
4. **Auto-add**: If user typed person info but didn't click "+ Add", it's auto-added before submission

### Backend Validation
1. **Due Date Check**: Ensures dueDate is not in the past (null values allowed)
2. **Data Persistence**: All fields validated by JPA constraints
3. **Email Notifications**: Automatically sent for tasks due tomorrow at 9 AM

### Scheduled Tasks
- **TaskReminderScheduler**: Runs daily at 9 AM (cron: `0 0 9 * * ?`)
- Sends email reminders to all assignees for tasks due tomorrow
- Requires valid email configuration to work

---

## 🚀 Startup Sequence

### Option 1: Using Batch Scripts (Windows)
```bash
# Install dependencies first
install-dependencies.bat

# Then open 2 terminal windows:
# Terminal 1:
start-backend.bat

# Terminal 2:
start-frontend.bat
```

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd backend/taskmanager-backend
./mvnw spring-boot:run
# Expected: Application running on http://localhost:8081
```

**Terminal 2 - Frontend:**
```bash
cd frontend/task-manager-frontend
npm install  # if not done already
npm start
# Expected: Compiled successfully, serving on http://localhost:4200
```

---

## 🔍 Verification Steps

### 1. Check Backend Health
Open browser and visit:
```
http://localhost:8081/api/tasks
```
Should return: `[]` (empty array) or list of tasks

### 2. Check Frontend Load
Open browser and visit:
```
http://localhost:4200
```
Should display: TaskFlow application with form

### 3. Test API Call
In browser console (F12):
```javascript
fetch('http://localhost:8081/api/tasks')
  .then(r => r.json())
  .then(console.log)
```
Should return task array without CORS error

### 4. Create a Task
1. Fill in task form
2. Add at least one person
3. Click "+ Add Task"
4. Check browser console (F12) for errors
5. Verify task appears in "Your Tasks" section

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `Cannot GET /api/tasks` | Backend not running on port 8081 |
| CORS error in console | Backend missing `@CrossOrigin` annotation |
| `Connection refused` | MySQL not running or credentials wrong |
| Frontend won't compile | Run `npm install --legacy-peer-deps` |
| Email not sending | Gmail credentials incorrect or not configured |
| Dates showing wrong format | Frontend expects ISO format (YYYY-MM-DD) |

---

## 📊 Database Schema

### Table: `task`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT | Primary Key, Auto-increment |
| title | VARCHAR(255) | Not null |
| description | LONGTEXT | Nullable |
| status | VARCHAR(255) | "PENDING" or "COMPLETED" |
| due_date | DATE | Nullable |

### Table: `task_assigned_to` (ElementCollection)
| Column | Type | Notes |
|--------|------|-------|
| task_id | BIGINT | Foreign Key to task.id |
| name | VARCHAR(255) | Person name |
| email | VARCHAR(255) | Person email |

**Note:** Tables are auto-created by Hibernate with `spring.jpa.hibernate.ddl-auto=update`

---

## 📝 File Structure Reference

```
capstone/
├── backend/
│   └── taskmanager-backend/
│       ├── pom.xml
│       ├── mvnw/mvnw.cmd
│       └── src/main/
│           ├── java/com/taskmanager/
│           │   ├── TaskmanagerApplication.java        [✓ @EnableScheduling]
│           │   ├── controller/TaskController.java      [✓ @CrossOrigin]
│           │   ├── service/TaskService.java            [✓ Fixed null check]
│           │   ├── service/EmailService.java
│           │   ├── scheduler/TaskReminderScheduler.java
│           │   ├── entity/Task.java
│           │   ├── entity/Person.java
│           │   └── repository/TaskRepository.java
│           └── resources/application.properties        [✓ Port 8081]
│
├── frontend/
│   └── task-manager-frontend/
│       ├── package.json
│       ├── angular.json
│       └── src/
│           ├── main.ts
│           ├── app.config.ts                          [✓ HttpClient configured]
│           ├── app.routes.ts
│           ├── app/
│           │   ├── models/
│           │   │   ├── task.model.ts                 [✓ Interface matches backend]
│           │   │   └── user.model.ts
│           │   ├── services/
│           │   │   └── task.service.ts               [✓ Port 8081]
│           │   └── components/
│           │       └── task-list/
│           │           ├── task-list.component.ts    [✓ Error handling]
│           │           └── task-list.component.html
│
├── INTEGRATION_SETUP.md                               [← You are here]
├── start-backend.bat
├── start-frontend.bat
└── install-dependencies.bat
```

---

## 🛠️ Additional Configuration Options

### Change Server Port (Backend)
Edit `backend/taskmanager-backend/src/main/resources/application.properties`:
```properties
server.port=8081
```
Then update frontend: `frontend/task-manager-frontend/src/app/services/task.service.ts`
```typescript
private baseUrl = 'http://localhost:8081/api/tasks';
```

### Enable Email Configuration
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

Get app password: https://myaccount.google.com/apppasswords

---

**Last Updated:** February 6, 2025
**Status:** ✅ Integration Complete & Tested
