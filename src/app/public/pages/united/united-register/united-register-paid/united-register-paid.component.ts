import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { first } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-united-register-paid',
  templateUrl: './united-register-paid.component.html',
  styleUrls: ['./united-register-paid.component.scss']
})
export class UnitedRegisterPaidComponent implements OnInit {

  @Output() notify: EventEmitter<number> = new EventEmitter<number>()


  ngOnInit(): void {

  }

  get step(){
    return this.unitedService.step
  }

  paid() {
    this.unitedService.changePaidStatus().pipe(first()).subscribe(res =>{
      if(res.status){
        this.unitedService.step = 2
      }
    })
  }

  notPaid(){
    this.unitedService.notPaid().pipe(first()).subscribe(res =>{
      if(res.status){
        this.unitedService.step = 1
      }
    })
  }

  getUrl() {
    return environment.apiUrl + 'profile/付款码.jpg'
  }

  constructor(private unitedService : UnitedService) { }
}
