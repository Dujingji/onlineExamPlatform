import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import { studentExamsModel } from 'src/modules/student/student.module';



@Component({
  selector: 'app-students-exams-list',
  templateUrl: './students-exams-list.component.html',
  styleUrls: ['./students-exams-list.component.scss']
})
export class StudentsExamsListComponent implements OnInit {

  @Input() id : string = ""

  public examsData: studentExamsModel[] = []
  displayedExpamdColumns: string[] = ['考试名称', '试卷ID', '状态', '答题详情', '分数']

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {

  }
  get dataSource() {
    return new MatTableDataSource<studentExamsModel>(this.examsData);
  }

  fetchAllExamsDetails() {
    if (this.id) {
      this.adminService.getAllExamsDetails(this.id)
        .subscribe((data) => {
          this.examsData= data.examInfos
        })
    }
  }
}
