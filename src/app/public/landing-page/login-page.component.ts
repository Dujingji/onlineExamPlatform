import { Component, HostListener, OnInit, Pipe } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable, Observer, first } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loading: boolean = true
  guestLoginForm: FormGroup;
  loginForm: FormGroup;
  hourTransform?: string;
  minuteTransform?: string;
  secondTransform?: string;
  guestLoading : boolean = true;
  guestRegisterForm: FormGroup;
  public isRegister: boolean = false;
  public searchValue: string | null = null;
  public gusetTarget: boolean = false;

  public college_list: option[] = []
  public majorList: option[] = []
  public comphensiveList: option[] = []

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({})
    this.guestLoginForm = new FormGroup({})
    this.guestRegisterForm = new FormGroup({})
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(localStorage.getItem('lastLoginUserName'), [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })

    this.guestLoginForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })

    this.guestRegisterForm = new FormGroup({
      'username': new FormControl('', [Validators.required], [this.userNameAsyncValidator]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      'comfirm': new FormControl('', [Validators.required, this.confirmationValidator]),
      'college': new FormControl('', [Validators.required]),
      'major': new FormControl('', [Validators.required]),
      'comphensive': new FormControl('', [Validators.required])
    })

    if (localStorage.getItem('lastLoginUserName') && localStorage.getItem('refresh_token')) {
      let username = localStorage.getItem('lastLoginUserName')!
      let re_token = localStorage.getItem('refresh_token')!
      this.authService.autoLogin(username, re_token)
    }
    else {
      this.loading = false
    }

    this.guestRegisterForm.get('major')!.valueChanges.subscribe(value =>{
      this.fetchComprehensiveList(value)
    })
  }

  fetchComprehensiveList(major : string){
    this.authService.getMajorList(1, major).pipe(first()).subscribe(data =>{
      this.comphensiveList = data.data
    })
  }

  userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
    new Observable((observer: Observer<{ comfirm: boolean, error: boolean } | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({
            comfirm: true, error: true
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.guestRegisterForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  onSubmit(condition: number) {
    if (condition === 1) {
      this.authService.loginUser(this.loginForm.value.username, this.loginForm.value.password, '', '');
    }
    else {
      this.authService.guesterLogin()
    }
  }

  onChangeGuestTarget() {
    if (!this.gusetTarget) {
      this.isRegister = false
    }
    this.gusetTarget = !this.gusetTarget
    if(this.gusetTarget && this.college_list.length === 0 && this.majorList.length === 0){
      this.authService.getCollegeList().pipe(first()).subscribe(data =>{
        this.college_list = data.college
      })
      this.authService.getMajorList(0, '').pipe(first()).subscribe(data =>{
        this.majorList = data.data
      })
    }
  }

  register() {

  }

  updataComfirmValidators() {
    Promise.resolve().then(() => this.guestRegisterForm.controls['comfirm'].updateValueAndValidity())
  }

  onChangeRegisterTarget() {
    this.isRegister = false
  }

  RegisterTarget() {
    this.isRegister = true
  }

  updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    this.hourTransform = `rotate(${30 * hours + minutes / 2}deg)`;
    this.minuteTransform = `rotate(${6 * minutes}deg)`;
    this.secondTransform = `rotate(${6 * seconds}deg)`;
  }

  dots: any[] = [];
}

interface option{
  name : string
}

export type MyErrorsOptions = { error: string } & Record<string, NzSafeAny>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static override minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return { minlength: { 'error': `最小长度为 ${minLength}` } };
    };
  }

  static override maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return { maxlength: { 'error': `最大长度为 ${maxLength}` } };
    };
  }
}
