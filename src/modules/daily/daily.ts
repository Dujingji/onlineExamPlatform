import { answerModel } from "src/app/public/pages/exam-page/exam-paper/exam-paper.component"
import { questions, section } from "../paper/paper"

export interface dailyModel{
  date: DateModel,
  std_id: string
  major : string
  questions: questions[],
  answers: answerModel[],
  mark: number,
  section : Array<section>,
  n : number[],
  length : number,
  status : number
}

export interface DateModel{
  year: number,
  month: number,
  day: number
}
