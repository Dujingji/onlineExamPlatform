import { AdminService } from './../../../service/admin/admin.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-exam-submit-dialog',
  templateUrl: './exam-submit-dialog.component.html',
  styleUrls: ['./exam-submit-dialog.component.scss']
})
export class ExamSubmitDialogComponent {
  constructor(public adminService : AdminService){

  }

  get status(){
    return this.adminService.getSubmitExamStatus()
  }
}
