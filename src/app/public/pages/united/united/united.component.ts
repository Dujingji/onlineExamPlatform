import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-united',
  templateUrl: './united.component.html',
  styleUrls: ['./united.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', padding: '0px 0px 0px 0px', visibility: 'hidden' , overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class UnitedComponent implements OnInit{


  public state : string = 'collapsed'

  ngOnInit(): void {

  }

  onPrint(){
    window.print()
  }

  toggleBlock() {
    this.state = this.state === 'expanded' ? 'collapsed' : 'expanded';
  }

  constructor(){ }



}
