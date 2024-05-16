import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CollegesService } from 'src/app/service/college/college.service';
import { unitedRegisterUserInfo } from '../united-register.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { first } from 'rxjs';


@Component({
  selector: 'app-united-subject-editor',
  templateUrl: './united-subject-editor.component.html',
  styleUrls: ['./united-subject-editor.component.scss']
})
export class UnitedSubjectEditorComponent implements OnInit {

  public found?: string
  public comp?: string
  private info_data? : unitedRegisterUserInfo
  public fountList : majorName[] = []
  public compList : majorName[] = []

  ngOnInit(): void {
    this.authService.getMajorList(0 ,'').pipe(first()).subscribe(res =>{
      this.fountList = res.data
    })

    this.authService.getMajorList(1 ,'').pipe(first()).subscribe(res =>{
      this.compList = res.data
    })
  }

  constructor(private modalRef: NzModalRef, private fb: NonNullableFormBuilder, private collegesService: CollegesService, private authService : AuthService) {
    this.info_data = this.collegesService.change_subject_data
    if(this.info_data){
      this.found = this.info_data.subject[0]
      this.comp = this.info_data.subject[1]
    }

  }

  changeFound(){

  }

  changeComp(){

  }

  close(condition: number): void {
    // Pass some data back to the major component
    if (condition){
      this.modalRef.close({ _f: this.found, _c: this.comp });
    }
    else
      this.modalRef.close();
  }
}

interface majorName{
  name : string
}
