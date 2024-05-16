import { studentExerciseData } from './../../college/student-exercise-list/student-exercise-list.component';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, tap } from "rxjs";
import { option, studentAccountInfo } from "src/app/college/college-home-page/college-home-page.component";
import { submitClassroomData, submitDataModel, unitedExamClassroomInfo, unitedExamInfo } from 'src/app/college/exams-list/exams-list.component';
import { stduentVocabualryData } from "src/app/college/student-vocabulary-list/student-vocabulary-list.component";
import { unitedRegisterUserInfo } from 'src/app/college/united-register/united-register.component';
import { unitedPaper } from 'src/app/public/pages/united/united-register/united-user-paper/united-user-paper.component';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: "root" })
export class CollegesService {

  private college_id: string = '';
  public college_name: string = '';

  private _change_exam_id: string = ''

  public exam_data?: unitedExamInfo
  public classroom_data?: unitedExamClassroomInfo

  public change_subject_data?: unitedRegisterUserInfo


  set change_exam_id(data: string) {
    this._change_exam_id = data
  }

  get change_exam_id() {
    return this._change_exam_id
  }

  private _examEntriesSubject = new Subject<void>();
  private _unitedExamPaperEntriesSubject = new Subject<void>();

  get unitedExamPaperEntriesSubject() {
    return this._unitedExamPaperEntriesSubject
  }

  set c_id(data: string) {
    this.college_id = data;
  }

  get collegeName(): string {
    return this.college_name
  }

  set collegeName(data: string) {
    this.collegeName = data
  }

  get examEntriesSubject() {
    return this._examEntriesSubject;
  }

  constructor(private http: HttpClient, private router: Router) { }

