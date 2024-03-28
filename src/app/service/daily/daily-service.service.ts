import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, first, tap } from 'rxjs';
import { answerModel } from 'src/app/public/pages/exam-page/exam-paper/exam-paper.component';
import { dailyModel } from 'src/modules/daily/daily';
import { exam } from 'src/modules/exams/exam';


@Injectable({
  providedIn: 'root'
})
export class DailyService {

  private _dailySubject = new Subject<void>();
  private studied: number = -1;
  private length: number = 10;
  private words: cardModle[] = []
  private allFlip: boolean = true
  private current_flip: number = 0
  private v_calender_current_month: number = 0

  constructor(private http: HttpClient) { }

  get current_c() {
    return this.current_flip
  }

  set current_c(o: number) {
    this.current_flip = o
  }

  get v_allFlip(): boolean {
    return this.allFlip
  }

  set s_allFlip(o: boolean) {
    this.allFlip = o
  }

  get v_words() {
    return this.words
  }

  get dailySubject() {
    return this._dailySubject
  }

  set v_words(o: cardModle[]) {
    this.words = o
  }

  set v_studied(o: number) {
    this.studied = o
  }

  set v_length(o: number) {
    this.length = o
  }

  get v_studied(): number {
    return this.studied
  }

  get v_length(): number {
    return this.length
  }

  getDailyInformation(userInfo: string): Observable<{ data: dailyDataModel }> {
    return this.http.get<{ data: dailyDataModel }>('https://exam.gwxgt.com/exam-api/daily/get-daily-info', {
      params: new HttpParams().set('info_id', userInfo)
    })
  }

  getPaperEntry(std_id: string, year: number, month: number, day: number, major: string): Observable<{ daily: dailyModel }> {
    return this.http.get<{ daily: dailyModel }>('https://exam.gwxgt.com/exam-api/daily/get-daily-paper', {
      params: new HttpParams().set('info_id', std_id).set('year', year).set('month', month).set('day', day).set('major', major)
    })
  }

  getMajorList(std_id: string, year: number, month: number, day: number): Observable<{ major: string[] }> {
    return this.http.get<{ major: string[] }>('https://exam.gwxgt.com/exam-api/daily/get-daily-major', {
      params: new HttpParams().set('info_id', std_id).set('year', year).set('month', month).set('day', day)
    })
  }

  getVocabularyData(std_id: string): Observable<{ data: VD }> {
    return this.http.get<{ data: VD }>('https://exam.gwxgt.com/exam-api/daily/get-vocabulary', {
      params: new HttpParams().set('id', std_id)
    })
  }

  postNextGroup(std_id: string): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/daily/next-group', { std_id: std_id })
  }

  submitDailyPaper(std_id: string, year: number, month: number, day: number, major: string, status: number, answers: answerModel[]): Observable<{ status: boolean }> {
    const updateDate = { info_id: std_id, year: year, month: month, day: day, major: major, answers: answers, status: status }
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/daily/save-daily-data', updateDate)
  }

  getVocabularyDetail(v: string): Observable<{ data: vocabularyModel }> {
    return this.http.get<{ data: vocabularyModel }>('https://exam.gwxgt.com/exam-api/daily/get-vocabulary-detail', {
      params: new HttpParams().set('word', v)
    })
  }

  postPerformance(std: string, p: number): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/daily/change-v-performance', { std_id: std, performance: p })
  }

  postStudiedData(std_id: string, status: number): Observable<{ status: boolean }> {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/daily/next-vocabulary', { std_id: std_id, status: status })
  }

  playAudio(text: string) {
    return this.http.get('https://exam.gwxgt.com/exam-api/audio/' + text + '.mp3', {
      responseType: 'blob'
    })
  }

  getFetchCheckDate(std: string): Observable<{ data: number[] }> {
    return this.http.get<{ data: number[] }>('https://exam.gwxgt.com/exam-api/daily/get-vocabulary-checked-date', {
      params: new HttpParams().set('std_id', std)
    })
  }

  reStudy(std_id: string): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>('https://exam.gwxgt.com/exam-api/daily/vocabulary-restudy', {
      params: new HttpParams().set('id', std_id)
    })
  }

  getUserVocabularyData(std: string): Observable<{ data: userPerformance }> {
    return this.http.get<{ data: userPerformance }>('https://exam.gwxgt.com/exam-api/daily/user-vocabulary-performance', {
      params: new HttpParams().set('std_id', std)
    })
  }
}

export interface dailyDataModel {
  exam_data: Array<{ Index: number, exam_id: string, exam: exam, mark: number }>
  daily_data: Array<{ Index: number, daily_id: string, daily: dailyModel }>
  total: number
  continue: number
}

export interface VD {
  length: number,
  index: number,
  current: vocabularyModel,
  words: cardModle[]
}

export interface cardModle {
  vocabulary: string,
  v_mean: string[],
  flip: boolean,
  v_type: string[],
  symbol: string
}

export interface vocabularyModel {
  vocabulary: string;
  v_type: string[];
  voice: string;
  v_mean: string[];
  prefix: string;
  suffix: string;
  p_symbol: string;
  exchange: string[];
  sentences: sentences[];
}

export interface sentences {
  cn: string,
  en: string
}

export interface userPerformance {
  v_t: number,
  performance: number,
  v_s: number,
  t_d: number,
  c_d: number,
}
