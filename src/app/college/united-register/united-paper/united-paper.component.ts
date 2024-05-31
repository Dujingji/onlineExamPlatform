import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-united-paper',
  templateUrl: './united-paper.component.html',
  styleUrls: ['./united-paper.component.scss']
})
export class UnitedPaperComponent {

  public united_info?: unitedPaper
  public imageCache: Map<string, string> = new Map();

  constructor() {

  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  getMajorString(index: number) {
    if (this.united_info && this.united_info.majorInfo.length > index) {
      return this.united_info.majorInfo[index].major
    }
    else {
      return ''
    }
  }


  getTimeString(index: number) {
    if(this.united_info && this.united_info.majorInfo.length > index){
      let start = new Date(this.united_info.majorInfo[index].start_date)
      let end = new Date(this.united_info.majorInfo[index].end_date)
      return `${start.getMonth() + 1}月${start.getDate()}日 ${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}-${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`
    }
    else{
      return ''
    }
  }

  getClassroomString(index: number) {
    if (this.united_info && this.united_info.majorInfo.length > index) {
      return this.united_info.majorInfo[index].classroom.toString().padStart(3, '0')
    }
    else {
      return ''
    }
  }

  getNumberSite(index: number) {
    if (this.united_info && this.united_info.majorInfo.length > index) {
      return this.united_info.majorInfo[index].site_number.toString().padStart(2, '0')
    }
    else {
      return ''
    }
  }

  getImage() {
    if (this.united_info && this.imageCache.get(environment.apiUrl + this.united_info.image_url)) {
      return this.imageCache.get(environment.apiUrl + this.united_info.image_url)
    }
    else {
      return undefined
    }
  }

  getNotification(){
    if(this.united_info){
      return this.united_info.notification
    }
    else{
      return []
    }
  }

  getDetail(condition: number) {
    if (this.united_info) {
      switch (condition) {
        case 0:
          return this.united_info.united_exam_id ? this.united_info.united_exam_id : '待定'
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
        default:
          return '待定'
      }
    }
    else {
      return ''
    }
  }
}

interface unitedPaper {
  ID: string
  std_name: string
  united_exam_id: string
  image_url: string
  majorInfo: majorInfo[]
  gerden: string,
  location: string,
  location_detail: string,
  notification: string[]
}


interface majorInfo {
  major: string
  start_date: Date
  end_date: Date
  site_number: number
  classroom: string,
}
