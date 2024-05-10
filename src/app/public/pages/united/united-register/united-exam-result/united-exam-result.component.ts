import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';

@Component({
  selector: 'app-united-exam-result',
  templateUrl: './united-exam-result.component.html',
  styleUrls: ['./united-exam-result.component.scss']
})
export class UnitedExamResultComponent implements OnInit {


  public subject_number: number = 0
  public ablePrint: boolean = false
  public loading : boolean = true


  ngOnInit(): void {
    this.fetchResultInfo()
  }

  fetchResultInfo(){
    this.unitedService.getResult().pipe(first()).subscribe(res =>{
      this.subject_number = res.subject
      this.ablePrint = res.able
      this.loading = false
    })
  }

  constructor(private unitedService : UnitedService) { }




}
