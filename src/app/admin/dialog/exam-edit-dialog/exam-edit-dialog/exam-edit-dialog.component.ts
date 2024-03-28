import { AdminService } from './../../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaperEditDialogComponent } from '../../paper-edit-dialog/paper-edit-dialog.component';
import { Time } from '@angular/common';
import { major } from 'src/modules/major/major';
import { ExamUrlsEditDialogComponent } from './exam-urls-edit-dialog/exam-urls-edit-dialog.component';


@Component({
  selector: 'app-exam-edit-dialog',
  templateUrl: './exam-edit-dialog.component.html',
  styleUrls: ['./exam-edit-dialog.component.scss']
})
export class ExamEditDialogComponent implements OnInit {

  submitForm: FormGroup
  description?: string
  paperId?: string
  major?: string
  date?: Date
  end?: Date
  time: Time = {
    hours: 0,
    minutes: 0
  }
  vd_url: string[] = []
  vd_url_length: number = 0

  endTime: Time = {
    hours: 0,
    minutes: 0
  }

  majorData: major[] = []
  isAuto: boolean = false

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router, private dialogRef: MatDialogRef<ExamEditDialogComponent>) {
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'description': new FormControl(this.description, [Validators.required]),
      'major': new FormControl(this.major, [Validators.required]),
      'date': new FormControl(this.date, [Validators.required]),
      'paperId': new FormControl(this.paperId),
      'time': new FormControl(this.time, [Validators.required]),
      'endTime': new FormControl(this.endTime, [Validators.required]),
      'isAuto': new FormControl(this.isAuto, [Validators.required]),
      'end': new FormControl(this.end, [Validators.required]),
      'vd_url': new FormControl(this.vd_url),
      'vd_url_number': new FormControl(this.vd_url.length)
    })
    this.adminService.getAllMajorEntries().subscribe(data => {
      this.majorData = data.major
    })
  }

  closeDialog() {
    let temp: Date = new Date(this.submitForm.value.date.getFullYear(), this.submitForm.value.date.getMonth(), this.submitForm.value.date.getDate(), this.submitForm.value.time.hours, this.submitForm.value.time.minutes)
    let endTemp: Date = new Date(this.submitForm.value.end.getFullYear(), this.submitForm.value.end.getMonth(), this.submitForm.value.end.getDate(), this.submitForm.value.endTime.hours, this.submitForm.value.endTime.minutes)
    this.submitForm.patchValue({ 'date': temp })
    this.submitForm.patchValue({ 'end': endTemp })
    this.dialogRef.close(this.submitForm.value);
  }

  editPaper() {
    let dialogRef = this.dialog.open(PaperEditDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitForm.patchValue({ 'paperId': result.id })
      }
    })
  }

  editUrls() {

    let dialogRef = this.dialog.open(ExamUrlsEditDialogComponent, {})
    let instance = dialogRef.componentInstance;
    instance.urls_length = this.submitForm.value.vd_url_number
    instance.urls_list = this.vd_url


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.vd_url.length === 0) {
          this.vd_url = Array<string>(this.submitForm.value.vd_url_number).fill('')
        }
        result.forEach((element: FormControl, index: number) => {
          this.vd_url[index] = element.value.selection
        });
        this.submitForm.patchValue({'vd_url': this.vd_url})
      }
    })
  }

  timeChanged(data: string, type: number) {
    if (type === 0) {
      let temp: Time = {
        hours: +data.substring(0, 2),
        minutes: +data.substring(3, 5)
      }
      this.submitForm.patchValue({ 'time': temp })
    }
    else {
      let temp: Time = {
        hours: + data.substring(0, 2),
        minutes: +data.substring(3, 5)
      }
      this.submitForm.patchValue({ 'endTime': temp })
    }

  }
}
