import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, first, tap } from 'rxjs';
import { exerciseModel } from 'src/modules/exercise/exercise';
import { exericseDetailModel } from 'src/modules/exercise/exercise-detail';
import { major } from 'src/modules/major/major';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private status: boolean = false
  private _majorEntriesSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get majorEntriesSubject() {
    return this._majorEntriesSubject;
  }

  getExerciseInformation(userInfo: string): Observable<exerciseRevice> {
    return this.http.get<exerciseRevice>('https://exam.gwxgt.com/exam-api/exercise/get-exercises', {
      params: new HttpParams().set('info_id', userInfo)
    })
  }

  getExerciseData(exc_id: string, exc_d_id: string): Observable<exerciseDataModel> {
    return this.http.get<exerciseDataModel>('https://exam.gwxgt.com/exam-api/exercise/get-exercise-detail', {
      params: new HttpParams().set('exc_id', exc_id).set('exc_d_id', exc_d_id)
    })
  }

  getExercisePaperData(exc_d_id: string): Observable<exercisePaperModel> {
    return this.http.get<exercisePaperModel>('https://exam.gwxgt.com/exam-api/exercise/get-exercise-paper', {
      params: new HttpParams().set('exc_d_id', exc_d_id)
    })
  }

  getExercisePaperDataTest(exc_d_id: string): Observable<exercisePaperModel> {
    return this.http.get<exercisePaperModel>('https://exam.gwxgt.com/exam-api/exercise/get-exercise-paper-test', {
      params: new HttpParams().set('exc_d_id', exc_d_id)
    })
  }

  getUserExerciseAnsewer(info_id: string, exc_id: string, exc_d_id: string): Observable<exerciseUserAnswerModel> {
    return this.http.get<exerciseUserAnswerModel>('https://exam.gwxgt.com/exam-api/exercise/get-user-exercise-answer', {
      params: new HttpParams().set('exc_d_id', exc_d_id).set('exc_id', exc_id).set('info_id', info_id)
    })
  }

  autoSubmit(userInfo: string, exc_id: string, exc_d_id: string, result: exerciseAnswerModel, length: number, index: number, compeleted: number) {
    const examData = { id: userInfo, exc_id: exc_id, exc_d_id: exc_d_id, result: result, length: length, index: index, compeleted: compeleted };
    this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/auto-submit/', examData)
      .subscribe(res => {

      })
  }

  getLastSection(userInfo: string, exc_id: string): Observable<{ index: number }> {
    return this.http.get<{ index: number }>('https://exam.gwxgt.com/exam-api/exercise/get-last-section', {
      params: new HttpParams().set('info_id', userInfo).set('exc_id', exc_id)
    })
  }

  setSubject(userInfo: string, type: number, subject: string) {
    const examData: any = { id: userInfo, type: type, subject: subject };
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/set-subject/', examData)
      .pipe(first())
      .pipe(
        tap(() => {
          this.majorEntriesSubject.next()
        })
      ).subscribe()
  }

  submitData(userInfo: string, exc_id: string, exc_d_id: string, result: exerciseAnswerModel[], index: number, compeleted: number) {
    const examData: any = { id: userInfo, exc_id: exc_id, exc_d_id: exc_d_id, results: result, index: index, compeleted: compeleted };
    this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/submit/', examData)
      .pipe(first())
      .subscribe(res => {
        this.status = res.status
      })
  }

  remark(userInfo: string, model_Id: string, exc_id: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/remark/', { id: userInfo, model_Id: model_Id, exc_id: exc_id })
  }

  setLastSection(userInfo: string, exc_id: string, section: number) {
    this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/set-last-section/', { info_id: userInfo, exc_id: exc_id, section: section })
      .pipe(first())
      .subscribe(res => {

      })
  }

  postFeedBack(exc_id: string, exc_d_id: string, index: number, user_id: string, feedback: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/exercise/feedback',
      { exc_id: exc_id, exc_d_id: exc_d_id, index: index, user_id: user_id, feedback: feedback })
  }
}

export interface exerciseRevice {
  e_: exerciseModel[],
  p_: exerciseModel[],
  f_: exerciseModel[],
  c_: exerciseModel[],
  major: string[],
  type: number,
  _fl: major[],
  _cl: major[]
}

export interface exerciseDataModel {
  exc_info: exerciseModel
  exc_d_info: exericseDetailModel
  exc_d_id: string
}

export interface exercisePaperModel {
  exc_d_info: exericseDetailModel
  start_i : number,
  end_i : number
}

export interface exerciseUserAnswerModel {
  answer: exerciseAnswerModel[]
  user_id: string
  compeleted: number
  last_question: number
}

export interface exerciseAnswerModel {
  value: string
  multValue: number,
  mark: number,
  status: number
}
