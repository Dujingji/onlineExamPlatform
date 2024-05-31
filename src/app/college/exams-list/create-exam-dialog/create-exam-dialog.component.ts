import { Component, Input, OnInit } from '@angular/core';
import { timeSpam, unitedExamInfo } from '../exams-list.component';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Form, FormControl, FormGroup, FormGroupName, NonNullableFormBuilder, Validators } from '@angular/forms';
import { option } from '../../college-home-page/college-home-page.component';
import * as ClassicEditor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CollegesService } from 'src/app/service/college/college.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-exam-dialog',
  templateUrl: './create-exam-dialog.component.html',
  styleUrls: ['./create-exam-dialog.component.scss']
})
export class CreateExamDialogComponent implements OnInit {

  public exam_data?: unitedExamInfo

  private date: Date[] = []
  public Editor = ClassicEditor;
  public model = {
    editorData: ''
  };
  public majorList: option[] = []
  public statusList: statusOption[] = [
    {
      label: '报名阶段', value: 0
    },
    {
      label: '分配教室', value: 1
    },
    {
      label: '等待开考', value: 2
    },
    {
      label: '考试进行', value: 3
    },
    {
      label: '等待上传成绩', value: 4
    },
    {
      label: '考试已结束', value: 5
    },
  ]

  validateForm: FormGroup

  ngOnInit(): void {
    if (this.exam_data) {
      this.date.push(this.exam_data.start_date)
      this.date.push(this.exam_data.end_date)

      if (this.exam_data.notification && this.exam_data.notification.length !== 0) {
        this.model.editorData = this.exam_data.notification.toString()
      }
    }

    this.collegesService.getMajorList().pipe(first()).subscribe(data => {
      this.majorList = data.data
    })
  }

  constructor(private modalRef: NzModalRef, private fb: NonNullableFormBuilder, private collegesService: CollegesService) {
    this.exam_data = this.collegesService.exam_data

    let name = this.exam_data ? this.exam_data.name : ''
    let major = this.exam_data ? this.exam_data.major : ''
    let status = this.exam_data ? this.exam_data.status : 0
    let location = this.exam_data ? this.exam_data.location : ''
    let notification = this.exam_data ? this.exam_data.notification : ''

    this.validateForm = new FormGroup({
      'name': new FormControl(name, [Validators.required]),
      'major': new FormControl(major, [Validators.required]),
      'date': new FormControl(this.date, [Validators.required]),
      'status': new FormControl(status, [Validators.required]),
      'notification' : new FormControl(notification, [Validators.required]),
      'location': new FormControl(location)
    })
  }

  public onReady(editor: any): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  onChange({ editor }: ChangeEvent) {
    this.validateForm.patchValue({ 'notification': this.model.editorData })
  }

  close(condition: number): void {
    // Pass some data back to the major component
    if (condition)
      this.modalRef.close(this.validateForm.value);
    else
      this.modalRef.close();
  }

}

interface statusOption {
  label: string,
  value: number
}
