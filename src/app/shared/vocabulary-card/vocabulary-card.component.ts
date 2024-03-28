import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyService } from 'src/app/service/daily/daily-service.service';

@Component({
  selector: 'app-vocabulary-card',
  templateUrl: './vocabulary-card.component.html',
  styleUrls: ['./vocabulary-card.component.scss']
})
export class VocabularyCardComponent {

  constructor(private dailyService: DailyService) {

  }

  @Input() frontContent: string = '加载中';
  @Input() backContent: string = '加载中';
  @Input() isFlipped: boolean = false;
  @Output() isButton = new EventEmitter<boolean>()

  playAudio() {
    this.isButton.emit(true)
    this.dailyService.playAudio(this.frontContent).subscribe(blob => {
      const audio = document.querySelector('audio');
      const objectUrl = URL.createObjectURL(blob);
      if (audio) {
        audio.src = objectUrl;
        audio.load(); // 加载音频
        audio.play().finally(() =>{
          this.isButton.emit(false)
        }).catch(e => console.error('Audio play failed:', e)); // 尝试播放音频，捕获并打印任何错误
      }
    });
  }
}
