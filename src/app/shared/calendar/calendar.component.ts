import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, first, takeUntil } from 'rxjs';
import { DailyService, dailyDataModel } from 'src/app/service/daily/daily-service.service';

@UntilDestroy()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})


export class CalendarComponent implements OnInit {

  constructor(private dailyService: DailyService, private cd : ChangeDetectorRef, private observer: BreakpointObserver,  private router: Router) {
    this.submitForm = new FormGroup({})
  }

  public dates: DateModel[][] = []
  public weeks: number[] = []
  public days: number[] = []
  public expendedDate?: DateModel
  public current?: DateModel
  public dailyData? : dailyDataModel
  public examData? : any[]
  public submitForm: FormGroup
  public majorList : string[] = []
  public match : boolean = false

  ngOnInit(): void {
    this.getAllUserDailyEntries()

    this.dates = this.getDates()
    this.weeks = this.range(this.dates);
    this.days = this.range(DAYS_IN_WEEK);
    console.log(this.dates)

    this.submitForm = new FormGroup({
      'major': new FormControl(undefined, [Validators.required])
    })
  }

  getAllUserDailyEntries() {
    this.dailyService.getDailyInformation(localStorage.getItem('information')!)
      .pipe(first())
      .subscribe(data => {
        this.dailyData = data.data
        this.cd.detectChanges()
      })
  }

  getDailyMajorList(data: DateModel){
    let notifier = new Subject<void>()
    this.dailyService.getMajorList(localStorage.getItem('information')!, this.getYear(), this.getMonth(), data.index)
    .pipe(takeUntil(notifier))
    .subscribe(data =>{
      this.majorList = data.major
      notifier.next()
      notifier.complete()
    })
  }

  getDailyData(data: DateModel){
    let index = data.index
    if(this.dailyData){
      let array = this.dailyData.daily_data.filter(item => item.Index === index)
      data.dailys = array
      if(array.length !== 0)
        data.status = 2
      return array
    }
    return []
  }

  getExamsData(data: DateModel, type: number) {
    let index = data.index
    if (this.dailyData && type === 0) {
      let array = this.dailyData.exam_data.filter(item => item.Index === index)
      data.exams = array
      return array
    }
    return []
  }

  getYear(){
    return new Date().getFullYear();
  }

  getMonth(){
    return new Date().getMonth() + 1;
  }

  getDateString(date : Date){
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

  range(input: Array<unknown> | number) {
    if (Array.isArray(input)) {
      return input.map((item, index) => index);
    }
    return new Array(input).fill(0).map((item, index) => index);
  }

  getDates() {
    let weeks = 6
    const today = Date.now();
    const dayOfTheWeek = new Date(today).getDay();
    const startWeekDiff = DAY_MILLISECONDS * dayOfTheWeek;
    const startTime =
      today -
      startWeekDiff -
      DAY_MILLISECONDS * DAYS_IN_WEEK * Math.floor(weeks / 2);
    const dates = [];
    for (let week = 0; week < weeks; week++) {
      const days = [];
      for (let day = 0; day < DAYS_IN_WEEK; day++) {
        const time =
          startTime +
          DAYS_IN_WEEK * week * DAY_MILLISECONDS +
          day * DAY_MILLISECONDS;
        let month_check = new Date(time).getMonth() === new Date(today).getMonth()
        let status = 0
        let check = false
        let expanded = false
        let click = false
        if (!month_check) {
          status = -1
        }
        if (time === today) {
          expanded = true
          click = true
          status = 1
          check = true
        }
        let temp = {
          index: new Date(time).getDate(),
          status: status,
          expanded: expanded,
          click: click,
          today: check,
          exams : [],
          dailys: []
        }
        if (time === today) {
          this.expendedDate = temp
          this.current = temp
          this.getDailyMajorList(temp)
        }
        days.push(temp);
      }
      dates.push(days);
    }
    return dates;
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
  index: number
  status: number
  expanded: boolean,
  click: boolean,
  exams: any[],
  dailys: any[],
  today : boolean
}
