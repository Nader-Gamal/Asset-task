import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // Determines if the route can be activated
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree> // Observable that emits a boolean or UrlTree
    | Promise<boolean | UrlTree> // Promise that resolves to a boolean or UrlTree
    | boolean // Synchronous return type for boolean
    | UrlTree {
    // Synchronous return type for UrlTree
    const user = sessionStorage.getItem('user'); // Get the user data from session storage
    if (user) {
      return true; // Allow route activation if user is found
    } else {
      this.router.navigate(['/login']); // Redirect to the login page if user is not found
      return false; // Prevent route activation
    }
  }
}
