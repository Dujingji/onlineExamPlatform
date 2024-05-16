import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { first } from 'rxjs';
import { PrintService } from 'src/app/service/print/print.service';
import { UnitedService } from 'src/app/service/united/united.service';

@Component({
  selector: 'app-united-exam-result',
  templateUrl: './united-exam-result.component.html',
  styleUrls: ['./united-exam-result.component.scss']
})
export class UnitedExamResultComponent implements OnInit {


  public subject_number: number = 0
  public ablePrint: boolean = false
  public loading: boolean = true
  public found: string = ''
  public comp: string = ''

  public current : number = 0


  ngOnInit(): void {
    this.fetchResultInfo()
  }

  fetchResultInfo() {
    this.unitedService.getResult().pipe(first()).subscribe(res => {
      this.subject_number = res.subject
      this.found = res._f
      this.comp = res._c
      this.ablePrint = res.able
      this.loading = false
    })
  }

  preview(){
    this.current = 1
  }

  back(data : number){
    this.current = data
  }

  getSubjectString(){
    let result = ''
    if(this.found && this.found.length !== 0){
      result += '、' + this.found
    }

    if(this.comp && this.comp.length !== 0){
      result += '、' + this.comp
    }
    return result
  }

  constructor(private unitedService: UnitedService, private printService: PrintService, private viewContainerRef: ViewContainerRef) { }


}
