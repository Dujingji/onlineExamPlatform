import { exericseDetailModel } from "./exercise-detail";

export interface exerciseModel{
  _id : string,
  major: string,
  length : number,
  description : string,
  model_number : number,
  model_Id: string[],
  created_date: Date,
}
