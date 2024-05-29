import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _FormBuilder: FormBuilder, // Service to build form controls
    private _AuthService: AuthService, // Service for authentication
    private _Router: Router // Service for navigating routes
  ) {}

  hide = true; // Boolean to toggle password visibility

  // Form group for registration form with validation rules
  registerForm = this._FormBuilder.group({
    id: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
    ],
    name: ['', Validators.required],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          // Regex pattern for password validation
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ),
      ]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
  });

  // Method to handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      // Check if the form is valid
      this._AuthService.register(this.registerForm.value).subscribe(() => {
        this._Router.navigate(['/login']); // Navigate to login page on successful registration
      });
    }
  }
}
