import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from './auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var isLoggedIn = this.authService.isLoggedIn
    if (!isLoggedIn) {
      // this.router.navigateByUrl(environment.klikOpen);
      this.router.navigateByUrl("/login");

    }
    return isLoggedIn;
  }

}
