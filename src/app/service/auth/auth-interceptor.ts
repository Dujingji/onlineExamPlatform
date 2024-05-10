import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Observable, catchError, first, map, switchMap, tap, throwError } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private refresh = false
  constructor(private authService: AuthService, private messageService: NzMessageService) { }

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
      return next.handle(authRequest).pipe(
        map(event => {
          if (event instanceof HttpResponse) {
            // 检查响应状态码
            if (event.status === 200) {
              return event; // 如果状态码为200，正常返回响应数据
            }
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          // 如果响应状态码不是200，显示错误提示
          if(error.status === 400)
            this.messageService.error(`数据请求错误！: 状态码：${error.status}，信息：请求异常，请重新尝试或联系管理员！`);
          else if(error.status === 500)
            this.messageService.error(`服务器发生错误！: 状态码：${error.status}，信息：服务器异常，请重新尝试或联系管理员！`);
          else if(error.status === 404 ){
            this.messageService.error(`未查询到相关接口！: 状态码：${error.status}，请重新尝试！`);
          }
          return throwError(() => new Error(error.message));
        })
      );
    }
    else{
      return next.handle(req);
    }
  }

}
