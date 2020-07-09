import { Injectable, Output } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Post, IPostPost, IPost } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "https://localhost:44363/api/posts";

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {

  
  constructor(private http:HttpClient) { 
   
  }

  postsApi:Post[];

  getPosts(): Observable<IPostPost[]> {
    return this.http.get<IPostPost[]>(apiUrl)
      .pipe(
        tap(post => console.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPostsOfUser(id): Observable<IPost[]> {
    return this.http.get<IPost[]>(apiUrl + '/userpost' + id)
      .pipe(
        tap(post => console.log('fetched Posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`fetched Post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(apiUrl, post, httpOptions).pipe(
      tap((post: Post) => console.log(`added Post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(id: any, post: Post): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post, httpOptions).pipe(
      tap(_ => console.log(`updated post id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
