import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { option, studentAccountInfo } from "src/app/college/college-home-page/college-home-page.component";
import { studentExerciseData } from "src/app/college/student-exercise-list/student-exercise-list.component";
import { stduentVocabualryData } from "src/app/college/student-vocabulary-list/student-vocabulary-list.component";


@Injectable({ providedIn: "root" })
export class CollegesService {

  private college_id: string = '';
  public college_name : string = '';

  set c_id(data: string) {
    this.college_id = data;
  }

  get collegeName() : string{
    return this.college_name
  }

  set collegeName(data : string) {
    this.collegeName = data
  }

  constructor(private http: HttpClient, private router: Router) { }

  getAllStudentInfoData(college_id : string, pageSize: number, pageIndex : number): Observable<{ data: studentAccountInfo[], total: number }> {
    return this.http.get<{ data: studentAccountInfo[], total : number }>('https://exam.gwxgt.com/exam-api/college/get-all-student-info', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getCollegeName(college_id : string):  Observable<{ data: string }> {
    return this.http.get<{ data: string}>('https://exam.gwxgt.com/exam-api/college/get-college-name', {
      params: new HttpParams().set('college_id', college_id)
    })
  }

  getAllStudentExerciseData(college_id : string, pageSize : number, pageIndex: number) : Observable<{ data : studentExerciseData[], total: number}> {
    return this.http.get<{data : studentExerciseData[], total: number}>('https://exam.gwxgt.com/exam-api/college/get-all-student-exercise', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllStudentDailyData(college_id : string, pageSize : number, pageIndex: number) : Observable<{ data : studentExerciseData[], total: number}> {
    return this.http.get<{data : studentExerciseData[], total: number}>('https://exam.gwxgt.com/exam-api/college/暂定', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllStudentVocabularyData(college_id : string, pageSize: number, pageIndex: number) : Observable<{data : stduentVocabualryData[], total: number}>{
    return this.http.get<{data : stduentVocabualryData[], total: number}>('https://exam.gwxgt.com/exam-api/college/get-all-student-vocabulary', {
      params: new HttpParams().set('college_id', college_id).set('pageSize', pageSize).set('pageIndex', pageIndex)
    })
  }

  getAllMajor() : Observable<{ _c : option[] , _f : option[]}>{
    return this.http.get<{ _c : option[] , _f : option[]}>('https://exam.gwxgt.com/exam-api/college/get-all-major')
  }

  getSearchStudentVocabularyData(college_id : string, pageSize: number, pageIndex: number, searchQuery : searchQuery, condition : string): Observable<{data : stduentVocabualryData[], total: number}>{
    let data : sendData = { college_id : college_id, pageSize : pageSize, pageIndex : pageIndex, searchQuery : searchQuery, condition : condition}
    return this.http.post<{data : stduentVocabualryData[], total: number}>('https://exam.gwxgt.com/exam-api/college/get-search-student-vocabulary-data', data);
  }

  getSearchStudentInfoData(college_id : string, pageSize: number, pageIndex: number, searchQuery : searchQuery, condition : string): Observable<{data : studentAccountInfo[], total: number}>{
    let data : sendData = { college_id : college_id, pageSize : pageSize, pageIndex : pageIndex, searchQuery : searchQuery, condition : condition}
    return this.http.post<{data : studentAccountInfo[], total: number}>('https://exam.gwxgt.com/exam-api/college/get-search-student-info-data', data);
  }

}

interface searchQuery{
  username? : string,
  grade? : string,
  _f? : string[],
  _c? : string[]
}

interface sendData{
  college_id : string,
  pageSize : number,
  pageIndex : number,
  searchQuery : searchQuery,
  condition : string
}
