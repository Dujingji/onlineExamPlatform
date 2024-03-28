import { qType } from './../../../../modules/questionType/type';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExamEditDialogComponent } from '../exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { PaperSelectionDialogComponent, model } from '../paper-selection-dialog/paper-selection-dialog.component';
import * as ClassicEditor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-question-edit-dialog',
  templateUrl: './question-edit-dialog.component.html',
  styleUrls: ['./question-edit-dialog.component.scss']
})
export class QuestionEditDialogComponent implements OnInit {
  submitForm: FormGroup
  question?: string
  type?: string
  mark?: number
  selection_length?: number
  selections: Array<string> = []
  answer?: string
  comment?: string
  qType: qType = new qType()

  public Editor = ClassicEditor;
  public model = {
    editorData: ''
  };

  public aM = {
    editorData: ''
  };

  public cM = {
    editorData: ''
  };

  constructor(private dialog: MatDialog, private router: Router, private dialogRef: MatDialogRef<QuestionEditDialogComponent>, private authService: AuthService) {
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'question': new FormControl(this.question, [Validators.required]),
      'type': new FormControl(this.type, [Validators.required]),
      'mark': new FormControl(this.mark, [Validators.required]),
      'comment': new FormControl(this.comment),
      'selection': new FormControl(this.selection_length),
      'answer': new FormControl(this.answer, [Validators.required]),
    })

  }

  onChange({ editor }: ChangeEvent) {
    this.submitForm.patchValue({ 'question': this.model.editorData })
  }

  onChangeC({ editor }: ChangeEvent) {
    this.submitForm.patchValue({ 'comment': this.cM.editorData })
  }

  onChangeA({ editor }: ChangeEvent) {
    this.submitForm.patchValue({ 'answer': this.aM.editorData })
  }

  public onReady(editor: any): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  public onReadyA(editor: any): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  public onReadyC(editor: any): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  closeDialog() {
    this.dialogRef.close({ details: this.submitForm.value, selections: this.selections });
  }

  editSelection() {
    let dialogRef = this.dialog.open(PaperSelectionDialogComponent, {})
    let instance = dialogRef.componentInstance;

    instance.selection_list = this.selections
    instance.length = this.submitForm.value.selection

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selections.length === 0) {
          this.selections = Array<string>(this.submitForm.value.selection).fill('')
        }
        result.forEach((element: model, index: number) => {
          this.selections[index] = element.editorData
        });
      }
    })
  }
}
