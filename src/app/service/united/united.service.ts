import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { unitedExamInfo } from 'src/app/college/exams-list/exams-list.component';
import { MajorOption } from 'src/app/public/pages/united/united-register/united-register-info/united-register-info.component';
import { unitedPaper } from 'src/app/public/pages/united/united-register/united-user-paper/united-user-paper.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitedService {

  public step: number = 0
  private _baseInfoEntriesSubject = new Subject<void>();
  private _statusEntriesSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get baseInfoEntriesSubjct() {
    return this._baseInfoEntriesSubject
  }

  get _statusEntriesSubjct() {
    return this._statusEntriesSubject
  }

  agreement(): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(environment.apiUrl + 'united/agreement')
  }

  getUserStep(): Observable<{ current: number, step: number }> {
    return this.http.get<{ current: number, step: number }>(environment.apiUrl + 'united/user-step')
  }

  changePaidStatus(): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(environment.apiUrl + 'united/paid-step')
  }

  fetchAllUserInfo(std_id: string): Observable<{ data: unitedUserInfo }> {
    return this.http.get<{ data: unitedUserInfo }>(environment.apiUrl + 'united/get-info', {
      params: new HttpParams().set('user_id', std_id)
    })
  }

  fetchAllMajorList(): Observable<{ _found: MajorOption[], _compre: MajorOption[] }> {
    return this.http.get<{ _found: MajorOption[], _compre: MajorOption[] }>(environment.apiUrl + 'united/get-major-list')
  }

  fetchUserBaseInfo(std_id: string): Observable<userBaseInfo> {
    return this.http.get<userBaseInfo>(environment.apiUrl + 'united/get-base-info', {
      params: new HttpParams().set('user_id', std_id)
    })
  }

  onSubmitBaseInfo(data: userBaseInfo): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'united/submit-base-info', data)
  }

  onSaveBaseInfo(data: userBaseInfo): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'united/save-base-info', data).pipe(tap(() => {
      this.baseInfoEntriesSubjct.next()
    }))
  }

  onSubmitSubjectInfo(data: { _f: string, _c: string }): Observable<{ status: boolean, current: number }> {
    return this.http.post<{ status: boolean, current: number }>(environment.apiUrl + 'united/submit-subjext-info', data)
  }

  onSaveSubjectInfo(data: { _f: string, _c: string }): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>(environment.apiUrl + 'united/save-subjext-info', data)
  }

  getResult(): Observable<{ able: boolean, subject: number, _f : string, _c : string }> {
    return this.http.get<{ able: boolean, subject: number,  _f : string, _c : string }>(environment.apiUrl + 'united/get-result-info')
  }

  notPaid() : Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(environment.apiUrl + 'united/not-paid')
  }

  getUnitedPaper() : Observable<{data : unitedPaper}>{
    return this.http.get<{ data : unitedPaper }>(environment.apiUrl + 'united/get-united-paper')
  }

}

export interface unitedUserInfo {
  phone_number: string,
  ID: string,
  gerden: number,
  found: string,
  comphensive: string,
  image_pic: string,
  college: string,
  std_name: string,
  status: number,
  pay_statement: string
}

export interface userBaseInfo {
  ID: string,
  phone_number: string,
  college: string,
  name: string,
  grade: string,
  gerden: string,
  image_url: string
}
