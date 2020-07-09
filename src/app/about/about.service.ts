import { Injectable } from '@angular/core';
import { JwtService } from '../shared/services/jwt.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http:HttpClient, private jwtService:JwtService) { }

  Url = 'https://localhost:44363/api/Users/addstory/';

  userId= this.jwtService.getDecodedToken()['nameid']

  newStory:string;

  addStory(){
    return this.http.post<any>(this.Url+this.userId,{ story: this.newStory });
  }


  deleteStory(storyuserid){

   return this.http.delete('https://localhost:44363/api/Users/deletestory/'+storyuserid);
  }


  getStory(id){
    return this.http.get('https://localhost:44363/api/Users/story/'+this.userId);
  }

  getWork(){

  }
}
