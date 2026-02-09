

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // Use relative URL so dev proxy can forward to backend
  private baseUrl = '/api/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET all tasks from backend
  getTasks(): Observable<Task[]> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<Task[]>(this.baseUrl, { headers });
  }

  // ADD new task to backend
  addTask(task: Task): Observable<Task> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const payload = this.normalizeTask(task);
    return this.http.post<Task>(this.baseUrl, payload, { headers });
  }

  // UPDATE task (Done / Undo)
  updateTask(task: Task): Observable<Task> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const payload = this.normalizeTask(task);
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, payload, { headers });
  }

  // DELETE task
  deleteTask(id: number): Observable<any> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  private normalizeTask(task: Task): Task {
    const dueDate = task.dueDate ? task.dueDate : null;
    return {
      ...task,
      dueDate,
      assignedTo: task.assignedTo ?? []
    };
  }
}