  getAllStudentInfoData(college_id: string, pageSize: number, pageIndex: number): Observable<{ data: studentAccountInfo[], total: number }> {
    return this.http.get<{ data: studentAccountInfo[], total: number }>(environment.apiUrl + 'college/get-all-student-info', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getCollegeName(college_id: string): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(environment.apiUrl + 'college/get-college-name', {
      params: new HttpParams().set('college_id', college_id)
    })
  }

  getAllStudentExerciseData(college_id: string, pageSize: number, pageIndex: number): Observable<{ data: studentExerciseData[], total: number }> {
    return this.http.get<{ data: studentExerciseData[], total: number }>(environment.apiUrl + 'college/get-all-student-exercise', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllStudentDailyData(college_id: string, pageSize: number, pageIndex: number): Observable<{ data: studentExerciseData[], total: number }> {
    return this.http.get<{ data: studentExerciseData[], total: number }>(environment.apiUrl + 'college/暂定', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllStudentVocabularyData(college_id: string, pageSize: number, pageIndex: number): Observable<{ data: stduentVocabualryData[], total: number }> {
    return this.http.get<{ data: stduentVocabualryData[], total: number }>(environment.apiUrl + 'college/get-all-student-vocabulary', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllMajor(): Observable<{ _c: option[], _f: option[] }> {
    return this.http.get<{ _c: option[], _f: option[] }>(environment.apiUrl + 'college/get-all-major')
  }

  fetchAllUntiedExam(pageSize: number, pageIndex: number, college_id: string): Observable<{ data: unitedExamInfo[], total: number }> {
    return this.http.get<{ data: unitedExamInfo[], total: number }>(environment.apiUrl + '/college/get-all-united-exam', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getMajorList(): Observable<{ data: option[] }> {
    return this.http.get<{ data: option[] }>(environment.apiUrl + '/college/get-major-list');
  }

  getSearchStudentVocabularyData(college_id: string, pageSize: number, pageIndex: number, searchQuery: searchQuery, condition: string): Observable<{ data: stduentVocabualryData[], total: number }> {
    let data: sendData = { college_id: college_id, pageSize: pageSize, pageIndex: pageIndex, searchQuery: searchQuery, condition: condition }
    return this.http.post<{ data: stduentVocabualryData[], total: number }>(environment.apiUrl + 'college/get-search-student-vocabulary-data', data);
  }

  getSearchStudentInfoData(college_id: string, pageSize: number, pageIndex: number, searchQuery: searchQuery, condition: string): Observable<{ data: studentAccountInfo[], total: number }> {
    let data: sendData = { college_id: college_id, pageSize: pageSize, pageIndex: pageIndex, searchQuery: searchQuery, condition: condition }
    return this.http.post<{ data: studentAccountInfo[], total: number }>(environment.apiUrl + 'college/get-search-student-info-data', data);
  }

  getSearchUnitedRegisterInfo(pageSize: number, pageIndex: number, searchQuery: searchQuery, condition: string): Observable<{ data: unitedRegisterUserInfo[], total: number }> {
    let data: sendData = { college_id: '', pageSize: pageSize, pageIndex: pageIndex, searchQuery: searchQuery, condition: condition }
    return this.http.post<{ data: unitedRegisterUserInfo[], total: number }>(environment.apiUrl + 'college/get-search-united-register-info-data', data);
  }

  getSearchExerciseInfoData(college_id: string, pageSize: number, pageIndex: number, searchQuery: searchQuery, condition: string): Observable<{ data: studentExerciseData[], total: number }> {
    let data: sendData = { college_id: college_id, pageSize: pageSize, pageIndex: pageIndex, searchQuery: searchQuery, condition: condition }
    return this.http.post<{ data: studentExerciseData[], total: number }>(environment.apiUrl + 'college/get-search-student-exercise-info-data', data)
  }

  createUnitedExam(data: submitDataModel): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'college/create-united-exam', data)
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  createUnitedExamClassroom(data: submitClassroomData): Observable<{ status: boolean, message: string }> {
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/create-united-exam-classroom', data)
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  fetchExamClassroomInfo(college_id: string, exam_id: string): Observable<{ data: unitedExamClassroomInfo[] }> {
    return this.http.post<{ data: unitedExamClassroomInfo[] }>(environment.apiUrl + 'college/fetch-united-exam-classroom', { college_id: college_id, exam_id: exam_id })
  }

  editUnitedExam(data: submitDataModel, exam_id: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'college/edit-united-exam', { data: data, exam_id: exam_id })
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  editUnitedExamClassroom(data: submitClassroomData, classroom_id: string): Observable<{ status: boolean, message: string }> {
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/edit-united-exam-classroom', { data: data, classroom_id: classroom_id })
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  deletedUnitedExam(exam_id: string, condition: number, exam_id_list: string[]): Observable<{ status: boolean, message: string }> {
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/delete-united-exam', { exam_id: exam_id, condition: condition, exam_id_list: exam_id_list })
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  deletedUnitedExamClassroom(classroom_id: string): Observable<{ status: boolean, message: string }> {
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/delete-united-exam-classroom', { classroom_id: classroom_id })
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  autoAssignMember(exam_id: string): Observable<{ status: boolean, message: string }> {
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/auto-assign-member', { exam_id: exam_id })
      .pipe(tap(() => {
        this.examEntriesSubject.next()
      }))
  }

  getUnitedRegisterInfo(pageIndex: number, pageSize: number): Observable<{ data: unitedRegisterUserInfo[], total: number }> {
    return this.http.get<{ data: unitedRegisterUserInfo[], total: number }>(environment.apiUrl + 'college/get-register-info', {
      params: new HttpParams().set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  validateAccount(std_id: string, condition: number, std_id_list: string[], cancel: boolean): Observable<{ status: boolean }> {
    const submit = { std_id: std_id, condition: condition, std_id_list: std_id_list, cancel: cancel }
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'college/validate-status', submit)
      .pipe(tap(() => {
        this.unitedExamPaperEntriesSubject.next()
      }))
  }

  changeSubject(id: string, _f: string | null, _c: string | null): Observable<{ status: boolean, message: string }> {
    const submit = { id: id, _f: _f, _c: _c }
    return this.http.post<{ status: boolean, message: string }>(environment.apiUrl + 'college/change-united-subject', submit)
      .pipe(tap(() => {
        this.unitedExamPaperEntriesSubject.next()
      }))
  }

  getAllStudentsUnitedInfo(college_id : string): Observable<{ data: unitedPaper[] }> {
    return this.http.get<{ data: unitedPaper[] }>(environment.apiUrl + 'college/get-all-students-united-info', {
      params : new HttpParams().set('college_id', college_id)
    })
  }
}

interface searchQuery {
  username?: string,
  grade?: string,
  _f?: string[],
  _c?: string[],
  accruate?: boolean,
  completed?: number[],
  paid?: number,
  name?: string,
  role?: string
}

interface sendData {
  college_id: string,
  pageSize: number,
  pageIndex: number,
  searchQuery: searchQuery,
  condition: string
}
