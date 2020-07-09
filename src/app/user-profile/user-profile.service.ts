import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../shared/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  baseUrl = environment.middleware;
  //token = localStorage.getItem('token');

  //currentUserId = this.jwtService.getDecodedToken()['nameid'];

  currentUserId = localStorage.getItem('userId');
  

  visitedId= localStorage.getItem('visitedId');


  constructor(private http:HttpClient ,private jwtService:JwtService) {
   }

   follow():Observable<any> {
   //console.log('currentUserId'+this.currentUserId);
    return this.http.post<any>(this.baseUrl+'follows', {"UserId":this.currentUserId,"FollowingId":this.visitedId},{
      headers:new HttpHeaders({
        "Content-Type":"Application/json",
        "Accept":"Application/json"
      })
    });
  }

  unfollow(){
    return this.http.delete(this.baseUrl + 'DeleteFollow' + this.visitedId)
  }

  getById(id){
    return  this.http.get(this.baseUrl+'follows'+'/'+id);
   }
  getUserForProfile(id):Observable<any>{
    
    return this.http.get(this.baseUrl + 'users/' + id);
  }
}
