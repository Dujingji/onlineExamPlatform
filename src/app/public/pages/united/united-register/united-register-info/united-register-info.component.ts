import { unitedUserInfo } from './../../../../../service/united/united.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalService } from 'ng-zorro-antd/modal';
import { delay, first } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';

@Component({
  selector: 'app-united-register-info',
  templateUrl: './united-register-info.component.html',
  styleUrls: ['./united-register-info.component.scss']
})

export class UnitedRegisterInfoComponent implements OnInit {

  @Output() notify: EventEmitter<number> = new EventEmitter<number>()
  @Output() goBack: EventEmitter<number> = new EventEmitter<number>()

  public _foudation?: string
  public _comphensive?: string
  public payment: string = ''
  public matchScreem: boolean = false
  public data?: unitedUserInfo

  public loading: boolean = true

  public validate: boolean = false

  public college_name : string = ''

  ngOnInit(): void {
    this.fetchAllUserData()
    this.fetchAllMajorList()
  }

  fetchAllMajorList() {
    this.unitedService.fetchAllMajorList().pipe(first()).subscribe(res => {
      this._foundList = res._found
      this._comphensiveList = res._compre
    })
  }

  GoBack() {
    this.goBack.emit(1)
  }

  fetchAllUserData() {
    this.loading = true
    let std_id = localStorage.getItem('information')!
    this.unitedService.fetchAllUserInfo(std_id).subscribe(data => {
      this.payment = data.data.pay_statement
      this.data = data.data
      this._comphensive = data.data.comphensive
      this._foudation = data.data.found
      this.foundChange()
      this.comphensiveChange()
      this.loading = false
    })
  }

  foundChange() {
    if (this._foudation && this._foudation.length !== 0) {
      this.validate = true
    }
  }

  clear() {
    this.validate = false
    this._comphensive = ''
    this._foudation = ''
  }

  hasChoose(){
    if(this._foudation && this._foudation.length !== 0){
      return false
    }

    else if(this._comphensive && this._comphensive.length !== 0){
      return false
    }
    else{
      return true
    }
  }

  onSubmit() {
    const confirm = this.modal.confirm({
      nzTitle: '确认报考',
      nzContent: '报考后，无法自主修改科目，请仔细核对科目信息！' + `科目：公共课、${this._foudation}、${this._comphensive}`,
      nzOnOk: () => { return true}
    })

    confirm.afterClose.subscribe((result) => {
      if(result){
        this.unitedService.onSubmitSubjectInfo({ _f: this._foudation ? this._foudation : '', _c: this._comphensive ? this._comphensive : '' }).pipe(first()).subscribe(data => {
          if (data.status) {
            this.notify.emit(data.current)
          } else {
            this.modal.error({
              nzTitle: '提交失败！',
              nzContent: '提交信息失败，请稍后重试！'
            })
          }
        })
      }
    })
  }

  onSave() {
    this.unitedService.onSaveSubjectInfo({ _f: this._foudation ? this._foudation : '', _c: this._comphensive ? this._comphensive : '' }).pipe(first()).subscribe(data => {
      if (data.status) {
        this.modal.success({
          nzTitle: '保存成功！',
          nzContent: '提交信息成功！请点击报名参考按钮完成报考！'
        })

      } else {

      }
    })
  }

  comphensiveChange() {
    if (this._foudation && this._foudation.length !== 0) {
      this.validate = true
    }
    else {
      this.validate = false
    }
  }

  constructor(private unitedService: UnitedService, private observer: BreakpointObserver, private router: Router, private modal: NzModalService) {

  }

  public _comphensiveList: MajorOption[] = []

  public _foundList: MajorOption[] = []
}



export interface MajorOption {
  value: string,
  label: string
}
