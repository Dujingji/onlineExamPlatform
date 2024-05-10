import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Observable, catchError, first, switchMap, tap, throwError } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private refresh = false
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let expires = true
    if (localStorage.getItem('expiresIn') !== null) {
      expires = new Date(localStorage.getItem('expiresIn')!).getTime()  < new Date().getTime() + 1 * 10 * 60 * 1000
    }
    if (expires && localStorage.getItem('refresh_token') && !this.refresh) {
      this.refresh = true
      return this.authService.autoRefreshToken()
        .pipe(tap(res => this.authService.setLogoutTime(res.accessToken, res.expiresIn, res.refresh_token)), // side effect to set token property on auth service
          switchMap(res => { // use transformation operator that maps to an Observable<T>
            const authRequest = req.clone({
              headers: req.headers.set("authorization", "Bearer " + res.accessToken)
            });
            this.refresh = false
            return next.handle(authRequest);
          }))
        .pipe(catchError((error: HttpErrorResponse) => {
          if(error.status === 401){
            this.authService.logout();
          }
          return next.handle(req);
        }))
    }
    else if (token && !expires) {
      const authRequest = req.clone({
        headers: req.headers.set("authorization", "Bearer " + token)
      });
      this.refresh = false
      return next.handle(authRequest);
    }
    else{
      return next.handle(req);
    }
  }

}
