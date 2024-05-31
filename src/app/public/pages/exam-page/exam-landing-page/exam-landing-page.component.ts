import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ExamPaperService } from 'src/app/service/exam/exam-paper.service';
import { exam } from 'src/modules/exams/exam';


@Component({
  selector: 'app-exam-landing-page',
  templateUrl: './exam-landing-page.component.html',
  styleUrls: ['./exam-landing-page.component.scss']
})
export class ExamLandingPageComponent implements OnInit{

  public exam_id : string | null = null
  public exam_detail? : exam
  public total_mark : number = 0
  public cost: string = ''
  private finished : boolean = false

  constructor(private route: ActivatedRoute, private examPaperService : ExamPaperService){

  }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('id')
    if(this.exam_id)
     this.fetchExamDetail(this.exam_id)
  }

  fetchExamDetail(exam_id : string){
    this.examPaperService.getExamDetailInfo(exam_id).subscribe(data =>{
      this.finished = data.finished
      this.exam_detail = data.detail
      this.total_mark = data.total
      this.cost = Math.floor(data.cost / 3600).toString() + ' 小时 ' + Math.floor(data.cost % 3600 / 60) + ' 分钟'
    })
  }

  examStatus(){
    let now = new Date()
    if(this.finished){
      return 3
    }
    if(this.exam_detail && new Date(this.exam_detail.date).getTime() > now.getTime()){
      return 0
    }
    else if(this.exam_detail && new Date(this.exam_detail.date).getTime() <= now.getTime() && new Date(this.exam_detail.end).getTime() >= now.getTime()){
      return 1
    }
    else if(this.exam_detail && new Date(this.exam_detail.end).getTime() < now.getTime()){
      return 2
    }
    else{
      return -1
    }
  }

  getTimeString(){
    if(this.exam_detail){
      let end = new Date(this.exam_detail.end)
      return end.toLocaleString()
    }
    return ''
  }
}
