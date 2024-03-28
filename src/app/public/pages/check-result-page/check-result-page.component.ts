import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ExamPaperService, resultInfo } from 'src/app/service/exam/exam-paper.service';
import { major } from 'src/modules/major/major';
import { userInfo } from 'src/modules/user/user';
import { VideoSelecteDialogComponent } from './video-selecte-dialog/video-selecte-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-check-result-page',
  templateUrl: './check-result-page.component.html',
  styleUrls: ['./check-result-page.component.scss']
})
export class CheckResultPageComponent implements OnInit {

  public userInfor?: userInfo
  private data: Array<resultInfo[]> = []
  public type: number = 0

  private englishResult: resultInfo[] = []
  private politicsResult: resultInfo[] = []
  private foundResult: resultInfo[] = []
  private comprehensiveResult: resultInfo[] = []
  private current?: resultInfo[]
  public major: major[] = []

  displayedColumns: string[] = ['考试名称', '分数', "截止时间", '按钮'];

  constructor(private exampaperService: ExamPaperService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveExam()
  }

  getDataSource(index: number, major : string) {
    let filterList = this.data[index].filter(itme => itme.major === major)
    return new MatTableDataSource<resultInfo>(filterList);
  }

  get exams(): resultInfo[] | undefined {
    return this.current
  }

  get user_id(): string {
    return localStorage.getItem('information')!
  }

  get userInformation() {
    return localStorage.getItem("classroom")
  }

  examDate(date: any) {
    return new Date(date).toLocaleString()
  }

  openVideoList(vd_url : string[]){
    let dialogRef = this.dialog.open(VideoSelecteDialogComponent, {
    })
    let instance = dialogRef.componentInstance;
    instance.video_list = vd_url
  }

  retrieveExam(): void {
    let id = localStorage.getItem("information")
    if (id) {
      this.exampaperService.getResultExamEntries(id)
        .subscribe((data) => {
          this.current = data.current
          this.major = data.major
          this.englishResult = data._e
          this.comprehensiveResult = data._c
          this.foundResult = data._f
          this.politicsResult = data._p
          this.type = data.type
          for (let i = 0; i < this.major.length; i++) {
            if (this.major[i].type === 0) {
              this.data.push(this.englishResult)
            }
            if (this.major[i].type === 1) {
              this.data.push(this.politicsResult)
            }
            if (this.major[i].type === 2) {
              this.data.push(this.foundResult)
            }
            if (this.major[i].type === 3) {
              this.data.push(this.comprehensiveResult)
            }
          }

        })
    }
  }
}
