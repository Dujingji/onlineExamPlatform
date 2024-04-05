import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DailyService } from 'src/app/service/daily/daily-service.service';
import { PublicService, menuModel } from 'src/app/service/public/public.service';

@Component({
  selector: 'app-vocabulary-homepage',
  templateUrl: './vocabulary-homepage.component.html',
  styleUrls: ['./vocabulary-homepage.component.scss']
})
export class VocabularyHomepageComponent implements OnInit{

  public total_d : number = 0
  public continus_d :number = 0
  public total_v : number = 1
  public total_s : number = 0
  public performance : number = 0
  public percent: number = 0



  selectorVisible = false;

  ngOnInit(): void {
    this.fetchUserData()
  }

  constructor(private router : Router, private dailyService : DailyService, private publicService : PublicService){

  }

  options = [
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
  ];

  onSelectionChange(event: MatSelectChange) {
    this.dailyService.postPerformance(localStorage.getItem('information')!, event.value)
    .pipe(first())
    .subscribe(data =>{
      if(data.status){
        window.location.reload()
      }
    })

  }

  goToCalendar(){
    this.router.navigate(['/public/homePage/vocabulary-calendar'])
  }

  getReview(){
    return Math.floor(this.performance / 2)
  }

  toggleSelector() {
    this.selectorVisible = !this.selectorVisible;
  }

  fetchUserData(){
    this.dailyService.getUserVocabularyData(localStorage.getItem('information')!)
    .pipe(first())
    .subscribe(data =>{
      this.continus_d = data.data.c_d
      this.total_d = data.data.t_d
      this.total_s = data.data.v_s
      this.performance = data.data.performance
      this.total_v = data.data.v_t
      this.percent = Math.floor((this.total_s / this.total_v ) * 100)
    })
  }


}
