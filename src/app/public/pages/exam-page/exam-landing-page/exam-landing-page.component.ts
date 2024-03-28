import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-exam-landing-page',
  templateUrl: './exam-landing-page.component.html',
  styleUrls: ['./exam-landing-page.component.scss']
})
export class ExamLandingPageComponent implements OnInit{

  public exam_id : string | null = null

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
    this.exam_id = this.route.snapshot.paramMap.get('id')
  }
}
