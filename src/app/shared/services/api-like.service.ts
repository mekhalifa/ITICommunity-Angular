import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "https://localhost:44363/api/likes";
@Injectable({
  providedIn: 'root'
})
export class ApiLikeService {

  constructor(private http: HttpClient) { }

  addLike(like: Like): Observable<Like> {
    return this.http.post<Like>(apiUrl, like, httpOptions).pipe(
      tap((user: Like) => console.log(`added like w/ id=${like.UserId}`)),
      catchError(this.handleError<Like>('addLike'))
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
export class Like{
  UserId:any;
  PostId:any;
}