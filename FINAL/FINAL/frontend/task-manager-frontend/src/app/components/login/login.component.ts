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
  ) { }

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

    // Quick validation - no trim for performance
    if (!this.loginForm.email || !this.loginForm.password) {
      this.errorMessage = 'Please enter your email and password';
      return;
    }

    this.isSubmitting = true;

    // Optimized login with instant navigation
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: (response) => {
        if (response.success) {
          // Navigate immediately without waiting
          this.router.navigate([this.returnUrl]);
        } else {
          this.isSubmitting = false;
          this.errorMessage = response.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check if backend is running on port 8081.';
        } else {
          this.errorMessage = 'Login failed: ' + (err.error?.message || 'Please try again');
        }
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
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Registration error:', err);
        if (err.status === 400) {
          this.errorMessage = err.error?.message || 'Email already exists. Please use a different email.';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please check if backend is running on port 8081.';
        } else {
          this.errorMessage = 'Registration failed: ' + (err.error?.message || 'Please try again');
        }
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
