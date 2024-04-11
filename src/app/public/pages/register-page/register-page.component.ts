import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { PublicService, menuModel } from 'src/app/service/public/public.service';
import { exam } from 'src/modules/exams/exam';
import { major } from 'src/modules/major/major';
import { userInfo } from 'src/modules/user/user';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  public reminder: exam[] = []
  public register: exam[] = []
  public userInfor?: userInfo
  public submitForm: FormGroup
  public submitForm1: FormGroup

  private notifier = new Subject<void>()

  private std_id: string | null = localStorage.getItem("information")

  private data: Array<exam[]> = []
  private englishResult: exam[] = []
  private politicsResult: exam[] = []
  private foundResult: exam[] = []
  private comprehensiveResult: exam[] = []
  private current: exam[] = []
  public major: major[] = []
  public type: number = 0
  public foundList: major[] = []
  public comprehensiveList: major[] = []
  public user_c?: string

  public disabled: boolean = false
  private recent: exam[] = []


  constructor(private exampaperService: ExamPaperService, private publicService: PublicService) {
    this.submitForm = new FormGroup({})
    this.submitForm1 = new FormGroup({})
  }

  ngOnDestroy(): void {
    this.notifier.next()
    this.notifier.complete()
  }

  displayedColumns: string[] = ['考试名称', '科目', "截止时间"];

  ngOnInit(): void {

    this.submitForm = new FormGroup({
      'found': new FormControl(undefined, [Validators.required])
    })
    this.submitForm1 = new FormGroup({
      'comprehensive': new FormControl(undefined, [Validators.required]),
    })

    this.retrieveExam()

    this.exampaperService.examSubject
      .pipe(takeUntil(this.notifier))
      .subscribe(response => {
        this.retrieveExam()
      })
  }

  getDataSource(index: number, major: string, data: exam[][]) {
    let filterList = data[index].filter(itme => itme.major === major)
    return new MatTableDataSource<exam>(filterList);
  }

  CheckEmpty(index: number, major: string, data: exam[][]) {
    let result = new Array<exam>()
    result = data[index].filter(itme => itme.major === major)
    return result
  }

  get examReminder(): exam[] {
    return this.reminder
  }

  get examRegister(): exam[] {
    if (this.current)
      return this.current
    else
      return []
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

  registerExam(user: string, exam: string, type: number) {
    this.exampaperService.updateRegister(user, exam, type)
      .subscribe((data) => {

      })
  }

  get historyRegister() {
    let temp: exam[][] = []
    this.data.forEach(m => {
      temp.push(m)
    })
    return temp
  }

  get recentRegister() {
    return this.recent
  }

  cancelRegister(user: string, exam: string, type: number) {
    this.exampaperService.updateRegister(user, exam, type)
      .subscribe((data) => {
        if (data.status) {
          window.location.reload();
        }
      })
  }

  active(data: Date): boolean {
    let now = new Date()
    if ((Date.parse(new Date(data).toLocaleString())) < Date.parse(now.toLocaleString())) {
      return false
    }
    return true
  }

  setSubject(type: number, subject?: string) {
    if (this.std_id)
      this.exampaperService.setSubject(this.std_id, type, subject)
  }

  retrieveExam(): void {
    let id = localStorage.getItem("information")
    if (id) {
      this.exampaperService.getRegisterExamEntries(id)
        .subscribe((data) => {
          this.current = data.current
          this.recent = data.recent
          this.foundList = data._fl
          this.comprehensiveList = data._cl
          this.major = data.major
          this.englishResult = data._e
          this.comprehensiveResult = data._c
          this.foundResult = data._f
          this.politicsResult = data._p
          this.type = data.type
          this.user_c = data.u_c
          this.data = data.all
          for (let i = 0; i < this.major.length; i++) {
            if (this.major[i].type === 3) {
              this.submitForm1.setValue({ 'comprehensive': this.user_c ? this.user_c : '' })
            }
          }
        })
    }
  }
}
