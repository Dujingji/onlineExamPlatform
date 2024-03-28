import { answerModel } from "src/app/public/pages/exam-page/exam-paper/exam-paper.component"

export interface student{
  id : string,
  username : string,
  password : string,
  major : string,
  classroom : string,
  exam_answers : examInfo[],
  exercise_answer: exerciseInfo[],
  exams : string[],
  semester : string,
  graduate : Date,
  std_name : string
}

export interface examInfo{
  examId : string,
  paperId : string,
  answer : answerModel[]
  mark : number,
  status : number,
  marker : string
}

export interface exerciseInfo{
  exercise_id : string,
  answer_id: string
}

export interface studentExamsModel{
  name : string,
  paperId : string,
  status : boolean,
  mark : number,
  answer : answerModel[]
}
