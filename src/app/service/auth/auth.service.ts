import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, catchError, tap, throwError } from "rxjs";
import { AuthModel } from 'src/modules/auth/auth';
import { user } from "src/modules/user/user";

@Injectable({ providedIn: "root" })
export class AuthService {

  private token?: string;
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

  getToken() {
    return localStorage.getItem('token');
  }

  getUserInformation(): any {
    return this.userInformation;
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if (!token || !expiresIn) {
      return;
    }
    return {
      'token': token,
      'expiresIn': new Date(expiresIn)
    }
  }

  constructor(private http: HttpClient, private router: Router) { }


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
    localStorage.removeItem("classroom");
    localStorage.removeItem("username");
    localStorage.removeItem("information")
  }

  loginUser(username: string, password: string) {
    const authData: AuthModel = { username: username, password: password };

    this.http.post<{ token: string, expiresIn: number, body: user }>('https://exam.gwxgt.com/exam-api/auth/login/', authData)
      .pipe(catchError(this.handleError))
      .subscribe(res => {
        this.token = res.token;
        if (this.token) {
          this.userInformation = res.body;
          localStorage.setItem("username", this.userInformation.username)
          localStorage.setItem("information", this.userInformation.information)
          this.authenticatedSub.next(true);
          this.isAuthenticated = true;
          this.account = this.userInformation.account
          if (this.account == "admin") {
            this.router.navigate(['/admin'])
          }
          else if (this.account == "teacher") {
            this.router.navigate(['/teacher/0'])
          }
          else {
            this.router.navigate(['/public/homePage/daily'])
          }
          this.logoutTimer = setTimeout(() => { this.logout() }, res.expiresIn * 1000);
          const now = new Date();
          const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
          this.storeLoginDetails(this.token, expiresDate);
        }
      })
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

  storeLoginDetails(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
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
