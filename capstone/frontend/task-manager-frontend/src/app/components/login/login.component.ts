import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isRegistering = false;
  errorMessage = '';

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

  constructor(private router: Router) {}

  onLogin() {
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (
      savedUser.email === this.loginForm.email &&
      savedUser.password === this.loginForm.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/tasks']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

  onRegister() {
    if (
      !this.registerForm.name ||
      !this.registerForm.email ||
      !this.registerForm.password ||
      this.registerForm.password !== this.registerForm.confirmPassword
    ) {
      this.errorMessage = 'Please fill all fields correctly';
      return;
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password
      })
    );

    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/tasks']);
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = '';
  }
}