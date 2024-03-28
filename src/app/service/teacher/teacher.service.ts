import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, first, tap } from "rxjs";
import { TeacherStudentInfo } from "src/app/teacher/student-list/student-list.component";
import { paperModel } from "src/modules/paper/paper";
import { Teacher } from "src/modules/teacher/teacher";
import { result } from "src/modules/user/user";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private _teacherubject = new Subject<void>();
  private _examStatusSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get teacherSubject() {
    return this._teacherubject
  }

  get examStatusSubject() {
    return this._examStatusSubject
  }

  getTeacherInformation(userInfo_id: string): Observable<{ userInfo: Teacher }> {
    return this.http.get<{ userInfo: Teacher }>('https://exam.gwxgt.com/exam-api/teacher/get-teacher-info', {
      params: new HttpParams().set('info_id', userInfo_id)
    })
  }

  getReminderList(userInfo_id: string, std_id : string, exam_id : string)
    : Observable<{ reminder: number, next: {std_id : string, exam_id : string} }> {
      return this.http.get<{ reminder: number, next: {std_id : string, exam_id : string} }>('https://exam.gwxgt.com/exam-api/teacher/get-reminder-list', {
        params: new HttpParams().set('info_id', userInfo_id).set('std_id', std_id).set('exam_id', exam_id)
      })
  }

  getStudentInfo(userInfo_id: string, page: number, perPage: number, type: number, condition: string)
    : Observable<{ userInfo: TeacherStudentInfo[], total: number }> {
    return this.http.get<{ userInfo: TeacherStudentInfo[], total: number }>('https://exam.gwxgt.com/exam-api/teacher/get-student-list', {
      params: new HttpParams().set('info_id', userInfo_id).set('perPage', perPage).set('page', page).set('type', type).set('condition', condition)
    })
  }

  getUserAnswer(std_id: string, paper_id: string, exam_id: string): Observable<{ answer: result, std_name: string, exam_status: number, college: string }> {
    return this.http.get<{ answer: result, std_name: string, exam_status: number, college: string }>('https://exam.gwxgt.com/exam-api/teacher/get-user-answer', {
      params: new HttpParams().set('std_id', std_id).set('paper_id', paper_id).set('exam_id', exam_id)
    })
  }

  getPaperEntry(exam_id: string): Observable<paperModel> {
    return this.http.get<paperModel>('https://exam.gwxgt.com/exam-api/teacher/get-paper', {
      params: new HttpParams().set('id', exam_id)
    })
  }

  postChangeMarkForStudent(std_id: string, exam_id: string, index: number, mark: number, type: number): Observable<{ status: boolean }> {
    const submitData = { std_id: std_id, exam_id: exam_id, index: index, mark: mark, type: type }
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/teacher/change-mark', submitData)
      .pipe(
        tap(() => {
          this.teacherSubject.next()
        })
      );
  }

  submitStudentMark(std_id: string, exam_id: string, name: string) {
    const submitData = { std_id: std_id, exam_id: exam_id, status: 2, teacher_name: name }
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/teacher/submit-mark', submitData)
      .pipe(
        tap(() => {
          this.teacherSubject.next()
        })
      );
  }

  changeExamStatus(std_id: string, exam_id: string) {
    const submitData = { std_id: std_id, exam_id: exam_id, status: 1, teacher_name: '' }
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/teacher/submit-mark', submitData)
      .pipe(
        tap(() => {
          this.teacherSubject.next()
        })
      );
  }
}
