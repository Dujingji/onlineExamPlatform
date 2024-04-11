import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { userInfo } from 'src/modules/user/user';
import { exam } from 'src/modules/exams/exam';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { Subscription, interval, first, take, Subject, takeUntil } from 'rxjs';
import { PublicService, menuModel } from 'src/app/service/public/public.service';

@Component({
  selector: 'app-show-exam-paper',
  templateUrl: './show-exam-paper.component.html',
  styleUrls: ['./show-exam-paper.component.scss']
})

export class ShowExamPaperComponent implements OnInit {

  public examInformation?: exam[]
  public userInfor?: userInfo
  public active?: boolean[]
  public reminder?: number[]
  private timeSpanList?: string[]
  private notifier = new Subject<void>()
  private examActiveInformation? : exam[]
  private examEndInformation?: exam[]
  public endIs?: boolean[]
  public loading : boolean = true

  examEntriesSub = new Subscription();


  constructor(private exampaperService: ExamPaperService, private publicService: PublicService) { }

  examStatus(paperId: string): boolean {
    let status = false
    if (this.userInfor) {
      let data = this.userInfor.exam_answer
      for (let i = 0; i < data.length; i++) {
        if (data[i].paperId === String(paperId)) {
          status = true
        }
      }
    }
    return status
  }


  ngOnInit(): void {
    this.retrieveUserinfo()
    this.retrieveExam()
  }


  get examInfo(): exam[] {
    if (this.examActiveInformation) {
      return this.examActiveInformation
    }
    else {
      return []
    }
  }

  get endExamInfo(): exam[] {
    if (this.examEndInformation) {
      return this.examEndInformation
    }
    else {
      return []
    }
  }

  get userInformation() {
    return localStorage.getItem("classroom")
  }

  examDate(date: Date) {
    return new Date(date).toLocaleString()
  }

  // convertDay(c : number){
  //     this.timeSpan = Math.floor(c / 1000 / 86400) + "天 "
  //     + Math.floor(c / 1000 % 86400 / 3600) + "时 "
  //     + Math.floor(c / 1000 % 86400 % 3600 / 60) + "分 "
  //     + Math.floor(c / 1000 % 86400 % 3600 % 60) + "秒"
  //     // return day + "天 " + hours + "时 " + min + "分 " + sec + "秒"
  // }

  onClock(index: number) {
    let notifier = new Subject<void>()
    const numbers = interval(1000);
    numbers.pipe(takeUntil(this.notifier)).subscribe(x => {
      if (this.active && this.reminder && this.examActiveInformation) {
        let now = new Date()
        this.reminder[index] = new Date(this.examActiveInformation[index].date).getTime() - now.getTime()
        this.loading = false
        if (this.reminder[index] < 0 && this.active) {
          this.active[index] = true
        }
        if (new Date(this.examActiveInformation[index].end).getTime() < now.getTime() && this.endIs) {
          this.endIs[index] = true
          notifier.next()
          notifier.complete()
        }
      }
    })
  }

  Timer() {
    if (this.examActiveInformation && this.reminder === undefined) {
      this.reminder = Array<number>(this.examActiveInformation.length).fill(0)
      for (let i = 0; i < this.examActiveInformation.length; i++) {
        this.onClock(i)
      }
    }

  }

  getButtonActived(exam: exam): boolean {
    let now = new Date()
    if (now.getTime() - new Date(exam.date).getTime()  >= 0 && now.getTime() - new Date(exam.end).getTime()  <= 0) {
      return true
    }
    else {
      return false
    }
  }

  getTimeSpan(i: number) {
    if (this.reminder) {
      let timeSpan = Math.floor(this.reminder[i] / 1000 / 86400) + "天 "
        + Math.floor(this.reminder[i] / 1000 % 86400 / 3600) + "时 "
        + Math.floor(this.reminder[i] / 1000 % 86400 % 3600 / 60) + "分 "
        + Math.floor(this.reminder[i] / 1000 % 86400 % 3600 % 60) + "秒"
      return timeSpan
    } else {
      return ''
    }
  }

  getExamStatus(index: number) {
    let now = new Date()
    if (this.examInformation) {
      if (new Date(this.examInformation[index].date).getTime()- now.getTime() > 0) {
        return 0
      }
      else if (new Date(this.examInformation[index].date).getTime() - now.getTime() <= 0 && new Date(this.examInformation[index].end).getTime()  - now.getTime() >= 0) {
        return 1
      }
      else {
        return 2
      }
    }
    else {
      return -1
    }
  }

  filterData(data: exam[], condition: number) {
    if (condition === 1) {
      return data.filter((e, i) => {
        return this.getExamStatus(i) !== 2
      })
    }
    else {
      return data.filter((e, i) => {
        return this.getExamStatus(i) === 2
      })
    }
  }

  retrieveExam(): void {
    let id = localStorage.getItem("information")
    if (id) {
      this.exampaperService.getExamEntries(id)
        .pipe(first())
        .subscribe((data) => {
          this.examInformation = data.exams;
          this.examActiveInformation = data.active
          this.examEndInformation = data.end
          this.active = Array<boolean>(this.examActiveInformation.length).fill(false)
          this.endIs = Array<boolean>(this.examActiveInformation.length).fill(false)
          this.Timer()
        })
    }
  }

  getButtonStatus(i: number): number {
    if (this.active !== undefined && this.endIs !== undefined && this.reminder !== undefined) {
      if (!this.active[i] && !this.endIs[i]) {
        return 0
      }
      else if (this.active[i] && !this.endIs[i]) {
        return 1
      }
      else if (this.endIs[i]) {
        return 2
      } else {
        return -1
      }
    }
    else {
      return -1
    }
  }

  retrieveUserinfo(): void {
    this.exampaperService.getUserInformation(localStorage.getItem("information")!)
      .subscribe((data) => {
        this.userInfor = data.userInfo
        localStorage.setItem('classroom', this.userInfor.classroom)
      })
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }
}


export interface reminderTimeModule {
  day: number;
  hours: number;
  min: number;
  sec: number;
}
