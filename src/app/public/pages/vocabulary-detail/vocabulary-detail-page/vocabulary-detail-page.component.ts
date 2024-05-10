import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';
import { DailyService, vocabularyModel } from 'src/app/service/daily/daily-service.service';

@Component({
  selector: 'app-vocabulary-detail-page',
  templateUrl: './vocabulary-detail-page.component.html',
  styleUrls: ['./vocabulary-detail-page.component.scss']
})
export class VocabularyDetailPageComponent implements OnInit {

  public loading : boolean = true;
  public vocabulary?: vocabularyModel
  public PageStatus : boolean = false
  previousUrl: string | null = null;

  constructor(private dailyService: DailyService, private route: ActivatedRoute, private router: Router) {

  }

  get status(){
    return this.dailyService.v_studied >= this.dailyService.v_length
  }


  getStatus(){

  }

  goBack(){
    window.history.back();
  }

  ngOnInit(): void {
    this.getStatus()
    this.fetchData(this.route.snapshot.paramMap.get('word')!)
  }

  playAudio(text: string, index : number, condition : number) {
    let result_s = ''
    if(condition === 0){
      result_s = text
    }else{
      result_s = text + '_' + index.toString()
    }

    this.dailyService.playAudio(result_s).pipe(first()).subscribe(blob => {
      const audio = document.querySelector('audio');
      const objectUrl = URL.createObjectURL(blob);
      if (audio) {
        audio.src = objectUrl;
        audio.load(); // 加载音频
        audio.play().catch(e => console.error('Audio play failed:', e)); // 尝试播放音频，捕获并打印任何错误
      }
    });
  }

  fetchData(v: string) {
    this.dailyService.getVocabularyDetail(v)
      .pipe(first())
      .subscribe(data => {
        if (data)
          this.loading = false
          this.vocabulary = data.data
      })
  }

  nextVocabulary(status : number) {
    if (this.vocabulary)
      this.dailyService.postStudiedData(localStorage.getItem('information')!, status).subscribe(data => {
        if (data.status) {
          this.router.navigate(['/public/homePage/vocabulary-study']);
          //跳转至最前页面

        }
      })
  }

}
