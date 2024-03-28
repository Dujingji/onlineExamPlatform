import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, interval, takeUntil } from 'rxjs';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { MatDialog } from '@angular/material/dialog';
import { Paper } from 'src/modules/paper/paper';
import { result } from 'src/modules/user/user';
import { answerModel } from '../../exam-page/exam-paper/exam-paper.component';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  @ViewChild('sidenav1')
  sidenav1!: MatSidenav;

  public paperData?: Paper
  public selectedList: answerModel[] = []
  private questionStautList: number[] = []
  private resultInfo?: result
  private qt: number = 0
  private end_time?: Date
  private std_college?: string
  private std_major?: string

  private exam_id?: string
  private paper_id?: string
  public sumbitStauts = false
  private eid? : string

  private notifier = new Subject<void>()

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private examPaperService: ExamPaperService, public dialog: MatDialog, private location : Location) {
  }

  get userName() {
    return localStorage.getItem("username")
  }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('id')!
    this.retrieveData(this.exam_id)
    this.retrieveUserData(localStorage.getItem("information")!, this.exam_id)
    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() => {
      if (this.paper_id && this.exam_id) {
        this.retrieveUser(localStorage.getItem("information")!, this.paper_id, this.exam_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })
  }

  get paper() {
    if (this.paperData) {
      return this.paperData.paper
    }
    return ""
  }

  get section() {
    if (this.paperData) {
      return this.paperData.section
    }
    return []
  }

  get ID() {
    return this.exam_id
  }

  get wANDc(): number[] {
    let temp = [0, 0]
    if (this.resultInfo && this.paperData) {
      for (let i = 0; i < this.resultInfo.answer.length; i++) {
        if (this.resultInfo.answer[i].value == this.paperData.questions[i].answer) {
          temp[0] += 1
        }
        else {
          if (!this.paperData.questions[i].type.includes('题目'))
            temp[1] += 1
        }
      }
    }
    return temp
  }

  get mark(): number {
    if (this.resultInfo) {
      return this.resultInfo.mark
    }
    return 0
  }

  get _qt() {
    return this.qt
  }

  get major() {
    return this.std_major
  }

  get college() {
    return this.std_college
  }

  get endTime() {
    if (this.end_time) {
      return new Date(this.end_time).toLocaleString()
    }
    else {
      return "加载中..."
    }
  }

  get EID(){
    if(this.eid){
      return this.eid
    }else{
      return '待定'
    }
  }

  get totalMark(): number {
    let total = 0
    if (this.paperData) {
      this.paperData.questions.forEach(element => {
        if (!element.type.includes('题目'))
          total += element.mark
      })
    }

    return total
  }

  get table(): number[] {
    let length = this.selectedList.length
    if (this.paperData) {
      for (let i = 0; i < length; i++) {
        if (this.selectedList[i].mark != -1 && this.selectedList[i].mark == this.paperData.questions[i].mark) {
          this.questionStautList[i] = 3
        }
        else if (this.selectedList[i].mark == 0) {
          this.questionStautList[i] = 1
        }
        else if (this.selectedList[i].mark != -1 && this.selectedList[i].mark < this.paperData.questions[i].mark) {
          this.questionStautList[i] = 2
        }
        else {
          this.questionStautList[i] = 0
        }
      }
    }
    return this.questionStautList
  }

  correctIndex(i: number): number {
    let count = 0;
    if (this.paperData) {
      this.paperData.n.forEach((element, index) => {
        if (index < i) {
          count += element
        }
      })
    }
    return count
  }

  OnReceive(selectedOption: any) {
    this.selectedList = selectedOption
    let length = this.selectedList.length
    this.questionStautList = new Array<number>(length).fill(0)
  }

  goBack(){
    this.location.back();
  }

  retrieveUser(userInfo: string, paper_id: string, exam_id : string) {
    this.examPaperService.getUserAnswer(userInfo, paper_id, exam_id).subscribe((data) => {
      // for(let i = 0; i < data.userInfo.exam_answer.length; i++){
      //   if(this.exam_id == data.userInfo.exam_answer[i].examId){
      //      this.resultInfo = data.userInfo.exam_answer[i]
      //   }
      // }
      this.resultInfo = data.answer
    })
  }

  retrieveUserData(std_id: string, exam_id : string) {
    this.examPaperService.getStudentInformation(std_id).subscribe(data => {
      this.std_college = data.college
      this.std_major = data.major
      this.eid = data.EID
    })
  }

  retrieveData(id: string): void {
    this.examPaperService.getPaperEntry(id, '')
      .subscribe((data) => {
        this.end_time = data.end
        this.paperData = data.paper;
        this.paper_id = data.paper_id;
        this.paperData.questions.forEach(element => {
          if (element.type.includes('题目'))
            this.qt += 1
        })
      })
  }


  WaringChanged(i: number, id: string) {
    let el = document.getElementById(i.toString());
    if (el)
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
    // let path = "/public/exam/result/" + id + '#' + i
    // window.location.assign(path)
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.observer
      .observe(['(max-width: 1200px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav1.mode = 'over';
          this.sidenav1.close();
        } else {
          this.sidenav1.mode = 'side';
          this.sidenav1.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }

        if (this.sidenav1.mode === 'over') {
          this.sidenav1.close();
        }
      });
  }

  convertN(input: string): number {
    let r = 0;
    switch (input) {
      case "A": {
        r = 0;
        break;
      }
      case "B": {
        r = 1;
        break;
      }
      case "C": {
        r = 2;
        break;
      }
      case "D": {
        r = 3;
        break;
      }
      case "E": {
        r = 4;
        break;
      }
    }
    return r;
  }
}
