import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { studentAccountInfo } from "src/app/college/college-home-page/college-home-page.component";


@Injectable({ providedIn: "root" })
export class CollegesService {

  private college_id: string = '';

  set c_id(data: string) {
    this.college_id = data;
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

}
