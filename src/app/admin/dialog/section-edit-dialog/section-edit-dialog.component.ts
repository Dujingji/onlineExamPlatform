import { qType } from './../../../../modules/questionType/type';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-section-edit-dialog',
  templateUrl: './section-edit-dialog.component.html',
  styleUrls: ['./section-edit-dialog.component.scss']
})
export class SectionEditDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SectionEditDialogComponent>) {

  }
  ngOnInit(): void {
    let length = this.qType.getTypeLength()
    this.checked = new Array<boolean>(length).fill(false)
  }

  public result: string[] = []
  checked : boolean[] = []
  qType : qType = new qType()

  closeDialog() {
    this.checked.forEach((element, index) => {
      if (element) {
        this.result.push(this.qType.type[index])
      }
    })
    this.dialogRef.close(this.result);
  }
}
