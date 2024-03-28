import { Time } from "@angular/common"

export interface exam{
  _id : string,
  major : string,
  paperId : string,
  description : string,
  date : Date,
  member : memberModle[],
  status : number,
  classroom : string[],
  time : Time,
  end : Date,
  isAuto : boolean,
  semester : string,
  vd_url : string[]
}

export interface examEntries{
  exams : exam[]
}

export interface examUpdateModel{
  major : string,
  PaperId : string,
  date : Date,
  description : string,
  time : Time,
  end : Date,
  isAuto : boolean,
  vd_url : string
}

export interface memberModle{
  std_id : string,
  exam_start : Date
}
