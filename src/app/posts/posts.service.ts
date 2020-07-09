import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { API } from '../shared';

import { IPost } from '../shared/models/IPost';

import { map,observeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  // getPosts() {
  //   return this.http.get("https://localhost:44363/api/posts").pipe(
  //   map((m:any[]) => {

  //     const res: IPost[] = [];
  //     m.forEach(e => {
  //       res.push({
  //         id:e['id'],
  //         postBody: e['postBody'],
  //         picture: e['picture'],
  //         date: e['date'],
  //         video: e['video'],
  //         userId: e['userId'],
  //         user: {
  //           id: e['id'],
  //           name: e['name'],
  //         }
  //       })
  //     });
  //     return res; 
  //   })); 
  // }
  getPosts() {
    return this.http.get("https://localhost:44363/api/posts").pipe(
      
      map((m: any[]) => {

        const res: IPost[] = [];
        m.forEach(e => {
          res.push({
            postId: e['postId'],
            postbody: e['postbody'],
            postedByAvatar: e['postedByAvatar'],
            postedDate: e['postedDate'],
            postedBy: e['postedBy'],
            postedByName: e['postedByName'],
            postPhoto: e['postPhoto']
          

          })
        });
        return res;
      }));
  }
  // getpostsAll(){
  //   return this.http.get('https://localhost:44363/api/posts').subscribe((res)=>{
  //     console.log(res);
      
  //   })
  // }


}
