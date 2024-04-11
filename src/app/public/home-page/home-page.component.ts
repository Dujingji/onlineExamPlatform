import { Component, ViewChild, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { exam } from 'src/modules/exams/exam';
import { Subscription } from 'rxjs';
import { user, userInfo } from 'src/modules/user/user';
import { PublicService, menuModel } from 'src/app/service/public/public.service';


@UntilDestroy()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public examEntries : exam[] = []
  public examEntriesSub = new Subscription()
  public userInformation? : userInfo;
  public isUser = false
  private random_n = 1

  private notifier = new Subject<void>()

  constructor(private observer: BreakpointObserver, private router: Router, private examPaperService : ExamPaperService,
    private authService : AuthService, private publicService : PublicService, private cd : ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  get currentUrl(){
    return this.router.url
  }

  get menuList(){
    return this.publicService.MenuList
  }

  get menuIndex(){
    return this.publicService.index
  }

  ngOnInit(): void {
    this.retrieveUser()
    let object =  this.publicService.AllMenuList.get(this.router.url)
    if(object){
      let temp : menuModel[] = []
      this.publicService.AllMenuList.forEach(e =>{
        if(e.group === object!.group){
          temp.push(e)
        }
      })
      this.publicService.SetMenuList = temp
      this.cd.detectChanges()
    }
    this.random_n = Math.floor(Math.random() * 6 + 1);
    this.examPaperService.examSubject
    .pipe(takeUntil(this.notifier))
    .subscribe(() =>{
      this.retrieveUser()
    })
  }

  changeMenuList(url : string){
    this.router.navigate([url])
    this.publicService.index = 0
    let object =  this.publicService.AllMenuList.get(url)
    if(object){
      let temp : menuModel[] = []
      this.publicService.AllMenuList.forEach(e =>{
        if(e.group === object!.group){
          temp.push(e)
        }
      })
      this.publicService.SetMenuList = temp

    }else{
      this.publicService.SetMenuList = []
    }
    this.cd.detectChanges()
  }

  changeMenuIndex(index : number, url: string){
    this.publicService.index = index
    this.router.navigate([url])
  }

  logout(){
    this.authService.logout()
  }
  retrieveUser() : void{
    this.examPaperService.getUserInformation(localStorage.getItem("information")!)
      .subscribe((data) => {
          this.userInformation = data.userInfo;
          this.isUser = true
        })
    }

  random() : number{
    return this.random_n
  }

  get username(){
    let name = localStorage.getItem('username')
    if(name){
      return name
    }
    return ""
  }

  get userInfor(){
    if(this.userInformation){
      if(this.userInformation.major){
         return this.userInformation.major
      }else{
        return '待定'
      }

    }
    return ""
  }

  get userInfor1(){
    if(this.userInformation){
      if(this.userInformation.comprehensive){
         return this.userInformation.comprehensive
      }else{
        return '待定'
      }

    }
    return ""
  }

  test(){
    this.examPaperService.getStudentEntries().subscribe((data)=>{

    })
  }

  ngAfterViewInit() {
    this.cd.detectChanges()
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
