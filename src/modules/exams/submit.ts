import { answerModel } from "src/app/public/pages/exam-page/exam-paper/exam-paper.component";

export interface submitModle{
  id : string,
  exam_id : string,
  paperId : string,
  results : answerModel[],
  mark : number,
  status : number,
  marker: string
}
