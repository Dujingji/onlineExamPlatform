import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { student } from 'src/modules/student/student.module';
import { UserEditDialogComponent } from '../dialog/user-edit-dialog/user-edit-dialog.component';
import { first } from 'rxjs';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import * as saveAs from 'file-saver';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentsComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) {
    this.submitForm = new FormGroup({})
  }

  submitForm : FormGroup
  private studentData: student[] = []
  private fetch = false
  private classInfo: className[] = []
  public pageSize: number = 10
  public page: number = 0
  public total: number = 1000
  public desiredPage : number = 0
  public totalPages : number = 0
  public studentName : string = ''

  displayedColumns: string[] = ['学生姓名', '密码', '专业类别', '年级', "所在班级", "已考数量", "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: student | null = null;
  displayedExpamdColumns: string[] = ['题目', '类型', '选项', '解析', '答案', '分值', '操作']
  fileName: string = ''

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'std_name': new FormControl('', [Validators.required])
    })
    this.fetchAllStudent()

    this.adminService.userEntriesSubject.subscribe(() => {
      this.fetchAllStudent()
    })
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }

  onSearch(){
    if( this.submitForm.value.std_name.length !== 0){
      this.adminService.getAllStudentEntries(this.page, this.pageSize, 1, this.submitForm.value.std_name)
      .subscribe((data) => {
        this.studentData = data.userInfos
        this.classInfo = data.classInfo
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
    }
    else{
      this.adminService.getAllStudentEntries(this.page, this.pageSize, 0, '')
      .subscribe((data) => {
        this.studentData = data.userInfos
        this.classInfo = data.classInfo
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
    }
  }

  get dataSource() {
    return new MatTableDataSource<student>(this.studentData);
  }

  get className() {
    return this.classInfo
  }

  goToDesiredPage() {
    if (this.desiredPage > 0 && this.desiredPage <= this.totalPages) {
      this.paginator.pageIndex = this.desiredPage - 1;
      this.paginator._changePageSize(this.paginator.pageSize); // 手动触发页数变化事件
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex
    this.fetchAllStudent()
  }

  fetchAllStudent() {
    this.adminService.getAllStudentEntries(this.page, this.pageSize, 0, '')
      .subscribe((data) => {
        this.studentData = data.userInfos
        this.classInfo = data.classInfo
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
  }

  DateString(date: Date): string {
    let temp = new Date(date)
    return temp.getFullYear() + '年' + (temp.getMonth() + 1) + '月' + temp.getDate() + '日'
  }

  onEditStudent(id: string, username: string, password: string, classroom: string, major: string, classname: string,
    semester: number, graduate: Date, std_name : string) {
    let dialogRef = this.dialog.open(UserEditDialogComponent, {
    })

    let instance = dialogRef.componentInstance;
    instance.classroom = classroom
    instance.major = major
    instance.password = password
    instance.username = username
    instance.className = classname
    instance.semester = semester
    instance.graduate = graduate
    instance.std_name = std_name

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: userInfoSubmitModel = ({
          username: result.username, major: result.major,
          password: result.password, classroom: result.classroom, semester: result.semester, graduate: result.graduate,
          std_name : result.std_name
        })
        this.adminService.updateUser(id, data).pipe(first()).subscribe((data) => {
          this.adminService.setSubmitExamStatus(data.status)
        })
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  onDeleteStudent(id: string, classroom: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteUser(id, classroom).pipe(first()).subscribe((data) => { })
      }
    })
  }

  onCreateUser() {
    let dialogRef = this.dialog.open(UserEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: userInfoSubmitModel = ({
          username: result.username, major: result.major,
          password: result.password, classroom: result.classroom, semester: result.semester, graduate: result.graduate,
          std_name : result.std_name
        })
        this.adminService.addUser(data).pipe(first()).subscribe((data) => {
          this.adminService.setSubmitExamStatus(data.status)
        })
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  onDownloadTemp() {
    this.adminService.downloadstudentsTemp().subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL)
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file, this.fileName);
      const upload = this.adminService.uploadStudents(formData).subscribe(() => {

      })
    }
  }
}

export interface userInfoSubmitModel {
  username: string,
  major: string,
  password: string,
  classroom: string,
  semester: number,
  graduate: Date,
  std_name : string
}

export interface className {
  name: string;
  college: string
}
