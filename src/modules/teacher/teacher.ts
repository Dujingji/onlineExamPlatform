
export interface Teacher {
  id: string
  username: string;
  password : string;
  major: string;
  classroom: number
}

export interface teacherPaperDate{
  classroom: string,
  paper:string
}

export interface classInfo{
  name: string,
  exams : string[],
  students: number
}
