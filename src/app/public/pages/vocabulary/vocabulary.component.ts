import { trigger, state, style, transition, animate } from '@angular/animations';
import { DailyService, vocabularyModel } from './../../../service/daily/daily-service.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class VocabularyComponent implements OnInit {

  public button: boolean = false
  public tip: boolean = false
  private currrent_i = 0
  public word_index: number = 0
  public current: vocabularyModel = {
    vocabulary: '',
    v_type: [],
    voice: '',
    v_mean: [],
    prefix: '',
    suffix: '',
    p_symbol: '',
    exchange: [],
    sentences: []
  };

  constructor(private dailyService: DailyService, private router : Router) {

  }

  settingChange(){
    this.dailyService.s_allFlip = !this.allFlip
    this.dailyService.v_words.forEach(e =>{
      e.flip = false
    })
  }

  get allFlip(){
    return this.dailyService.v_allFlip
  }

  get studied(){
    return this.dailyService.v_studied
  }

  get length(){
    return this.dailyService.v_length
  }

  get words(){
    return this.dailyService.v_words
  }

  toggleTip() {
    this.tip = !this.tip
    if (this.tip)
      this.playAudio(this.current.vocabulary + '_0')
  }


  ngOnInit(): void {
    this.fetchVocabulary()
  }


  getTip() {
    return this.current.sentences[0].en
  }

  fetchVocabulary() {
    this.dailyService.getVocabularyData(localStorage.getItem("information")!)
      .pipe(first())
      .subscribe(data => {
        this.dailyService.v_length = data.data.length
        this.dailyService.v_studied = data.data.index
        if(this.dailyService.v_words.length === 0)
          this.dailyService.v_words = data.data.words
        this.current = data.data.current
        if(this.current)
         this.playAudio(this.current.vocabulary)
      })
  }

  vocabularyDetail(text : string, index : number){
    if(this.words[index].flip){
      this.router.navigate(['/public/homePage/vocabulary-detail/' + text])
    }
    else{
      this.words[index].flip = !this.words[index].flip
      this.dailyService.current_c = this.dailyService.current_c + 1
      if(this.dailyService.current_c >= this.dailyService.v_length){
        this.dailyService.s_allFlip = false
        this.dailyService.current_c = 0
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

  restudy() {
    this.dailyService.reStudy(localStorage.getItem("information")!)
      .pipe(first())
      .subscribe(data => {
        if(data.status){
          window.location.reload();
        }
      })
  }


  printVMean(card: vocabularyModel): string {
    let result = ''
    card.v_type.forEach((e, i) => {
      result += '<br>' + e + card.v_mean[i]
    })
    result += '<br>' + '例句：'
    card.sentences.forEach((e, i) => {
      result += '<br>' + e.en + '<br>' + e.cn
    })
    result += '<br>' + '词性变化: '
    card.exchange.forEach((e, i) => {
      result += e + '；'
    })

    return result
  }

  nextGroup(){
    this.dailyService.postNextGroup(localStorage.getItem('information')!)
    .pipe(first())
    .subscribe(data =>{
      if(data.status){
        window.location.reload()
      }
    })
  }

}
