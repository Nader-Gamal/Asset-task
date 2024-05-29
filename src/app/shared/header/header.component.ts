import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Subscription to keep track of router events
  private routerSubscription: Subscription | null = null;

  // Boolean to determine if the background should be black
  public isBgBlack: boolean = false;

  // Boolean to check if the user is on the user page
  public isActive: boolean = true;

  constructor(private router: Router, private _AuthService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to router events to determine the current URL
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        // Set isBgBlack to true if the current URL is '/login', '/register', or '/user'
        this.isBgBlack =
          event.url === '/login' ||
          event.url === '/register' ||
          event.url === '/user';

        // Set isActive to true if the current URL is '/user'
        this.isActive = event.url === '/user';
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the router events when the component is destroyed to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Method to check if the user is logged in by calling AuthService
  isLoggedIn() {
    return this._AuthService.isLoggedIn();
  }

  // Method to log out the user by calling AuthService and navigating to the login page
  logout() {
    this._AuthService.logout();
    this.router.navigate(['/login']);
  }
}
