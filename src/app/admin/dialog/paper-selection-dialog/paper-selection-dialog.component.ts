import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as ClassicEditor from '../../../shared/ckeditor'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-paper-selection-dialog',
  templateUrl: './paper-selection-dialog.component.html',
  styleUrls: ['./paper-selection-dialog.component.scss']
})
export class PaperSelectionDialogComponent implements OnInit {

  selection_list: string[] = []
  length?: number
  model: Array<model> = []
  public Editor = ClassicEditor;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<PaperSelectionDialogComponent>) { }

  ngOnInit(): void {
    if (this.length && this.selection_list.length === 0) {
      this.selection_list = Array<string>(this.length).fill('')
    }

    this.selection_list.forEach((element) => {
      this.model.push({ editorData: element })
    });
  }

  onChange({ editor }: ChangeEvent, i: number) {

  }

  onReady(editor: any): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  closeDialog() {
    this.model[0].editorData = this.model[0].editorData.replace('<p>', '')
    this.model[0].editorData = this.model[0].editorData.replace('</p>', '')
    this.model[1].editorData = this.model[1].editorData.replace('<p>', '')
    this.model[1].editorData = this.model[1].editorData.replace('</p>', '')
    this.model[2].editorData = this.model[2].editorData.replace('<p>', '')
    this.model[2].editorData = this.model[2].editorData.replace('</p>', '')
    this.model[3].editorData = this.model[3].editorData.replace('<p>', '')
    this.model[3].editorData = this.model[3].editorData.replace('</p>', '')
    this.dialogRef.close(this.model);
  }

  convert(input: number): string {
    let r = "";
    switch (input) {
      case 0: {
        r = "A";
        break;
      }
      case 1: {
        r = "B";
        break;
      }
      case 2: {
        r = "C";
        break;
      }
      case 3: {
        r = "D";
        break;
      }
      case 4: {
        r = "E";
        break;
      }
    }
    return r;
  }

}

export interface model {
  editorData: string
}
