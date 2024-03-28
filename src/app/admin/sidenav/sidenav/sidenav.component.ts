import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { exam } from 'src/modules/exams/exam';
import { Subscription } from 'rxjs';
import { user, userInfo } from 'src/modules/user/user';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin', title: '首页',  icon: 'dashboard', class: '' },
    { path: '/admin/paper-list', title: '试卷列表',  icon:'content_paste', class: '' },
    { path: '/admin/student-list', title: '学生列表',  icon:'person', class: '' },
    { path: '/admin/classroom-list', title: '班级列表',  icon:'library_books', class: '' },
    { path: '/admin/teacher-list', title: '教师账户',  icon:'bubble_chart', class: '' },
    { path: '/admin/major-list', title: '学科', icon:'collections_bookmark', class:''},
    { path: '/admin/college-list', title: '教学点', icon:'school', class:''},
    { path: '/admin/exc', title: '章节练习',  icon:'bubble_chart', class: '' },
    { path: '/admin/feedback', title: '纠错反馈',  icon:'bubble_chart', class: '' }

];

@UntilDestroy()
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public menuItems: any[] = [];

  public examEntries : exam[] = []
  public examEntriesSub = new Subscription()
  public userInformation? : userInfo;
  public isUser = false

  constructor(private observer: BreakpointObserver, private router: Router, private examPaperService : ExamPaperService, private authService : AuthService) {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };

  logout(){
    this.authService.logout()
  }
  retrieveUser() : void{
    this.examPaperService.getUserInformation(localStorage.getItem("username")!)
      .subscribe((data) => {
          this.userInformation = data.userInfo;
          this.isUser = true
        })
    }

  get username(){
    let name = localStorage.getItem("username")
    if(name){
      return name
    }
    return ""
  }
  get userInfor(){
    if(this.isUser){
      return this.userInformation?.classroom
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
