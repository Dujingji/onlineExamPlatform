import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DailyService } from 'src/app/service/daily/daily-service.service';

@Component({
  selector: 'app-vocabulary-calendar',
  templateUrl: './vocabulary-calendar.component.html',
  styleUrls: ['./vocabulary-calendar.component.scss']
})
export class VocabularyCalendarComponent implements OnInit {

  public calendar: Array<Array<day>> = []
  public total: number = 0
  private startY: number = 0
  private scolled: number = 0
  private index: number[] = []
  private year: number = 0;
  private month: number = 0

  ngOnInit(): void {
    const date = new Date()
    this.year = this.dailyService.calendar_year
    this.month = this.dailyService.calendar_month
    this.fetchData(this.year, this.month)
  }

  constructor(private dailyService: DailyService, private router: Router) {

  }

  goNextMonth(condition: number) {
    this.calendar = []
    if (condition === 0) {
      this.month -= 1
      this.dailyService.calendar_month -= 1
      if(this.month < 1){
        this.dailyService.calendar_year -= 1
        this.year -= 1
        this.dailyService.calendar_month = 12
        this.month = 12
      }
      this.fetchData(this.year, this.month)
    }
    else{

      this.month += 1
      this.dailyService.calendar_month += 1
      if(this.month > 12){
        this.year += 1
        this.dailyService.calendar_year += 1
        this.month = 1
        this.dailyService.calendar_month = 1
      }
      this.fetchData(this.year, this.month)
    }

  }

  fetchData(year: number, month: number) {
    this.dailyService.getFetchCheckDate(localStorage.getItem('information')!, year, month)
      .pipe(first())
      .subscribe(data => {
        this.total = data.data.length
        this.index = data.data
        this.createCalender(data.data)
      })
  }

  createCalender(index: number[]) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

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

    let week: Array<day> = []
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      week.push({
        active: false,
        today: false,
        date: monthlastdate - i + 1,
        selector: false
      })
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      if (week.length < 7) {
        week.push({
          active: true,
          today: i === date.getDate() && this.year === date.getFullYear() && this.month === date.getMonth() + 1,
          date: i,
          selector: index.indexOf(i) > -1
        })
      }
      else {
        this.calendar.push(week.slice())
        week = new Array<day>()
        week.push({
          active: true,
          today: i === date.getDate() && this.year === date.getFullYear() && this.month === date.getMonth() + 1,
          date: i,
          selector: index.indexOf(i) > -1
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
        selector: false
      })
    }
    this.calendar.push(week)
  }

  goToDetailList(day: day) {
    const date = new Date()
    let url = '/public/homePage/vocabulary-detail-list/' + day.date + '/' + (this.month) + '/' + this.year
    this.router.navigate([url])
  }

  getDate(mode: number) {

    let now = new Date()

    if (mode === 0) {
      return this.year + '-' + this.month
    }
    else {
      return this.year + '-' + (this.month + 1)
    }

  }

}

export interface day {
  active: boolean;
  today: boolean;
  date: number;
  selector: boolean
}
