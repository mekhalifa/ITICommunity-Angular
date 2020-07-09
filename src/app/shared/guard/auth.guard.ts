import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service : JwtService, private router : Router) {}
  canActivate(): boolean  {
    
    if(this.service.loggedIn()){

      return true;
    }    

    console.log('error');

    this.router.navigate(['/registration'])


  }
  
}
