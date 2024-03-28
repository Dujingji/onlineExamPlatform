import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import { classroomDetailModel } from 'src/modules/classroom/classroom';


@Component({
  selector: 'app-classroom-students-detail',
  templateUrl: './classroom-students-detail.component.html',
  styleUrls: ['./classroom-students-detail.component.scss']
})
export class ClassroomStudentsDetailComponent implements OnInit {

  @Input() id : string = ""

  public classStudentData: classroomDetailModel[] = []
  displayedExpamdColumns: string[] = ['学生姓名', '专业类型', '报考数量', '按钮']

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.fetchAllClassroomDetails()
  }

  get dataSource() {
    return new MatTableDataSource<classroomDetailModel>(this.classStudentData);
  }

  fetchAllClassroomDetails() {
    if(this.id) {
      this.adminService.getAllClassroomStudentDetail(this.id)
        .subscribe((data) => {
          this.classStudentData = data.classroomData
        })
    }
  }
}
