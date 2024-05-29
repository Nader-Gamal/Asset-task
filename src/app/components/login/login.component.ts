import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder, // Service to build form controls
    private _AuthService: AuthService, // Service for authentication
    private _Router: Router // Service for navigating routes
  ) {
    sessionStorage.clear(); // Clear session storage on component initialization
  }

  hide: boolean = true; // Boolean to toggle password visibility

  // Form group for login form with validation rules
  logInForm = this._FormBuilder.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)], // Validators for 'id' field
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}' // Regex pattern for password validation
        ),
      ],
    ],
  });

  // Method to handle form submission
  onSubmit() {
    if (this.logInForm.valid) {
      // Check if the form is valid
      const id = this.logInForm.get('id')?.value as string; // Get 'id' value from the form
      const password = this.logInForm.get('password')?.value as string; // Get 'password' value from the form
      this._AuthService.logIn(id, password).subscribe((user) => {
        // Call AuthService to log in
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user)); // Store user data in session storage
          this._Router.navigate(['/user']); // Navigate to user page
        } else {
          alert('Invalid credentials'); // Alert user if login fails
        }
      });
    }
  }
}
