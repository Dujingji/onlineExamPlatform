import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, delay, filter } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { exam } from 'src/modules/exams/exam';
import { Teacher } from 'src/modules/teacher/teacher';
import { userInfo } from 'src/modules/user/user';

@UntilDestroy()
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public examEntries : exam[] = []
  public examEntriesSub = new Subscription()
  public userInformation? : Teacher;
  public isUser = false

  private random_n = 1

  constructor(private observer: BreakpointObserver, private router: Router, private teacherService : TeacherService, private authService : AuthService) {}

  ngOnInit(): void {
    this.retrieveUser()
    this.random_n = Math.floor(Math.random() * 6 + 1);
  }

  logout(){
    this.authService.logout()
  }

  random() : number{
    return this.random_n
  }

  retrieveUser() : void{
    this.teacherService.getTeacherInformation(localStorage.getItem("information")!)
      .subscribe((data) => {
          this.userInformation = data.userInfo;
          this.isUser = true
        })
    }

  get username(){
    let name = localStorage.getItem('username')
    if(name){
      return name
    }
    return ""
  }

  get userInfor(){
    if(this.isUser){
      return this.userInformation!.major
    }

    return ""
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });


    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
