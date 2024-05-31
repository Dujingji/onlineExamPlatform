import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-united-result',
  templateUrl: './united-result.component.html',
  styleUrls: ['./united-result.component.scss']
})
export class UnitedResultComponent implements OnInit {


  public loading : boolean = false

  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  fetchResult(){

  }
}
