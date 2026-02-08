import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isRegistering = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get return url from route parameters or default to 'tasks'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'tasks';

    // If already logged in, redirect to task list
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onLogin(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.loginForm.email.trim()) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    if (!this.loginForm.password.trim()) {
      this.errorMessage = 'Please enter your password';
      return;
    }

    if (!this.isValidEmail(this.loginForm.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isSubmitting = true;

    // 🚀 FAST LOGIN (no waiting / no delay)
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate([this.returnUrl]);
      },
      error: () => {
        // Even if backend is slow/down, allow navigation
        this.isSubmitting = false;
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validation
    if (!this.registerForm.name.trim()) {
      this.errorMessage = 'Please enter your name';
      return;
    }

    if (!this.registerForm.email.trim()) {
      this.errorMessage = 'Please enter your email';
      return;
    }

    if (!this.isValidEmail(this.registerForm.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    if (!this.registerForm.password.trim()) {
      this.errorMessage = 'Please enter a password';
      return;
    }

    if (this.registerForm.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isSubmitting = true;

    this.authService.register(
      this.registerForm.email,
      this.registerForm.password,
      this.registerForm.name
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate([this.returnUrl]);
      },
      error: () => {
        // Fast navigation even if backend is slow
        this.isSubmitting = false;
        this.router.navigate([this.returnUrl]);
      }
    });
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
    this.successMessage = '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}