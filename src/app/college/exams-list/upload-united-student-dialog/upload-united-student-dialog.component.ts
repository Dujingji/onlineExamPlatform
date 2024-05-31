import { Component } from '@angular/core';
import * as saveAs from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { CollegesService } from 'src/app/service/college/college.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-united-student-dialog',
  templateUrl: './upload-united-student-dialog.component.html',
  styleUrls: ['./upload-united-student-dialog.component.scss']
})
export class UploadUnitedStudentDialogComponent {
  constructor(private collegesService: CollegesService, private modalRef: NzModalRef, private msg: NzMessageService) { }

  DownloadTemp() {
    this.collegesService.downloadTempStudent().subscribe(res =>{
      let downloadURL = window.URL.createObjectURL(res);
      saveAs(downloadURL);
    })
  }

  getUrl() {
    return environment.apiUrl + 'college/upload-united-exam-student-info-file'
  }

  handleChange(info: NzUploadChangeParam) {
    if (info.file.status !== 'uploading') {

    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} 导入成功`);
      this.modalRef.close({status : true})
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} 导入失败`);
    }
  }

  close(condition: number): void {
    // Pass some data back to the major component
    if (condition)
      this.modalRef.close();
    else
      this.modalRef.close();
  }
}
