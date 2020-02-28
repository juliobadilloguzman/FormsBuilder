import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this._authService.isLoggedIn()){
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
  
}
