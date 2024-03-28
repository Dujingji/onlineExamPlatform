import { questions } from "../paper/paper";

export interface exericseDetailModel{
  description: string,
  length: number,
  questions : questions[],
  n: number[],
  section: Array<section>,
}

export interface section{
  type : string;
  desc : string;
}
