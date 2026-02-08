

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
    return this.http.post<Task>(this.baseUrl, task, { headers });
  }

  // UPDATE task (Done / Undo)
  updateTask(task: Task): Observable<Task> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task, { headers });
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
}