import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from '../servicios/auth-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthFirebaseService, private router:Router)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      return this.authService.UsuarioLogeado().then((user)=>{
        if(user)
        {
          return true;
        }
        else
        {
          this.router.navigateByUrl("/Login");
          return false;
        }
      })
      .catch((e)=>{
        console.log(e);
        this.router.navigateByUrl("/Login");
        return false;
      })
  }
  
}
