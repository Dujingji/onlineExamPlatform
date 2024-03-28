import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import { college } from 'src/modules/college/college';

@Component({
  selector: 'app-college-add-dialog',
  templateUrl: './college-add-dialog.component.html',
  styleUrls: ['./college-add-dialog.component.scss']
})
export class CollegeAddDialogComponent {
  displayedColumns: string[] = ['编号', '教学点名称',  "按钮"];

  private collegeData?: college[]

  constructor(private adminService : AdminService, private dialogRef: MatDialogRef<CollegeAddDialogComponent>){}


  ngOnInit(): void {
    this.fetchAllPaper()

    this.adminService.examEntriesSubject.subscribe(response => {
      this.fetchAllPaper()
    })
  }

  get dataSource() {
    return new MatTableDataSource<college>(this.collegeData);
  }

  fetchAllPaper(){
    this.adminService.getAllCollegeEntries()
    .subscribe((data) => {
      this.collegeData = data.college;
    })
  }

  onAdded(id : string, name : string){
    this.dialogRef.close({id : id, name : name});
  }
}
