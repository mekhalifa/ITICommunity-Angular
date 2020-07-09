import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private SERVER_URL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public get() {
    return this.httpClient.get(this.SERVER_URL);
  }  


  // public sendGetRequest() {
  //   // Add safe, URL encoded _page and _limit parameters 

  //   return this.httpClient.get(this.SERVER_URL, { params: new HttpParams({ fromString: "_page=1&_limit=20" }), observe: "response" }).pipe(retry(3), catchError(this.handleError), tap(res => {
  //     console.log(res.headers.get('Link'));
  //     this.parseLinkHeader(res.headers.get('Link'));
  //   }));
  // }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest() {
    return this.httpClient.get(this.SERVER_URL).pipe(catchError(this.handleError));
  }
}
