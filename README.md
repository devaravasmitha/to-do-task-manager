# to-do-task-manager
Task /To-Do Management Application using Spring Boot, Angular &amp; Docker

# To-Do Task Manager – Full Stack Application

This repository contains a **To-Do Management Application** developed as part of the **Wipro Final Capstone Project**.

The application enables users to efficiently create, manage, assign, and track tasks, providing a clear overview of pending and completed work.  
It demonstrates complete full-stack development along with DevOps and cloud readiness.

---

## Project Overview

The To-Do Task Manager is a productivity-oriented application designed for individuals or small teams to manage daily tasks in a structured manner.

The system allows users to:
- Create tasks
- Assign tasks to multiple users
- Track task status (Pending / Completed)
- Set and validate due dates

The project follows a **clean, modular, and scalable architecture** using modern technologies across frontend, backend, database, DevOps, and cloud layers.

---

## Key Objectives

- Improve task organization and productivity
- Provide a structured task management workflow
- Implement RESTful APIs using Spring Boot
- Demonstrate full-stack development skills
- Apply DevOps practices using Docker
- Ensure cloud deployment readiness using Azure

---

## Core Functionalities

- Create new tasks
- Update existing tasks
- Delete tasks
- Assign tasks to multiple users
- Validate task due dates
- Mark tasks as Pending or Completed
- Fetch and view all tasks

---

## Application Architecture

The application follows a **layered and containerized architecture**.

### High-Level Architecture Flow

## Architecture Layers

### 1. Frontend Layer (Angular)

- Provides a user-friendly interface for task management
- Allows users to:
  - Add tasks
  - View tasks
  - Update task status
  - Delete tasks
- Communicates with the backend using REST APIs

---

### 2. Backend Layer (Spring Boot)

- Implements all business logic
- Exposes RESTful APIs
- Handles:
  - Task creation, update, deletion
  - Due date validation
  - Task status management
- Uses Spring Data JPA for database interaction
- Includes centralized Global Exception Handling

---

### 3. Database Layer (MySQL)

- Stores task-related data such as:
  - Task title
  - Description
  - Status
  - Due date
  - Assigned users
- Integrated using JPA entities and repositories

---

### 4. DevOps Layer (Docker & Docker Compose)

- Application components are containerized using Docker
- Docker Compose manages:
  - Frontend container
  - Backend container
  - MySQL container
- Ensures consistency across development and deployment environments

---

### 5. Cloud Deployment (Azure)

- Docker containers are cloud-ready
- Application can be deployed on:
  - Azure Virtual Machines
  - Azure Container Instances
- Supports scalability and real-world deployment scenarios

---

## Technology Stack

### Frontend
- Angular

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL

### DevOps
- Docker
- Docker Compose

### Cloud
- Microsoft Azure

### Tools
- Eclipse IDE
- Visual Studio Code
- Postman
- Maven
- Git & GitHub

---

## REST API Endpoints

| HTTP Method | Endpoint           | Description              |
|------------|--------------------|--------------------------|
| POST       | /api/tasks         | Create a new task        |
| GET        | /api/tasks         | Retrieve all tasks       |
| PUT        | /api/tasks/{id}    | Update an existing task  |
| DELETE     | /api/tasks/{id}    | Delete a task            |

---

## How to Run the Project

### Backend Setup (Spring Boot)

1. Import the backend project into Eclipse
2. Configure MySQL credentials in `application.properties`
3. Run `TaskmanagerApplication.java`
4. Backend runs on: http://localhost:8081
---

### Frontend Setup (Angular)

1. Open the frontend project in Visual Studio Code
2. Run the following commands: npm install and ng serve
3. Frontend runs on: http://localhost:4200
---

### Running Using Docker

1. Build Docker images
2. Run the application using: docker-compose up
3. Frontend, Backend, and Database start together

---

## Testing

- REST APIs tested using Postman
- CRUD operations verified successfully
- Validation and exception handling tested

---

## Conclusion

This project demonstrates:
- Full-stack application development
- REST API design and implementation
- Database integration using MySQL
- DevOps practices with Docker
- Cloud readiness using Microsoft Azure
---

## Author

Devara Vasmitha 

Dole Madhu Sri
