import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UnitedService } from 'src/app/service/united/united.service';
import { majorInfo, unitedPaper } from '../united-register/united-user-paper/united-user-paper.component';

@Component({
  selector: 'app-united',
  templateUrl: './united.component.html',
  styleUrls: ['./united.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', padding: '0px 0px 0px 0px', visibility: 'hidden' , overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class UnitedComponent implements OnInit{

  public loading : boolean = false
  public active : boolean = false
  public state : string[] = []
  public united_data? : unitedPaper
  public _f : string = ''
  public _c : string = ''

  ngOnInit(): void {
    this.fetchUnitedData()
  }

  getTimeString(index: number) {
    if(this.united_data && this.united_data.majorInfo.length > index){
      let start = new Date(this.united_data.majorInfo[index].start_date)
      let end = new Date(this.united_data.majorInfo[index].end_date)
      return `${start.getMonth() + 1}月${start.getDate()}日 ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}:${start.getSeconds().toString().padStart(2, '0')}~${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}:${end.getSeconds().toString().padStart(2, '0')}`
    }
    else{
      return ''
    }
  }

  getData(){
    if(this.united_data){
      return this.united_data.majorInfo
    }
    else{
      return []
    }
  }

  fetchUnitedData(){
    this.loading = true
    this.unitedService.getUnitedPaper().subscribe(res =>{
      this.loading = false
      this.united_data = res.data
      this._f = res.data._f
      this._c = res.data._c
      this.active = this.united_data.majorInfo.length === 0 ? false : true
      if(this.united_data.majorInfo.length > 0)
       this.state = new Array<string>(this.united_data.majorInfo.length).fill('expanded')
    })
  }

  getNotification(){
    if(this.united_data && this.united_data.ID.length !== 0){
      return `您的考场未分配，请耐心等待考场分配。您报考的科目为：政治理论、英语${this._f ? this._f.length === 0 ? '' : '、' + this._f : ''}${this._c ? this._c.length === 0 ? '' : '、' + this._c : ''}`
    }
    else{
      return `您未报名参与本年度（${new Date().getFullYear()}）联考！如有疑问，请咨询您的辅导员老师！`
    }
  }

  toggleBlock(i : number) {
    this.state[i] = this.state[i] === 'expanded' ? 'collapsed' : 'expanded';
  }

  constructor(private unitedService : UnitedService){ }



}
