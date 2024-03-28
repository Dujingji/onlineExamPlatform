import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { DailyService } from 'src/app/service/daily/daily-service.service';

@Component({
  selector: 'app-vocabulary-calendar',
  templateUrl: './vocabulary-calendar.component.html',
  styleUrls: ['./vocabulary-calendar.component.scss']
})
export class VocabularyCalendarComponent implements OnInit {

  public calendar: Array<Array<day>> = []
  public total : number = 0

  ngOnInit(): void {

    this.fetchData()
  }

  constructor(private dailyService: DailyService) {

  }

  fetchData(){
    this.dailyService.getFetchCheckDate(localStorage.getItem('information')!)
    .pipe(first())
    .subscribe(data =>{
      this.total = data.data.length
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
          today: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
          date: i,
          selector: index.indexOf(i) > -1
        })
      }
      else {
        this.calendar.push(week.slice())
        week = new Array<day>()
        week.push({
          active: true,
          today: i === date.getDate() && year === date.getFullYear() && month === date.getMonth(),
          date: i,
          selector: false
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
    console.log(this.calendar)
  }



  getDate(mode: number) {

    let now = new Date()

    if (mode === 0) {
      return now.getFullYear() + '-' + (now.getMonth() + 1)
    }
    else {
      return now.getFullYear() + '-' + (now.getMonth() + 2)
    }

  }

}

export interface day {
  active: boolean;
  today: boolean;
  date: number;
  selector: boolean
}
