import { OnDestroy, ViewChild } from '@angular/core';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, first, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private teacherService: TeacherService, private dialog: MatDialog, private router: Router, private Activatedroute: ActivatedRoute) {
    this.submitForm = new FormGroup({})
    this.page = parseInt(this.Activatedroute.snapshot.paramMap.get('id')!);
    this.desiredPage = this.page + 1;
  }

  submitForm: FormGroup
  private studentData?: TeacherStudentInfo[];
  private notifier = new Subject<void>();

  public pageSize: number = 10
  public page: number = 0
  public total: number = 1000
  public desiredPage: number = 0
  public totalPages: number = 0
  public studentName: string = ''

  displayedColumns: string[] = ['学生姓名', '所属专业', '考试名称', '成绩', '考试状态', "按钮"];

  ngOnInit() {
    this.submitForm = new FormGroup({
      'std_name': new FormControl('', [Validators.required])
    })

    this.fetchAllStudents()

    this.teacherService.teacherSubject
      .pipe(takeUntil(this.notifier))
      .subscribe(response => {
        this.fetchAllStudents()
      })
  }

  date(data: any) {
    let temp = new Date(data).toLocaleString()
    return temp
  }

  get dataSource() {
    return new MatTableDataSource<TeacherStudentInfo>(this.studentData);
  }

  fetchAllStudents() {
    this.teacherService.getStudentInfo(localStorage.getItem("information")!, this.page, this.pageSize, 0, '')
      .pipe(first())
      .subscribe((data) => {
        this.studentData = data.userInfo
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
  }

  onSubmit(std_id: string, exam_id: string) {
    this.teacherService.submitStudentMark(std_id, exam_id, localStorage.getItem('username')!).subscribe(() => {
    })
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
    this.desiredPage = this.page + 1
    this.fetchAllStudents()
  }

  onSearch() {
    if (this.submitForm.value.std_name.length !== 0) {
      this.teacherService.getStudentInfo(localStorage.getItem("information")!, this.page, this.pageSize, 1, this.submitForm.value.std_name)
        .subscribe((data) => {
          this.studentData = data.userInfo
          this.total = data.total
          this.totalPages = Math.ceil(this.total / this.pageSize);
        })
    }
    else {
      this.teacherService.getStudentInfo(localStorage.getItem("information")!, this.page, this.pageSize, 0, '')
        .subscribe((data) => {
          this.studentData = data.userInfo
          this.total = data.total
          this.totalPages = Math.ceil(this.total / this.pageSize);
        })
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}

export interface TeacherStudentInfo {
  std_id: string;
  std_name: string;
  std_major: string;
  exam_id: string;
  exam_name: string;
  exam_status: number;
  exam_mark: number;
  teacher_name: string;
}
