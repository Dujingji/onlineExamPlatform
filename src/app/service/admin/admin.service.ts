import { feedback } from './../../admin/feedback/feedback.component';
import { major } from './../../../modules/major/major';
import { college } from './../../../modules/college/college';

import { Time } from '@angular/common';
import { exam, examEntries, examUpdateModel } from './../../../modules/exams/exam';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { Observable, Subject, finalize, tap } from 'rxjs';
import { PapersListComponent, paperUpdateMode, questionUpdateMode } from 'src/app/admin/exams/papers-list/papers-list.component';
import { className, userInfoSubmitModel } from 'src/app/admin/students/students.component';
import { classroom, classroomDetailModel } from 'src/modules/classroom/classroom';
import { Paper, paperEntries, questions } from 'src/modules/paper/paper';
import { student, studentExamsModel } from 'src/modules/student/student.module';
import { qType } from 'src/modules/questionType/type';
import { Teacher, classInfo } from 'src/modules/teacher/teacher';
import { teacherInfoSubmitModel } from 'src/app/admin/teacher/teacher.component';
import { exerciseModel } from 'src/modules/exercise/exercise';
import { exerciseSection } from 'src/app/admin/exercise/exercise-list/exercise-list.component';
import { exericseDetailModel } from 'src/modules/exercise/exercise-detail';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private submitExamStatus = false;

  private _examEntriesSubject = new Subject<void>();
  private _paperEntriesSubject = new Subject<void>();
  private _questionEntriesSubject = new Subject<void>();
  private _userEntriesSubject = new Subject<void>();
  private _classroomEntriesSubject = new Subject<void>();
  private _collegeEntriesSubject = new Subject<void>();
  private _majorEntriesSubject = new Subject<void>();
  private _teacherEntriesSubject = new Subject<void>();
  private _exerciseEntriesSubject = new Subject<void>();
  private _exerciseQEntriesSubject = new Subject<void>();
  private _exerciseSEntriesSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get exerciseEntriesSubject() {
    return this._exerciseEntriesSubject;
  }

  get exerciseSEntriesSubject() {
    return this._exerciseSEntriesSubject;
  }

  get exerciseQEntriesSubject() {
    return this._exerciseQEntriesSubject;
  }

  get collegeEntriesSubject() {
    return this._collegeEntriesSubject;
  }

  get majorEntriesSubject() {
    return this._majorEntriesSubject;
  }

  get classroomEntriesSubject() {
    return this._classroomEntriesSubject;
  }

  get paperEntriesSubject() {
    return this._paperEntriesSubject;
  }

  get examEntriesSubject() {
    return this._examEntriesSubject;
  }

  get questionntriesSubject() {
    return this._questionEntriesSubject;
  }

  get userEntriesSubject() {
    return this._userEntriesSubject;
  }

  get teacherEntriesSubject() {
    return this._teacherEntriesSubject;
  }

  setSubmitExamStatus(status: boolean) {
    this.submitExamStatus = status;
  }

  EndTime(): Observable<{}> {
    return this.http.post<{}>(
      'https://exam.gwxgt.com/exam-api/admin/end-time',
      {}
    )
  }

  answerModelCreate(): Observable<any> {
    return this.http.post<{}>(
      'https://exam.gwxgt.com/exam-api/admin/answer-model-create',
      {}
    )
  }

  examDetailExport(): Observable<any> {
    return this.http.get<{}>('https://exam.gwxgt.com/exam-api/admin/detail-export',
      {}
    )
  }

  getSubmitExamStatus() {
    return this.submitExamStatus;
  }

  getAllTeacherEntries(): Observable<{ data: Teacher[] }> {
    return this.http.get<{ data: Teacher[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-teachers')
  }

  getAllExamEntries(key: string, value: string): Observable<{ exams: exam[], paperName: string[] }> {
    return this.http.get<{ exams: exam[], paperName: string[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-exams', {
      params: new HttpParams().set('key', key).set('value', value)
    });
  }

  getAllPaperEntries(): Observable<paperEntries> {
    return this.http.get<paperEntries>('https://exam.gwxgt.com/exam-api/admin/get-all-papers');
  }

  getAllStudentEntries(page: number, perPage: number, type: number, condition: string): Observable<{ userInfos: student[], classInfo: className[], total: number }> {
    return this.http.get<{ userInfos: student[], classInfo: className[], total: number }>('https://exam.gwxgt.com/exam-api/admin/get-all-students',
      {
        params: new HttpParams().set('perPage', perPage).set('page', page).set('type', type).set('condition', condition)
      }
    );
  }

  getAllExerciseTitle(page: number, perPage: number, type: number, condition: string): Observable<{ data: exerciseModel[], total: number }> {
    return this.http.get<{ data: exerciseModel[], total: number }>('https://exam.gwxgt.com/exam-api/admin/get-all-exercise-title',
      {
        params: new HttpParams().set('perPage', perPage).set('page', page).set('type', type).set('condition', condition)
      }
    )
  }

  getAllExericiseSection(id: string): Observable<{ data: exerciseSection[] }> {
    return this.http.get<{ data: exerciseSection[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-exercise-section',
      { params: new HttpParams().set('id', id) }
    );
  }

  getAllClassroomEntries(): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-classrooms');
  }

  getAllCollegeEntries(): Observable<{ college: college[] }> {
    return this.http.get<{ college: college[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-colleges');
  }

  getAllMajorEntries(): Observable<{ major: major[], _f: string[] }> {
    return this.http.get<{ major: major[], _f: string[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-major');
  }

  getAllClassroomStudentDetail(id: string): Observable<{ classroomData: classroomDetailModel[] }> {
    return this.http.get<{ classroomData: classroomDetailModel[] }>('https://exam.gwxgt.com/exam-api/admin/get-classroom-detail', {
      params: new HttpParams().set('id', id),
    });
  }

  getAllExamsDetails(id: string): Observable<{ examInfos: studentExamsModel[] }> {
    return this.http.get<{ examInfos: studentExamsModel[] }>('https://exam.gwxgt.com/exam-api/admin/get-user-exams-detail', {
      params: new HttpParams().set('id', id),
    });
  }

  getAllQuestionsEntries(id: string): Observable<{ questions: questions[] }> {
    return this.http.get<{ questions: questions[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-questions', {
      params: new HttpParams().set('id', id),
    });
  }

  getAllExerciseQuestionsEntries(id: string): Observable<{ questions: questions[] }> {
    return this.http.get<{ questions: questions[] }>('https://exam.gwxgt.com/exam-api/admin/get-all-exercise-questions', {
      params: new HttpParams().set('id', id),
    });
  }

  getPaperView(id: string): Observable<{ paper: Paper }> {
    return this.http.get<{ paper: Paper }>('https://exam.gwxgt.com/exam-api/admin/paper-view', {
      params: new HttpParams().set('id', id)
    })
  }

  getFeedbackData(page: number, perPage: number): Observable<{ feedback: feedback[], total : number }> {
    return this.http.get<{ feedback: feedback[], total : number }>('https://exam.gwxgt.com/exam-api/admin/get-feedback',
    {
      params: new HttpParams().set('perPage', perPage).set('page', page)
    })

  }

  updateTeacherExam(teacher: string[], type: number, college: string, exam: string, classroom: string[]): Observable<{ exams: exam[] }> {
    const updateData = { teacher: teacher, college: college, exam: exam, classroom: classroom, type: type }
    return this.http.post<{ exams: exam[] }>(
      'https://exam.gwxgt.com/exam-api/admin/update-teacher-exam',
      {}
    )
      .pipe(
        tap(() => {
          this.teacherEntriesSubject.next();
        })
      );
  }

  updateExamStatus(): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(
      'https://exam.gwxgt.com/exam-api/admin/update-exam-status'
    )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }

  addCollege(data: college) {
    return this.http.post<{ status: boolean }>(
      'https://exam.gwxgt.com/exam-api/admin/add-college',
      data
    )
      .pipe(
        tap(() => {
          this.collegeEntriesSubject.next();
        })
      );
  }

  addMajor(data: major) {
    return this.http.post<{ status: boolean }>(
      'https://exam.gwxgt.com/exam-api/admin/add-major',
      data
    )
      .pipe(
        tap(() => {
          this.majorEntriesSubject.next();
        })
      );
  }

  addClassroom(data: classroom) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/add-classroom',
        data
      )
      .pipe(
        tap(() => {
          this.classroomEntriesSubject.next();
        })
      );
  }

  addTeacher(data: teacherInfoSubmitModel) {
    const userData = {
      username: data.username,
      password: data.password,
      information: {
        major: data.major,
        classroom: [],
      },
      account: "teacher",
    }
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/add-teacher',
        userData
      )
      .pipe(
        tap(() => {
          this.teacherEntriesSubject.next();
        })
      );
  }

  addUser(data: userInfoSubmitModel) {
    const userData = {
      username: data.username,
      password: data.password,
      information: {
        major: data.major,
        classroom: data.classroom,
        semester: data.semester,
        graduate: data.graduate,
        std_name: data.std_name
      },
      account: "student",
    }
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/add-user',
        userData
      )
      .pipe(
        tap(() => {
          this.userEntriesSubject.next();
        })
      );

  }

  addPaper(data: paperUpdateMode) {
    length = new qType().getTypeLength()
    const paperData: Paper = {
      paper: data.name,
      length: 0,
      n: new Array<number>(length).fill(0),
      exam_time: data.timer,
      section: [],
      questions: [],
      major: data.major,
    }

    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/add-paper',
        paperData
      )
      .pipe(
        tap(() => {
          this.paperEntriesSubject.next();
        })
      );
  }

  addQuestion(id: string, data: questions) {
    const questionData: questions = {
      question: data.question,
      selection: data.selection,
      mark: data.mark,
      comment: data.comment,
      type: data.type,
      answer: data.answer
    }

    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/add-question',
        { id: id, data: questionData }
      )
      .pipe(
        tap(() => {
          this.questionntriesSubject.next();
          this.paperEntriesSubject.next()
        })
      );
  }

  uploadPaper(file: FormData) {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/admin/upload-paper',
      file, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.paperEntriesSubject.next())
      );
  }

  uploadVocabulary(file: FormData){
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/admin/upload-vocabulary',
      file, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.paperEntriesSubject.next())
      );
  }

  uploadExc(file: FormData) {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/admin/upload-exc',
      file, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.exerciseEntriesSubject.next())
      );
  }

  uploadStudents(file: FormData) {
    return this.http.post<{ status: boolean }>('https://exam.gwxgt.com/exam-api/admin/upload-students',
      file, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => this.userEntriesSubject.next())
      );
  }

  downloadPaperTemp() {
    return this.http.get('https://exam.gwxgt.com/exam-api/admin/download/paper-template', { responseType: 'blob' })
  }

  downloadExerciseTemp() {
    return this.http.get('https://exam.gwxgt.com/exam-api/admin/download/exc-template', { responseType: 'blob' })
  }

  downloadstudentsTemp() {
    return this.http.get('https://exam.gwxgt.com/exam-api/admin/download/student-template', { responseType: 'blob' })
  }

  downloadClassroomData(id: string) {
    return this.http.get('https://exam.gwxgt.com/exam-api/admin/download/classroom-data', { params: new HttpParams().set('id', id), responseType: 'blob' })
  }

  postSubmitExam(description: string, major: string, date: Date, time: Time, paperId: string, isAuto: boolean) {
    const examData: submitExamModle = {
      description: description,
      major: major,
      date: date,
      paperId: paperId,
      member: [],
      status: 0,
      classroom: [],
      time: time,
      end: date,
      isAuto: isAuto
    };

    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/submit-exam',
        examData
      )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }

  deleteExam(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-exam',
        { id: id }
      )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }

  deleteQuestion(id: string, index: number) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-question',
        { id: id, index: index }
      )
      .pipe(
        tap(() => {
          this.paperEntriesSubject.next();
        })
      );
  }

  deleteExerciseQuestion(id: string, index: number) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-exercise-question',
        { id: id, index: index }
      )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }


  deleteTeacherClassroom(id: string, classroom: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-teacher-classroom',
        { id: id, data: classroom }
      )
      .pipe(
        tap(() => {
          this.teacherEntriesSubject.next();
        })
      );
  }

  deleteClassroomExam(id: string, examId: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-classroom-exam',
        { id: id, data: examId }
      )
      .pipe(
        tap(() => {
          this.classroomEntriesSubject.next();
        })
      );
  }

  deleteCollege(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-college',
        { id: id }
      )
      .pipe(
        tap(() => {
          this._collegeEntriesSubject.next();
        })
      );
  }

  deleteMajor(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-major',
        { id: id }
      )
      .pipe(
        tap(() => {
          this._majorEntriesSubject.next();
        })
      );
  }

  deleteClassroom(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-classroom',
        { id: id }
      )
      .pipe(
        tap(() => {
          this.classroomEntriesSubject.next();
        })
      );
  }

  deleteTeacherExam(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-teacher-exam',
        { id: id }
      )
      .pipe(
        tap(() => {
          this.teacherEntriesSubject.next();
        })
      );
  }

  deleteTeacher(id: string, classroom: string[]) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-teacher',
        { id: id, classroom: classroom }
      )
      .pipe(
        tap(() => {
          this.teacherEntriesSubject.next();
        })
      );
  }

  deleteUser(id: string, classroom: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-user',
        { id: id, classroom: classroom }
      )
      .pipe(
        tap(() => {
          this.userEntriesSubject.next();
        })
      );
  }

  deletePaper(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-paper',
        { id: id }
      )
      .pipe(
        tap(() => {
          this.paperEntriesSubject.next();
        })
      );
  }

  deleteExercise(id: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/delete-exercise',
        { id: id }
      )
      .pipe(
        tap(() => {
          this.exerciseEntriesSubject.next();
        })
      );
  }

  updateUser(id: string, updateData: userInfoSubmitModel) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-user',
        { id: id, data: updateData }
      )
      .pipe(
        tap(() => {
          this.userEntriesSubject.next();
        })
      );
  }

  updateTeacher(id: string, data: string, index: number, type: number) {
    if (type == 0) {
      return this.http
        .post<{ status: boolean }>(
          'https://exam.gwxgt.com/exam-api/admin/update-teacher-classroom',
          { id: id, classroom: data }
        )
        .pipe(
          tap(() => {
            this.teacherEntriesSubject.next();
          })
        );
    } else {
      return this.http
        .post<{ status: boolean }>(
          'https://exam.gwxgt.com/exam-api/admin/update-teacher-paper',
          { id: id, paper: data, i: index }
        )
        .pipe(
          tap(() => {
            this.teacherEntriesSubject.next();
          })
        );
    }

  }

  updateClassroom(id: string, updateData: classroom) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-class',
        { id: id, data: updateData, type: 1 }
      )
      .pipe(
        tap(() => {
          this.classroomEntriesSubject.next();
        })
      );
  }

  updateExam(id: string, updateData: examUpdateModel) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-exam',
        { id: id, data: updateData }
      )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }

  updatePaper(id: string, updateData: paperUpdateMode) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-paper-details',
        { id: id, data: updateData }
      )
      .pipe(
        tap(() => {
          this.paperEntriesSubject.next();
        })
      );
  }

  updateQuestion(id: string, index: string, updateData: questions) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-question',
        { id: id, index: index, data: updateData }
      )
      .pipe(
        tap(() => {
          this.questionntriesSubject.next();
        })
      );
  }

  updateExerciseQuestion(id: string, index: string, updateData: questions) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-exericse-question',
        { id: id, index: index, data: updateData }
      )
      .pipe(
        tap(() => {
          this.exerciseQEntriesSubject.next();
        })
      );
  }

  updatePaperId(id: string, paperId: string) {
    return this.http
      .post<{ status: boolean }>(
        'https://exam.gwxgt.com/exam-api/admin/update-paperId',
        { id: id, PaperId: paperId }
      )
      .pipe(
        tap(() => {
          this.examEntriesSubject.next();
        })
      );
  }

  exportExerciseData(id: string) {
    return this.http.get('https://exam.gwxgt.com/exam-api/admin/download/M_exercise-data', { params: new HttpParams().set('id', id), responseType: 'blob' })
  }
}

export interface teacherDate {
  teacher: Teacher
}

export interface submitExamModle {
  description: string;
  major: string;
  paperId: string;
  date: Date;
  status: number;
  member: string[];
  classroom: string[];
  time: Time;
  end: Date,
  isAuto: boolean
}
