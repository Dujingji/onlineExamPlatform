import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, first, takeUntil } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';

@UntilDestroy()
@Component({
  selector: 'app-united-register',
  templateUrl: './united-register.component.html',
  styleUrls: ['./united-register.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})


export class UnitedRegisterComponent implements OnInit, OnDestroy {

  public current: number = 0
  public displayList: Array<boolean> = new Array<boolean>(4).fill(false)
  private std_id: string = ''
  public matchScreem: boolean = false
  public loading: boolean = true
  private notification: Subject<void> = new Subject<void>()

  ngOnInit(): void {
    this.fetchUserStep()

    this.unitedService.baseInfoEntriesSubjct.pipe(takeUntil(this.notification)).subscribe(res => {
      this.unitedService.getUserStep()
    })
  }

  getStepInfo() {
    switch (this.current) {
      case 0:
        return { title: '考前承诺书', info: '请仔细阅读承诺书，并选择是否同意' }
      case 1:
        return { title: '基本信息', info: '请确认基本信息是否正确！' }
      case 2:
        return { title: '报考科目', info: '请选择科目进行报考' }
      case 3:
        return { title: '付款', info: '扫描二维码进行付款！付款后将进行人工审核，请耐心等待！' }
      case 4:
        return { title: '打印准考证', info: '请浏览准考证的信息是否正确，并打印准考证！' }
      default:
        return { title: '', info: '' }
    }

  }


  constructor(private observer: BreakpointObserver, private router: Router, private unitedService: UnitedService) {
    this.displayList[0] = true
  }
  ngOnDestroy(): void {
    this.notification.next()
    this.notification.complete()
  }

  fetchUserStep() {
    this.loading = true
    this.unitedService.getUserStep().pipe(first()).subscribe(res => {
      this.unitedService.step = res.step
      if (res.step === -1) {
        this.current = 0
      }
      else {
        switch (res.step) {
          case 0:
            this.current = 2
            break;
          case 1:
            this.current = 2
            break
          case 2:
            this.current = 3
            break;
          case 3:
            this.current = 4
            break;
          case 4:
            this.current = 4
            break;
          default:
            this.current = 0;
            break;
        }
      }
      this.loading = false
    })
  }

  next(data: any) {
    this.current = data
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 1000px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.matchScreem = true
        } else {
          this.matchScreem = false
        }
      });
  }

}
