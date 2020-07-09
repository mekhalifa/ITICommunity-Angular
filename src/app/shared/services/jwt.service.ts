import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  //decodedToken:any;

  token = localStorage.getItem('token');

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  loggedIn(){

    const token = localStorage.getItem('token');

    //if token is expired returns true if its there return false
    if (token!==null){
      return true;
    }else{
      return false;
    }

   // return !this.jwtHelper.isTokenExpired(this.token);
  }

  getDecodedToken()
  {
    const token = localStorage.getItem('token');

    var decodedToken =  this.jwtHelper.decodeToken(token);

    return  decodedToken;

  }


  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/registration ']);
  } 

}
