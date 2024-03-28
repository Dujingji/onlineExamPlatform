import { answerModel } from "src/app/public/pages/exam-page/exam-paper/exam-paper.component"

export interface user{
  username : string,
  password : string,
  information : string,
  account : string,
}

export interface userInfo{
  major : string
  classroom : string,
  exam_answer : result[],
  examId: string[]
  exercise_answer: string[]
  semester: number
  graduate: Date
  comprehensive : string
}

export interface result{
  examId : string
  paperId : string
  answer : answerModel[]
  mark : number
}

export interface examInfoModel{
  exams: string[]
}
