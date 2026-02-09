import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService, User } from '../../services/auth.service';
import { Task, Person } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  todayDate: string = '';
  currentUser: User | null = null;

  // Filter and sort
  filterStatus: 'ALL' | 'PENDING' | 'COMPLETED' = 'ALL';
  sortByDate: boolean = false;

  // Edit mode
  editingTaskId: number | null = null;
  editingTask: Task | null = null;

  newTask: Task = {
    title: '',
    description: '',
    assignedTo: [],
    teamName: '',
    dueDate: null,
    status: 'PENDING'
  };

  personName = '';
  personEmail = '';
  
  // Error messages for validation
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todayDate = new Date().toISOString().split('T')[0];
    this.currentUser = this.authService.currentUser;
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.map(task => ({
          ...task,
          assignedTo: task.assignedTo ?? []   // ✅ avoid undefined
        }));
      },
      error: (err) => console.error(err)
    });
  }

  addPerson(): void {
    if (!this.personName.trim() || !this.personEmail.trim()) {
      return;
    }

    const person: Person = {
      name: this.personName.trim(),
      email: this.personEmail.trim()
    };

    this.newTask.assignedTo.push(person);

    this.personName = '';
    this.personEmail = '';
  }

  removePerson(index: number): void {
    this.newTask.assignedTo.splice(index, 1);
  }

  addTask(): void {
    const today = new Date().toISOString().split('T')[0];
    this.errorMessage = '';

    // AUTO-ADD PERSON if user typed but didn’t click "+ Add"
    if (this.personName.trim() && this.personEmail.trim()) {
      this.addPerson();
    }

    //  VALIDATION
    if (!this.newTask.title.trim()) {
      this.errorMessage = 'Please enter a task title';
      return;
    }

    if (this.newTask.assignedTo.length === 0) {
      this.errorMessage = 'Please add at least one person';
      return;
    }

    //  DATE VALIDATION
    if (this.newTask.dueDate && this.newTask.dueDate < today) {
      this.errorMessage = 'Due date cannot be in the past';
      return;
    }

    this.isSubmitting = true;

    //  SEND FULL OBJECT (name + email)
    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loadTasks();
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error adding task:', err);
        if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please ensure the backend is running on port 8081.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please check backend logs.';
        } else {
          this.errorMessage = 'Failed to add task: ' + (err.error?.message || err.message || 'Unknown error');
        }
      }
    });
  }

  markDone(task: Task): void {
    const updatedTask: Task = {
      ...task,
      status: task.status === 'PENDING' ? 'COMPLETED' : 'PENDING'
    };

    this.taskService.updateTask(updatedTask)
      .subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id)
      .subscribe(() => this.loadTasks());
  }

  // Filter and sort tasks based on status and due date
  getFilteredAndSortedTasks(): Task[] {
    let filtered = this.tasks;

    // Apply status filter
    if (this.filterStatus !== 'ALL') {
      filtered = filtered.filter(task => task.status === this.filterStatus);
    }

    // Apply sorting by due date
    if (this.sortByDate) {
      filtered = [...filtered].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }

    return filtered;
  }

  // Start editing a task
  startEditTask(task: Task): void {
    this.editingTaskId = task.id!;
    this.editingTask = { ...task };
  }

  // Cancel editing
  cancelEditTask(): void {
    this.editingTaskId = null;
    this.editingTask = null;
  }

  // Save edited task
  saveEditTask(): void {
    if (!this.editingTask || !this.editingTask.title.trim()) {
      this.errorMessage = 'Task title cannot be empty';
      return;
    }

    this.isSubmitting = true;
    this.taskService.updateTask(this.editingTask).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.loadTasks();
        this.cancelEditTask();
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error updating task:', err);
        this.errorMessage = 'Failed to update task';
      }
    });
  }

  private resetForm(): void {
    this.newTask = {
      title: '',
      description: '',
      assignedTo: [],
      teamName: '',
      dueDate: null,
      status: 'PENDING'
    };
    this.personName = '';
    this.personEmail = '';
    this.errorMessage = '';
    this.editingTaskId = null;
    this.editingTask = null;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
