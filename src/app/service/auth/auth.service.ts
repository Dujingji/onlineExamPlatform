import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, catchError, first, tap, throwError } from "rxjs";
import { AuthModel } from 'src/modules/auth/auth';
import { user } from "src/modules/user/user";
import { CollegesService } from "../college/college.service";

@Injectable({ providedIn: "root" })
export class AuthService {

  private token?: string;
  private refresh?: string;
  private authenticatedSub = new Subject<boolean>();
  private loginSub = new Subject<void>();
  private isAuthenticated = false;
  private userInformation?: user;
  private account: string = "student";
  private logoutTimer: any;
  private loginStatus?: boolean

  getAdmin() {
    return this.account
  }

  getIsAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false
    }
  }

  get AuthenticatedSub() {
    return this.loginSub
  }

  setLogoutTime(accessToken: string, expiresIn: number, refresh_token: string) {
    const now = new Date()
    let expirationDate = new Date(now.getTime() + (expiresIn * 1000));
    localStorage.setItem('token', accessToken);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
    if (refresh_token)
      localStorage.setItem('refresh_token', refresh_token);
    clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => { this.refreshToken() }, expiresIn * 1000);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  getUserInformation(): any {
    return this.userInformation;
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      return undefined;
    }
    return {
      'token': token,
      'expiresIn': new Date(expiresIn)
    }
  }

  constructor(private http: HttpClient, private router: Router, private collegesService: CollegesService) { }


  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logoutTimer);
    this.clearLoginDetails();
  }

  clearLoginDetails() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem("username");
    localStorage.removeItem("information");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("classroom");
    localStorage.removeItem("college");
  }

  refreshToken() {
    let token = this.getRefreshToken()
    let username = localStorage.getItem('lastLoginUserName');
    this.http.post<{ accessToken: string, expiresIn: number, refresh_token: string }>('https://exam.gwxgt.com/exam-api/auth/refresh', { token: token, username : username })
      .pipe(catchError(this.handleRefreshError))
      .subscribe(res => {
        const now = new Date()
        let expirationDate = new Date(now.getTime() + (res.expiresIn * 1000));
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('expiresIn', expirationDate.toISOString());
        if (res.refresh_token)
          localStorage.setItem('refresh_token', res.refresh_token);
        clearTimeout(this.logoutTimer);
        this.logoutTimer = setTimeout(() => { this.refreshToken() }, res.expiresIn * 1000);
      })
  }

  autoRefreshToken(): Observable<{ accessToken: string, expiresIn: number, refresh_token: string }> {
    let token = this.getRefreshToken()
    let username = localStorage.getItem('lastLoginUserName');
    return this.http.post<{ accessToken: string, expiresIn: number, refresh_token: string }>('https://exam.gwxgt.com/exam-api/auth/refresh', { token: token, username : username })
  }

  autoLogin(username: string, refresh_token : string){
    this.http.post<{ _AT : string }>('https://exam.gwxgt.com/exam-api/auth/auto-login',
    {username: username, token : refresh_token})
    .pipe(catchError(this.handleAutoLoginError))
    .pipe(first())
    .subscribe(res =>{
      localStorage.setItem('token', res._AT);
      this.loginUser(username, '', res._AT, 'access');
    })
  }

  loginUser(username: string, password: string, access_token : string, mark : string) {
    const authData: AuthModel = { username: username, password: password, access_token : access_token, mark : mark };
    this.http.post<{ token: string, expiresIn: number, body: user, college: string, username: string, refresh_token: string }>('https://exam.gwxgt.com/exam-api/auth/login/', authData)
      .pipe(catchError(this.handleError))
      .pipe(first())
      .subscribe(res => {
        this.token = res.token;
        if(res.refresh_token)
          this.refresh = res.refresh_token
        if (this.token) {
          this.userInformation = res.body;
          localStorage.setItem("username", this.userInformation.username)
          localStorage.setItem("information", this.userInformation.information)
          this.authenticatedSub.next(true);
          this.isAuthenticated = true;
          this.account = this.userInformation.account
          if (this.account === "admin") {
            this.router.navigate(['/admin'])
          }
          else if (this.account === "college") {
            this.router.navigate(['/college'])
            localStorage.setItem('college', res.college)
            this.collegesService.c_id = res.college
          }
          else if (this.account == "teacher") {
            this.router.navigate(['/teacher/0'])
          }
          else {
            this.router.navigate(['/public/homePage/daily'])
          }
          localStorage.setItem('lastLoginUserName', res.username)
          this.logoutTimer = setTimeout(() => { this.refreshToken() }, res.expiresIn * 1000);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
          this.storeLoginDetails(this.token, expiresDate, this.refresh);
        }
      })
  }

  handleAutoLoginError(error : HttpErrorResponse){
    if(error.status === 401){
      console.error(error.error.message);
      alert('验证过期，请重新登录！');
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `异常代码： ${error.status}, 信息: `, error.error);
      alert(error.error);
    }
    return throwError(() =>
      new Error('自动登录失败！')
    );
  }

  handleRefreshError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.logout()
      console.error(error.error.message);
      alert('请重新登录！');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `异常代码： ${error.status}, 信息: `, error.error);
      alert(error.error);
    }

    return throwError(() =>
      new Error('刷新token失败！')
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(error.error.message);
      alert(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `异常代码： ${error.status}, 信息: `, error.error);
      alert(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() =>
      new Error('登录失败')
    );
  }

  storeLoginDetails(token: string, expirationDate: Date, refresh_token: string | undefined) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
    if(refresh_token)
      localStorage.setItem('refresh_token', refresh_token);
  }

  authenticateFromLocalStorage() {
    const localStorageData = this.getLocalStorageData();
    if (localStorageData) {
      const now = new Date();
      const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

      if (expiresIn > 0) {
        this.token = localStorageData.token;
        this.isAuthenticated = true;
        this.authenticatedSub.next(true);
        this.logoutTimer.setTimeout(expiresIn / 1000);
      }
    }
  }
}
