import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, first, takeUntil } from 'rxjs';
import { DailyService, dailyDataModel } from 'src/app/service/daily/daily-service.service';
import { PublicService, menuModel } from 'src/app/service/public/public.service';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})


export class CalendarComponent implements OnInit {

  constructor(private dailyService: DailyService, private cd: ChangeDetectorRef, private observer: BreakpointObserver, private router: Router,
    private publicService: PublicService) {
    this.submitForm = new FormGroup({})
  }

  @ViewChild('content') content: ElementRef | undefined;


  public dates: DateModel[][] = []
  public weeks: number[] = []
  public days: number[] = []
  public expendedDate?: DateModel
  public current?: DateModel
  public dailyData?: dailyDataModel
  public examData?: any[]
  public submitForm: FormGroup
  public majorList: string[] = []
  public match: boolean = false
  public calendar: Array<Array<DateModel>> = []
  public state = 'expanded';


  ngOnInit(): void {
    this.getAllUserDailyEntries()
    this.submitForm = new FormGroup({
      'major': new FormControl(undefined, [Validators.required])
    })
  }


  calculateColumns(): Array<number> {
    if (this.dailyData) {
      const result: Array<number> = Array.from({ length: 2 }, (_, index) => index);
      return result
    }
    return []
  }

  calculateRows(): Array<number> {
    if (this.dailyData) {
      const result: Array<number> = Array.from({ length: 2 }, (_, index) => index);
      return result
    }
    return []
  }

  getMajor(i: number): string {
    if (this.current) {
      return this.current.dailys[i].daily.major
    }
    return ''
  }

  getIndex(i: number): number {
    if (this.current) {
      return this.current.dailys[i].Index
    }
    return 0
  }

  getTotal(i: number): string {
    if (this.current) {
      return '题数：' + this.current.dailys[i].daily.length.toString()
    }
    return ''
  }

  getProcess(i: number): string {
    if (this.current) {
      return '正确率： ' + this.current.dailys[i].daily.mark + '%'
    }
    return ''
  }

  getAllUserDailyEntries() {
    this.dailyService.getDailyInformation(localStorage.getItem('information')!)
      .pipe(first())
      .subscribe(data => {
        this.dailyData = data.data
        this.createCalender(this.dailyData)
        this.cd.detectChanges()
      })
  }

  getDailyMajorList(data: DateModel) {
    let notifier = new Subject<void>()
    this.dailyService.getMajorList(localStorage.getItem('information')!, this.getYear(), this.getMonth(), data.date)
      .pipe(takeUntil(notifier))
      .subscribe(data => {
        this.majorList = data.major
        notifier.next()
        notifier.complete()
      })
  }

  // getDailyData(data: DateModel){
  //   let index = data.index
  //   if(this.dailyData){
  //     let array = this.dailyData.daily_data.filter(item => item.Index === index)
  //     data.dailys = array
  //     if(array.length !== 0)
  //       data.status = 2
  //     return array
  //   }
  //   return []
  // }

  getDate(mode: number) {

    let now = new Date()

    if (mode === 0) {
      return now.getFullYear() + '-' + (now.getMonth() + 1)
    }
    else {
      return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + (now.getDate())
    }

  }

  // getExamsData(data: DateModel, type: number) {
  //   let index = data.index
  //   if (this.dailyData && type === 0) {
  //     let array = this.dailyData.exam_data.filter(item => item.Index === index)
  //     data.exams = array
  //     return array
  //   }
  //   return []
  // }

  getYear() {
    return new Date().getFullYear();
  }

  getMonth() {
    return new Date().getMonth() + 1;
  }

  getDateString(date: Date) {
    return new Date(date).toLocaleString()
  }

  toggleEvents(day: DateModel) {
    if (day.status !== -1 && this.current) {
      this.current.click = false
      this.current.expanded = !this.current.expanded
      day.expanded = !day.expanded;
      this.expendedDate = day
      this.current = day
      this.current.click = true
      this.getDailyMajorList(day)
    }
  }

  createCalender(data: dailyDataModel) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let index_list = new Array<number>()
    data.daily_data.forEach(e => {
      index_list.push(e.Index)
    })

    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    let week: Array<DateModel> = []
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      week.push({
        active: false,
        today: false,
        date: monthlastdate - i + 1,
        selector: false,
        status: -1,
        expanded: false,
        click: false,
        dailys: []
      })
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      let temp = {
        active: true,
        today: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
        date: i,
        selector: index_list.indexOf(i) > -1,
        status: 0,
        expanded: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
        click: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
        dailys: data.daily_data.filter(e => e.Index === i)
      }
      if (week.length < 7) {
        if (i === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
          this.current = temp
          this.toggleEvents(this.current)
        }
        week.push(temp)
      }
      else {
        this.calendar.push(week.slice())
        week = new Array<DateModel>()
        week.push({
          active: true,
          today: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
          date: i,
          selector: false,
          status: 0,
          expanded: false,
          click: false,
          dailys: []
        })
      }
      // Check if the current date is today
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      week.push({
        active: false,
        today: false,
        date: i - dayend + 1,
        selector: false,
        status: -1,
        expanded: false,
        click: false,
        dailys: []
      })
    }
    this.calendar.push(week)
    console.log(this.calendar)
  }

  range(input: Array<unknown> | number) {
    if (Array.isArray(input)) {
      return input.map((item, index) => index);
    }
    return new Array(input).fill(0).map((item, index) => index);
  }

  getCurrentMonthAndYear() {
    const today = Date.now();
    return new Date(today).toLocaleString(undefined, {
      month: 'long',
      year: 'numeric',
    });
  }

  getCurrentMonthAndYearAndDay(index: number) {
    const today = Date.now();
    let result = new Date(today).toLocaleString(undefined, {
      month: 'long',
      year: 'numeric',
    });
    result += index + '日'
    return result
  }

  toggleBlock() {
    this.state = this.state === 'expanded' ? 'collapsed' : 'expanded';
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.match = true
        } else {
          this.match = false
        }
      });
  }
}

export const DAY_MILLISECONDS = 1000 * 3600 * 24; // Milliseconds in one day
export const DAYS_IN_WEEK = 7; // Days in week
export interface DateModel {
  date: number
  status: number
  expanded: boolean,
  click: boolean,
  // exams: any[],
  dailys: any[],
  today: boolean,
  active: boolean,
  selector: boolean
}
