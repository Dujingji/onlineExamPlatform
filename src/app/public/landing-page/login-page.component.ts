import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm : FormGroup;
  hourTransform? : string;
  minuteTransform? : string;
  secondTransform? : string;
  constructor(private authService: AuthService){
    this.loginForm = new FormGroup({})
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(localStorage.getItem('lastLoginUserName'), [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    this.authService.loginUser(this.loginForm.value.username, this.loginForm.value.password);

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
}
