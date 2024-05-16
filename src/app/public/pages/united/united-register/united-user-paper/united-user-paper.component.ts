import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { PrintService } from 'src/app/service/print/print.service';
import { UnitedService } from 'src/app/service/united/united.service';
import { environment } from 'src/environments/environment';
import {
  DomPortalOutlet,
  PortalOutlet,
  TemplatePortal
} from "@angular/cdk/portal";

@Component({
  selector: 'app-united-user-paper',
  templateUrl: './united-user-paper.component.html',
  styleUrls: ['./united-user-paper.component.scss']
})

export class UnitedUserPaperComponent implements OnInit, OnDestroy {

  public united_info?: unitedPaper

  @Output() notify: EventEmitter<number> = new EventEmitter<number>()

  constructor(private unitedService: UnitedService, private printService: PrintService) {

  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.fetchUnitedInfo()
  }

  fetchUnitedInfo() {
    this.unitedService.getUnitedPaper().pipe(first()).subscribe(data => {
      this.united_info = data.data
    })
  }

  getMajorString(index: number) {
    if (this.united_info && this.united_info.majorInfo.length > index) {
      return this.united_info.majorInfo[index].major
    }
    else {
      return ''
    }
  }

  goBack(){
    this.notify.emit(0)
  }

  print(){
    this.printService.exportAsPDF('print-section', this.united_info ? `${this.united_info.std_name}_准考证_${new Date().getTime()}` : undefined);
  }

  getTimeString(i: number) {

  }

  getClassroomString(i: number) {

  }

  getNumberSite(i: number) {

  }

  getDetail(condition: number) {
    if (this.united_info) {
      switch (condition) {
        case 0:
          return this.united_info.united_user_id ? this.united_info.united_user_id : '待定'
        case 1:
          return this.united_info.std_name ? this.united_info.std_name : '待定'
        case 2:
          return this.united_info.gerden ? this.united_info.gerden : '待定'
        case 3:
          return this.united_info.ID ? this.united_info.ID : '待定'
        case 4:
          return this.united_info.location ? this.united_info.location : '待定'
        case 5:
          return this.united_info.location_detail ? this.united_info.location_detail : '待定'
        case 6:
          return this.united_info.image_url ? environment.apiUrl + this.united_info.image_url : ''
        default:
          return '待定'
      }
    }
    else {
      return ''
    }
  }
}

export interface unitedPaper {
  ID: string
  std_name: string
  united_user_id: string
  image_url: string
  majorInfo: majorInfo[]
  gerden: string,
  location: string,
  location_detail: string
}

interface majorInfo {
  major: string
  start_date: Date
  end_date: Date
  site_number: number
  classroom: string,
}
