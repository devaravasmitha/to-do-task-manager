import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

  userEmail = '';

  tasks: any[] = [];
  assignees: any[] = [];

  task = {
    title: '',
    description: '',
    name: '',
    email: '',
    dueDate: ''
  };

  minDate = new Date().toISOString().split('T')[0];

  constructor(private router: Router) {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      this.router.navigate(['/']);
    }

    const user = localStorage.getItem('user');
    if (user) {
      this.userEmail = JSON.parse(user).email;
    }
  }

  addAssignee() {
    if (this.task.name && this.task.email) {
      this.assignees.push({
        name: this.task.name,
        email: this.task.email
      });

      this.task.name = '';
      this.task.email = '';
    }
  }

  addTask() {
    if (!this.task.title || !this.task.dueDate) return;

    this.tasks.push({
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate,
      assignees: [...this.assignees],
      status: 'PENDING'
    });

    this.task = {
      title: '',
      description: '',
      name: '',
      email: '',
      dueDate: ''
    };
    this.assignees = [];
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}