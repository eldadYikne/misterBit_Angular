import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  userService = inject(UserService)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.userService.getLoggedInUser()
    // const isSignupPath = new RegExp('signup', 'i').test(route.url[0].path)
    console.log('userrrrrrrrrrrrrr', user)
    if (user ) {
      return true
    } else {
      return false
    }
  }

}
