import { result } from './../../../modules/user/user';
import { submitModle } from 'src/modules/exams/submit';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, first, map, tap, throwError } from 'rxjs';
import { paperModel } from 'src/modules/paper/paper';
import { exam, examEntries, examEntriesA } from 'src/modules/exams/exam';
import { userInfo } from 'src/modules/user/user';
import { answerModel } from 'src/app/public/pages/exam-page/exam-paper/exam-paper.component';
import { major } from 'src/modules/major/major';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamPaperService {

  constructor(private http: HttpClient) { }

  public examEntries: exam[] = []
  private _examSubject = new Subject<void>();
  private _examOninitSubject = new Subject<void>();
  public examStatus = false

  get examSubject() {
    return this._examSubject
  }

  get examOnInitSubject() {
    return this._examOninitSubject
  }

  getUserInformation(userInfo_id: string): Observable<{ userInfo: userInfo }> {
    return this.http.get<{ userInfo: userInfo }>(environment.apiUrl + 'exam/get-user', {
      params: new HttpParams().set('info_id', userInfo_id)
    })
  }

  getGuestInformation(): Observable<{ userInfo: userInfo }> {
    return this.http.get<{ userInfo: userInfo }>(environment.apiUrl + 'united/get-user', {
      params: new HttpParams()
    })
  }

  getStudentInformation(userInfo_id: string): Observable<{ major: string, college: string, EID: string }> {
    return this.http.get<{ major: string, college: string, EID: string }>(environment.apiUrl + 'exam/get-student-detail', {
      params: new HttpParams().set('info_id', userInfo_id)
    })
  }

  getUserAnswer(userInfo_id: string, paper_id: string, exam_id: string): Observable<{ answer: result }> {
    return this.http.get<{ answer: result }>(environment.apiUrl + 'exam/get-user-answer', {
      params: new HttpParams().set('info_id', userInfo_id).set('paper_id', paper_id).set('exam_id', exam_id)
    })
  }

  getExamDetailInfo(exam_id: string): Observable<{ detail: exam, total: number, cost: number, finished: boolean }> {
    return this.http.get<{ detail: exam, total: number, cost: number, finished: boolean }>(environment.apiUrl + 'exam/get-exam-detail-info', {
      params: new HttpParams().set('exam_id', exam_id)
    })
  }

  getRegisterExamEntries(id: string): Observable<{
    current: exam[], _e: exam[], _p: exam[], recent: exam[], all: exam[][],
    _f: exam[], _c: exam[], major: major[], type: number, _fl: major[], _cl: major[], u_c?: string, finished: string[]
  }> {
    return this.http.get<{
      current: exam[], _e: exam[], _p: exam[], recent: exam[], all: exam[][],
      _f: exam[], _c: exam[], major: major[], type: number, _fl: major[], _cl: major[], u_c?: string, finished: string[]
    }>(environment.apiUrl + 'exam/get-register-exam', {
      params: new HttpParams().set('id', id)
    })
  }

  getResultExamEntries(id: string): Observable<{
    current: resultInfo[], _e: resultInfo[], _p: resultInfo[],
    _f: resultInfo[], _c: resultInfo[], major: major[], type: number
  }> {
    return this.http.get<{
      current: resultInfo[], _e: resultInfo[], _p: resultInfo[], _f: resultInfo[],
      _c: resultInfo[], major: major[], type: number
    }>(environment.apiUrl + 'exam/get-result-exam', {
      params: new HttpParams().set('id', id)
    })
  }

  getPaperEntry(id: string, std_id: string): Observable<paperModel> {
    return this.http.get<paperModel>(environment.apiUrl + 'exam/get-paper', {
      params: new HttpParams().set('id', id).set('std_id', std_id)
    })
      .pipe(
        tap(() => {
          this.examOnInitSubject.next()
        })
      );
  }

  getExamEntries(id: string): Observable<examEntriesA> {
    return this.http.get<examEntriesA>(environment.apiUrl + 'exam/get-exam', {
      params: new HttpParams().set('id', id)
    })
  }

  getStudentEntries(): Observable<any> {
    return this.http.get<any>('https://jc.bodaoedu.com/api/api.php', {
      params: new HttpParams().set('limit', 50000).set('grade', '').set('school_id', '')
    })
  }

  autoSubmit(userInfo: string, exam_id: string, paperId: string, result: answerModel, length: number, index: number) {
    const examData = { id: userInfo, exam_id: exam_id, paperId: paperId, result: result, length: length, index: index };
    this.http.post<{ status: boolean }>(environment.apiUrl + 'exam/auto-submit/', examData)
      .subscribe(res => {
        this.examStatus = res.status;
      })
  }

  submitPaper(userInfo: string, exam_id: string, paperId: string, result: answerModel[], mark: number, marker: string, status: number) {
    this.examStatus = false
    const examData: submitModle = { id: userInfo, exam_id: exam_id, paperId: paperId, results: result, mark: mark, marker: marker, status: status };
    this.http.post<{ status: boolean }>(environment.apiUrl + 'exam/submit/', examData)
      .pipe(first())
      .pipe(catchError(this.handleError))
      .subscribe(res => {
        this.examStatus = res.status;
      })
  }

  setSubject(userInfo: string, type: number, subject?: string) {
    const examData: any = { id: userInfo, type: type, subject: subject };
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'exam/set-subject/', examData)
      .pipe(first())
      .pipe(
        tap(() => {
          this.examSubject.next()
        })
      ).subscribe()
  }

  updateRegister(user_id: string, exam_id: string, type: number) {
    return this.http
      .post<{ status: boolean }>(
        environment.apiUrl + 'exam/update-exam',
        { user: user_id, exam: exam_id, type: type }
      )
      .pipe(
        tap(() => {
          this.examSubject.next()
        })
      );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(error.error.message);
      alert(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `异常代码： ${error.status}, 信息: `, error.error);
      alert(error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() =>
      new Error('上传试卷失败')
    );
  }

}

export interface studentInfo {
  school_name: string
  st_name: string
  grade: string
  type: string
  graduate: string
}

export interface resultInfo {
  exams: exam
  exam_status: number
  total: number
  std_mark: number,
  major: string
}
