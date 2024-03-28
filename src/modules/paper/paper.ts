import { major } from './../major/major';
export interface Paper{
  paper : string,
  length : number,
  n : Array<number>,
  exam_time : number,
  section : Array<section>,
  questions : questions[],
  major : string
}


export interface paperModel{
  paper_id : string,
  paper: Paper,
  end : Date,
  std_start : Date,
  isAuto: boolean,
  time : number
}

export interface paperEntries{
  papers : Paper[]
}

export interface questions{
  question : string,
  selection : Array<string>,
  mark : number,
  comment : string,
  type : string,
  answer : string
}

export interface section{
  type : string;
  desc : string;
}
