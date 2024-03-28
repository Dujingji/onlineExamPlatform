import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject, delay, filter, first, interval, takeUntil } from 'rxjs';
import { answerModel } from 'src/app/public/pages/exam-page/exam-paper/exam-paper.component';
import { TeacherService } from 'src/app/service/teacher/teacher.service';
import { Paper } from 'src/modules/paper/paper';
import { result } from 'src/modules/user/user';
import { TeacherStudentInfo } from '../student-list/student-list.component';


@UntilDestroy()
@Component({
  selector: 'app-student-paper-view',
  templateUrl: './student-paper-view.component.html',
  styleUrls: ['./student-paper-view.component.scss']
})
export class StudentPaperViewComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  @ViewChild('sidenav1')
  sidenav1!: MatSidenav;

  public paperData?: Paper
  public selectedList: answerModel[] = []
  private questionStautList: number[] = []
  private resultInfo?: result
  private userInfo?: string
  private collegeInfo?: string
  private exam_status?: number
  public reminder?: number
  public next? : { std_id : string, exam_id : string}

  private exam_id?: string
  private std_id?: string
  private paper_id?: string
  public currentPage : number = 0
  public sumbitStauts = false

  private notifier = new Subject<void>()
  private statusNotifier = new Subject<void>()

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private teacherService: TeacherService, public dialog: MatDialog) {
  }

  get exam_s() {
    if (this.exam_status)
      return this.exam_status
    else
      return 0
  }

  get userName(): string {
    if (this.userInfo) {
      return this.userInfo
    }
    return ''
  }

  get college(): string {
    if (this.collegeInfo) {
      return this.collegeInfo
    }
    return ''
  }

  ngOnInit(): void {
    this.currentPage = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.exam_id = this.route.snapshot.paramMap.get('exam_id')!
    this.std_id = this.route.snapshot.paramMap.get('std_id')!
    this.retrieveData(this.exam_id)
    this.getReminderList(this.exam_id, this.std_id)

    const time = interval(500).pipe(takeUntil(this.notifier)).subscribe(() => {
      if (this.paper_id && this.std_id && this.exam_id) {
        this.retrieveUser(this.std_id, this.paper_id, this.exam_id)
        this.notifier.next()
        this.notifier.complete()
      }
    })

    this.teacherService.teacherSubject.pipe(takeUntil(this.statusNotifier)).subscribe(response => {
      if (this.exam_id && this.std_id && this.paper_id) {
        this.retrieveData(this.exam_id)
        this.retrieveUser(this.std_id, this.paper_id, this.exam_id)
      }
    })
  }

  OnDestroy() {
    this.statusNotifier.next()
    this.statusNotifier.complete()
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
        if (this.resultInfo.answer[i].mark >= 0) {
          temp[0] += 1
        } else {
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

  get totalMark(): number {
    let total = 0
    if (this.paperData) {
      this.paperData.questions.forEach(element => {
        if (!element.type.includes('题目')) {
          if (this.paperData && this.paperData.major === '大学语文' && element.type === '名句默写题') {
            total += 0
          }
          else if (this.paperData && this.paperData.major === '汉语言文学学科基础' && element.type === '名句默写题') {
            total += 0
          }
          else if (this.paperData && this.paperData.major === '汉语言文学学科基础' && element.type === '简答题') {
            total += 0
          }
          else {
            total += element.mark
          }
        }
      })
      if( this.paperData.major === '大学语文'){
        total += 6
      }

      if( this.paperData.major === '汉语言文学学科基础'){
        total += 40
      }
    }

    return total
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

  getReminderList(exam_id: string, std_id: string) {
    this.teacherService.getReminderList(localStorage.getItem('information')!, std_id, exam_id)
      .pipe(first())
      .subscribe(data => {
        console.log(data)
        this.reminder = data.reminder
        this.next = data.next
      })
  }

  onSubmit() {
    if (this.std_id && this.exam_id) {
      this.teacherService.submitStudentMark(this.std_id, this.exam_id, localStorage.getItem('username')!)
        .pipe(first())
        .subscribe((data) => {
          if (data.status) {

          }
        })
    }
  }

  onChangeStatus() {
    if (this.std_id && this.exam_id) {
      this.teacherService.changeExamStatus(this.std_id, this.exam_id)
        .pipe(first())
        .subscribe((data) => {
          if (data.status) {

          }
        })
    }
  }

  onNext() {
    if (this.next)
      this.router.navigateByUrl('/teacher/view/' + this.next.std_id + "/" + this.next.exam_id + "/" + this.currentPage)
        .then(() => {
          window.location.reload();
        })
  }

  OnReceive(selectedOption: any) {
    this.selectedList = selectedOption
    let length = this.selectedList.length
    this.questionStautList = new Array<number>(length).fill(0)
  }

  retrieveUser(std_id: string, paper_id: string, exam_id : string) {
    this.teacherService.getUserAnswer(std_id, paper_id, exam_id).subscribe((data) => {
      this.resultInfo = data.answer
      this.userInfo = data.std_name
      this.exam_status = data.exam_status
      this.collegeInfo = data.college
    })
  }

  retrieveData(exam_id: string): void {
    this.teacherService.getPaperEntry(exam_id)
      .subscribe((data) => {
        this.paperData = data.paper;
        this.paper_id = data.paper_id;
      })
  }


  WaringChanged(i: number, id: string) {
    // let path = "/teacher/view/" + this.std_id + "/" + id + '#' + i
    // window.location.assign(path)
    let el = document.getElementById(i.toString());
    if (el)
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
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
      .observe(['(max-width: 1400px)'])
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
