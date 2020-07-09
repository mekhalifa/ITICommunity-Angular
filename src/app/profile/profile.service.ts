import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseUrl = environment.middleware;
  token = localStorage.getItem('token');
  


  constructor(private http:HttpClient) {
   }

   //decodeToken = this.jwtHelper.decodeToken(this.token);


  getUserForProfile(id):Observable<any>{
    
    return this.http.get(this.baseUrl + 'users/' + id);
  }
}
