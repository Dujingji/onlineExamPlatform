import { major } from './../../../../modules/major/major';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { ExamEditDialogComponent } from '../exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { PaperEditDialogComponent } from '../paper-edit-dialog/paper-edit-dialog.component';
import { SectionEditDialogComponent } from '../section-edit-dialog/section-edit-dialog.component';
import { qType } from 'src/modules/questionType/type';

@Component({
  selector: 'app-paper-editer-dialog',
  templateUrl: './paper-editer-dialog.component.html',
  styleUrls: ['./paper-editer-dialog.component.scss']
})
export class PaperEditerDialogComponent {
  submitForm: FormGroup
  name?: string
  major?: string
  timer?: number
  section: string[] = []
  majorData: major[] = []

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router, private dialogRef: MatDialogRef<ExamEditDialogComponent>) {
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'name': new FormControl(this.name, [Validators.required]),
      'major': new FormControl(this.major, [Validators.required]),
      'timer': new FormControl(this.timer, [Validators.required]),
      'section': new FormControl(this.section, [Validators.required]),
    })
    this.adminService.getAllMajorEntries().subscribe(data => {
      this.majorData = data.major
    })
  }

  closeDialog() {
    this.dialogRef.close(this.submitForm.value);
  }

  updateSection() {
    let dialogRef = this.dialog.open(SectionEditDialogComponent, {})
    let instance = dialogRef.componentInstance;

    let length = new qType().getTypeLength()
    let temp = new Array<boolean>(length).fill(false)
    this.section.forEach(element => {
      switch (element) {
        case "单项选择题":
          temp[0] = true;
          break;
        case "多项选择题":
          temp[1] = true;
          break;
        case "填空题":
          temp[2] = true;
          break;
        case "简答题":
          temp[3] = true;
          break;
      }
    })

    instance.checked = temp

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm.patchValue({ 'section': result })
      }
    })
  }

  editSection() {
    let dialogRef = this.dialog.open(PaperEditDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm.patchValue({ 'paperId': result })
      }
    })
  }
}
