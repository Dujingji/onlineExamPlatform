import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DailyService, cardModle } from 'src/app/service/daily/daily-service.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

  @Input() words : cardModle[] = []

  public allFlip : boolean = true
  public current_flip : number = 0

  constructor(private dailyService: DailyService, private router : Router) { }

  ngOnInit() {
  }


  settingChange(){
    this.allFlip = !this.allFlip
    this.words.forEach(e =>{
      e.flip = false
    })
  }

  vocabularyDetail(text : string, index : number, event: MouseEvent){
    const clickedElement = event.target as HTMLElement;
    if(this.words[index].flip && false){
      this.router.navigate(['/public/homePage/vocabulary-detail/' + text])
    }

    else if(!this.words[index].flip ){
      this.words[index].flip = !this.words[index].flip
      this.current_flip = this.current_flip + 1
      if(this.current_flip >= this.words.length){
        this.allFlip = false
        this.current_flip = 0
      }
    }
  }

  playAudio(text: string) {
    this.dailyService.playAudio(text).pipe(first()).subscribe(blob => {
      const audio = document.querySelector('audio');
      const objectUrl = URL.createObjectURL(blob);
      if (audio) {
        audio.src = objectUrl;
        audio.load(); // 加载音频
        audio.play().catch(e => console.error('Audio play failed:', e)); // 尝试播放音频，捕获并打印任何错误
      }
    });
  }
}
