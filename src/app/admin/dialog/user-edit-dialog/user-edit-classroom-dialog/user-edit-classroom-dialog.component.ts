import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin/admin.service';
import { PaperEditDialogComponent } from '../../paper-edit-dialog/paper-edit-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { classroom } from 'src/modules/classroom/classroom';
import { classdata } from 'src/app/admin/classroom/classroom.component';

@Component({
  selector: 'app-user-edit-classroom-dialog',
  templateUrl: './user-edit-classroom-dialog.component.html',
  styleUrls: ['./user-edit-classroom-dialog.component.scss']
})
export class UserEditClassroomDialogComponent implements OnInit{
  displayedColumns: string[] = ['班级名称', '教学点', "按钮"];

  private classroomData?: classdata[]
  collegeData : string[] = []

  constructor(private adminService : AdminService, private dialogRef: MatDialogRef<PaperEditDialogComponent>){}


  ngOnInit(): void {
    this.fetchAllClassroom()
  }

  get dataSource() {
    return new MatTableDataSource<classdata>(this.classroomData);
  }

  fetchAllClassroom(){
    this.adminService.getAllClassroomEntries()
    .subscribe((data) => {
      this.classroomData = data.data
    })
  }

  onAdded(classroom : string, name : string){
    this.dialogRef.close({id : classroom, name : name});
  }
}
