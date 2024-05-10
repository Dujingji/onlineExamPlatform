import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CollegesService } from 'src/app/service/college/college.service';

@Component({
  selector: 'app-create-classroom-dialog',
  templateUrl: './create-classroom-dialog.component.html',
  styleUrls: ['./create-classroom-dialog.component.scss']
})
export class CreateClassroomDialogComponent implements OnInit {

  private classroom_data  = this.collegesService.classroom_data

  public validateForm : FormGroup

  ngOnInit(): void {

  }

  constructor( private modalRef: NzModalRef, private collegesService : CollegesService ){
    let name = this.classroom_data ? this.classroom_data.name : ''
    let site_number = this.classroom_data ? this.classroom_data.site_number : ''
    this.validateForm = new FormGroup({
      'name' : new FormControl(name, [Validators.required]),
      'site_number' : new FormControl(site_number, [Validators.required, Validators.min(0)])
    })
  }

  close(condition : number){
    if (condition)
      this.modalRef.close(this.validateForm.value);
    else
      this.modalRef.close();
  }

}
