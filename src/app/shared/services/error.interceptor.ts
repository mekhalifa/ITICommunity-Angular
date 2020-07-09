import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable()

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError( err => {
                
                if(err.status === 401)
                {
                    return throwError(err.statusText)
                }

                if(err instanceof HttpErrorResponse){
                    //500 internal server error
                    const applicationError = err.headers.get('Application-Error');
                    if(applicationError){
                        return throwError(applicationError);
                    }
                    const serverError = err.error;
                    let modelStateError='';
                    if(serverError.errors && typeof serverError.errors === 'object'){
                        for(const key in serverError.errors){
                            if(serverError.errors[key]){
                                modelStateError += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateError || serverError || 'Unknown Error')
                }
            })
        )
        //throw new Error("Method not implemented.");
    }


}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true

}