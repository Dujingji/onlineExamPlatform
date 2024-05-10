import { OnDestroy } from '@angular/core';
import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subject, first, takeUntil } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';
import { environment } from 'src/environments/environment';
import { MajorOption } from '../united-register-info/united-register-info.component';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-united-register-user-info',
  templateUrl: './united-register-user-info.component.html',
  styleUrls: ['./united-register-user-info.component.scss']
})
export class UnitedRegisterUserInfoComponent implements OnInit, OnDestroy {


  @Output() notify: EventEmitter<number> = new EventEmitter<number>()

  validateForm: FormGroup
  avatarUrl?: string;
  loading = false;
  collegeList: MajorOption[] = []

  private notification : Subject<void> = new Subject<void>()

  ngOnInit(): void {
    this.fetchCollegeList()
    this.fetchUserBaseInfo()

    this.unitedService.baseInfoEntriesSubjct.pipe(takeUntil(this.notification)).subscribe(res =>{
      this.fetchUserBaseInfo()
    })
  }

  ngOnDestroy(){
    this.notification.next()
    this.notification.complete()
  }


  fetchUserBaseInfo() {
    let std_id = localStorage.getItem('information')
    if (std_id) {
      this.unitedService.fetchUserBaseInfo(std_id).pipe(first()).subscribe(res => {
        this.validateForm.patchValue({ 'name': res.name })
        this.validateForm.patchValue({ 'college': res.college })
        this.validateForm.patchValue({ 'ID': res.ID })
        this.validateForm.patchValue({ 'phone_number': res.phone_number })
        this.validateForm.patchValue({ 'grade': res.grade })
        this.validateForm.patchValue({ 'image_url': res.image_url })
        this.validateForm.patchValue({ 'gerden': res.gerden })
        this.avatarUrl = (res.image_url && res.image_url.length !== 0) ? environment.apiUrl + res.image_url : undefined
      })
    }
  }

  fetchCollegeList() {
    this.authService.getCollegeList().pipe(first()).subscribe(res => {
      res.college.forEach(element => {
        this.collegeList.push({ label: element.name, value: element.name })
      })
    })
  }

  onSubmit() {
    this.unitedService.onSubmitBaseInfo(this.validateForm.value).pipe(first()).subscribe(res => {
      if (res.status) {
        this.notify.emit(2)
      }else{
        this.modal.error({
          nzTitle:'提交失败！',
          nzContent: '似乎遇到了问题，请检查提交的信息！'
        })
      }
    })
  }

  onSave() {
    this.unitedService.onSaveBaseInfo(this.validateForm.value).pipe(first()).subscribe(res => {
      if (res.status) {
        this.modal.success({
          nzTitle: '保存成功！',
          nzContent:'数据保存成功！'
        })
      }
    })
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('只能上传jpg及png格式的文件！');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.msg.error('图片大小不得超过 1 MB');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (url: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  getUrl() {
    return environment.apiUrl + 'united/upload'
  }

  getName() {
    return this.validateForm.value.ID
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  constructor(private unitedService: UnitedService, private msg: NzMessageService, private authService: AuthService, private modal : NzModalService) {
    this.validateForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'college': new FormControl('', [Validators.required]),
      'gerden': new FormControl<string>('', [Validators.required]),
      'phone_number': new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
      'ID': new FormControl('', [Validators.required, Validators.maxLength(18), Validators.minLength(18)]),
      'image_url': new FormControl('', [Validators.required]),
      'grade': new FormControl('', [Validators.required])
    })
  }

  public gerdenList: option[] = [
    {
      value: '男',
      label: '男'
    },
    {
      value: '女',
      label: '女'
    }
  ]

}

interface option {
  value: string,
  label: string
}
