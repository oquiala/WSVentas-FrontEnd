import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._authService.auth.token

   if(token){
      request = request.clone({ setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error.status)
        if(error.status === 401){
          this.router.navigate(['login']);
        }
        return throwError(() => new Error('Error'));
      })
    )

  }
}
