import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {IUser } from './IUser'
 import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private Url: string = "https://localhost:44363/api/";

  constructor(private http:HttpClient) { }


  register(user:IUser ) : Observable<IUser>  {

    return  this.http.post<IUser>(this.Url +"Auth/register",user);
 
   }

   getIntakes():Observable<any>{
    return this.http.get<any>("https://localhost:44363/api/Intakes")

    
  }

  getTracks() :Observable<any>{
    return this.http.get<any>(this.Url+"Tracks")
  }

  getBranchs() :Observable<any>{
    return this.http.get<any>(this.Url+"Branches")
  }


  
  login(loginCredentials : ILoginCredentials):Observable<ILoginCredentials> {
    
    //console.log(loginCredentials);
    return this.http.post<ILoginCredentials>(this.Url+"Auth/login", loginCredentials,{
      headers:new HttpHeaders({
        "Content-Type":"Application/json",
        "Accept":"Application/json"
      })
    });
  }

}


export interface ILoginCredentials {
   
  emailaddress:string,
  password:string
  
}