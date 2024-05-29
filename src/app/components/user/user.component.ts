import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  // Columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  // Data source for the table
  dataSource: MatTableDataSource<any>;

  constructor(
    private authService: AuthService,
    private _MatDialog: MatDialog,
    private _Router: Router
  ) {
    // Initialize data source
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    // Load user data when the component initializes
    this.loadUserData();
  }

  // Method to load user data
  loadUserData() {
    // Retrieve user data from session storage
    const userString = sessionStorage.getItem('user');
    const userId = userString ? JSON.parse(userString).id : '';
    // Fetch user data from the server using the user ID
    this.authService.getByCode(userId).subscribe((user) => {
      this.dataSource.data = [user]; // Assign the fetched user data to the data source
    });
  }

  // Method to log out the user
  logout() {
    this.authService.logout(); // Call AuthService to log out
    this._Router.navigate(['/login']); // Navigate to the login page
  }

  // Method to update user information
  updateUser(code: any) {
    // Open a dialog for updating user information
    const dialogRef = this._MatDialog.open(UpdateComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      width: '50%',
      data: {
        userCode: code, // Pass the user code to the dialog component
      },
    });

    // Subscribe to the dialog's afterClosed observable to handle the result
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('User updated successfully'); // Alert the user on successful update
        this.loadUserData(); // Reload the user data to update the table
      }
    });
  }
}
