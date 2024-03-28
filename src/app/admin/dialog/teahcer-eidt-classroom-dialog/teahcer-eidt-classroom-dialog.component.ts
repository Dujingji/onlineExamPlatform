
import { Subject, first } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/admin.service';
import { PaperEditDialogComponent } from '../paper-edit-dialog/paper-edit-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { classroom } from 'src/modules/classroom/classroom';

@Component({
  selector: 'app-teahcer-eidt-classroom-dialog',
  templateUrl: './teahcer-eidt-classroom-dialog.component.html',
  styleUrls: ['./teahcer-eidt-classroom-dialog.component.scss']
})

export class TeahcerEidtClassroomDialogComponent implements OnInit{

  id? : string
  currentClassroomId : string[] =[]
  private reminderClassroomData : editClassroomData[] = []

  displayedColumns: string[] = ['班级名称','教学点', '科目' ,'学生人数', "按钮"];
  private classroomData : editClassroomData[] = []

  private tableListSubject = new Subject<void>();

  constructor(private adminService : AdminService, private dialogRef: MatDialogRef<PaperEditDialogComponent>){}


  ngOnInit(): void {
    this.fetchAllClassroom()

    this.adminService.teacherEntriesSubject.subscribe((response) =>{
      this.classroomData = []
      this.reminderClassroomData = []
      this.fetchAllClassroom()
    })
  }

  get dataSource() {
    return new MatTableDataSource<editClassroomData>(this.classroomData);
  }
  get dataSourceR() {
    return new MatTableDataSource<editClassroomData>(this.reminderClassroomData);
  }

  fetchAllClassroom(){
    this.adminService.getAllClassroomEntries()
    .subscribe(async (data) => {
      await Promise.all(data.data.map(async (element, index) => {

      }))
    })
  }

  onDelete(classroom : string){
    if(this.id){
      this.adminService.deleteTeacherClassroom(this.id, classroom).pipe(first()).subscribe(() =>{
        let find = this.currentClassroomId.indexOf(classroom)
        this.currentClassroomId.splice(find, 1)
      })
    }
  }

  onAdded(classroom : string, i : number){
    if(this.id){
      this.adminService.updateTeacher(this.id, classroom, i, 0).pipe(first()).subscribe(() =>{
        this.currentClassroomId.push(classroom)
      })
    }
  }
}

export interface editClassroomData{
  classroom : classroom
  college : string
}
