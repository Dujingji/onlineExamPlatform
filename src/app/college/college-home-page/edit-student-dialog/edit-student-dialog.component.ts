import { MajorOption } from './../../../public/pages/united/united-register/united-register-info/united-register-info.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { option, studentAccountInfo } from '../college-home-page.component';
import { CollegesService } from 'src/app/service/college/college.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  validateForm: FormGroup

  private student_info? : studentAccountInfo

  private std_name? : string
  private username? : string
  private password? : string
  private garde?: number
  private found? : string
  private compe? : string

  public found_list : option[] = []
  public compe_list : option[] = []

  ngOnInit(): void {
    this.collegeService.getAllMajor().pipe(first()).subscribe(res =>{
      this.found_list = res._f.filter(item => item.value !== '全部')
      this.compe_list = res._c
    })
  }

  constructor(private modalRef : NzModalRef, private collegeService: CollegesService) {

    this.student_info = this.collegeService.student_info

    if(this.student_info){
      this.std_name = this.student_info.student_name
      this.username = this.student_info.student_id
      this.found = this.student_info.found
      this.compe = this.student_info.comprehensive
      this.garde = this.student_info.semester
      this.password = this.student_info.password
    }

    this.validateForm = new FormGroup({
      'std_name': new FormControl(this.std_name, [Validators.required]),
      'username': new FormControl(this.username, [Validators.required]),
      'grade': new FormControl(this.garde, [Validators.required]),
      'password': new FormControl(this.password, [Validators.required]),
      'found' : new FormControl(this.found),
      'compe': new FormControl(this.compe)
    })
   }

  close(condition: number): void {
    // Pass some data back to the major component
    if (condition)
      this.modalRef.close(this.validateForm.value);
    else
      this.modalRef.close();
  }
}

export interface majorStringOption{
  name : string
}
