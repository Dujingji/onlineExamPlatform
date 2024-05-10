import { DailyService, dailyDataModel, dayDetail } from 'src/app/service/daily/daily-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-vocabulary-detail-list',
  templateUrl: './vocabulary-detail-list.component.html',
  styleUrls: ['./vocabulary-detail-list.component.scss']
})
export class VocabularyDetailListComponent implements OnInit {

  public year ?: string
  public month ?: string
  public date ?: string
  private std ?: string
  public date_deteil : dayDetail[] = []
  public loading : boolean = true;

  ngOnInit(): void {
    this.year = this.route.snapshot.paramMap.get('year')!
    this.date=  this.route.snapshot.paramMap.get('day')!
    this.month =  this.route.snapshot.paramMap.get('month')!
    this.std = localStorage.getItem('information')!
    this.fetchDayDetail()
  }

  constructor(private router : Router, private route: ActivatedRoute, private dailyService : DailyService){

  }

  goBack(){
    this.router.navigate(['/public/homePage/vocabulary-calendar'])
  }

  fetchDayDetail(){
    this.dailyService.getVDateDetail(this.std, this.year, this.month, this.date)
    .pipe(first())
    .subscribe(data =>{
      this.loading = false
      this.date_deteil = data.data
    })
  }
}
