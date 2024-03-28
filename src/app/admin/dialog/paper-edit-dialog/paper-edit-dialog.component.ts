import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Paper } from 'src/modules/paper/paper';

@Component({
  selector: 'app-paper-edit-dialog',
  templateUrl: './paper-edit-dialog.component.html',
  styleUrls: ['./paper-edit-dialog.component.scss']
})
export class PaperEditDialogComponent implements OnInit {

  displayedColumns: string[] = ['试卷名称', '试卷ID', "按钮"];

  private papersData?: Paper[]

  constructor(private adminService : AdminService, private dialogRef: MatDialogRef<PaperEditDialogComponent>){}


  ngOnInit(): void {
    this.fetchAllPaper()

    this.adminService.examEntriesSubject.subscribe(response => {
      this.fetchAllPaper()
    })
  }

  get dataSource() {
    return new MatTableDataSource<Paper>(this.papersData);
  }

  fetchAllPaper(){
    this.adminService.getAllPaperEntries()
    .subscribe((data) => {
      this.papersData = data.papers;
    })
  }

  onAdded(id : string, name : string){
    this.dialogRef.close({id : id, name : name});
  }
}
