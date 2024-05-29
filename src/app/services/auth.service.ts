import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Method to register a new user
  register(user: any): Observable<any> {
    return this.http.post(this.apiURL, user); // POST request to add a new user
  }

  // Method to log in a user
  logIn(id: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiURL}?id=${id}`).pipe(
      map((users) => {
        // Find the user with matching ID and password
        const matchedUser = users.find(
          (user) => user.id === id && user.password === password
        );
        return matchedUser ? matchedUser : null; // Return the matched user or null if not found
      })
    );
  }

  // Method to get user data by user code
  getByCode(code: any): Observable<any> {
    return this.http.get(this.apiURL + '/' + code); // GET request to fetch user data by code
  }

  // Method to update user information
  updateUser(code: any, inputData: any): Observable<any> {
    return this.http.patch(this.apiURL + '/' + code, inputData); // PATCH request to update user data
  }

  // Method to check if a user is logged in
  isLoggedIn() {
    return !!sessionStorage.getItem('user'); // Check if user data is present in session storage
  }

  // Method to log out a user
  logout() {
    sessionStorage.removeItem('user'); // Remove user data from session storage
  }
}
