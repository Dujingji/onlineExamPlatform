import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';

@Component({
  selector: 'app-college-home-page',
  templateUrl: './college-home-page.component.html',
  styleUrls: ['./college-home-page.component.scss']
})
export class CollegeHomePageComponent implements OnInit{

  public searchValue : string = '';
  public visible = false;
  public student_data : studentAccountInfo[] = []
  public listOfDisplayData : studentAccountInfo[] = [];
  public total : number = 1;
  public pageSize : number = 10;
  public pageIndex : number = 1;
  public loading : boolean = false;

  public listOfColumn = [
    {
      title: '姓名',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.student_name.localeCompare(b.student_name),
      priority: false
    },
    {
      title: '年级',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.semester - b.semester,
      priority: false
    },
    {
      title: '身份证',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.student_id.localeCompare(b.student_id),
      priority: 3
    },
    {
      title: '密码',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.password.localeCompare(b.password),
      priority: 2
    },
    {
      title: '专业基础课',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.found.localeCompare(b.found),
      priority: 1
    },
    {
      title: '专业综合课',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.comprehensive.localeCompare(b.comprehensive),
      priority: 1
    }
  ];

  constructor(private collegesService: CollegesService) {

  }

  ngOnInit(): void {
    this.fetchDate()
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.student_data.filter((item: studentAccountInfo) => item.student_name.indexOf(this.searchValue) !== -1);
  }

  fetchDate(){
    if(localStorage.getItem('college')){
      this.loading = true
      let college_id = localStorage.getItem('college')
      this.collegesService.getAllStudentInfoData(college_id!, this.pageSize, this.pageIndex)
      .pipe(first())
      .subscribe(data =>{
        this.student_data = data.data
        this.listOfDisplayData = [...this.student_data]
        this.total = data.total
        this.loading = false
      })
    }
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex
    this.pageSize = params.pageSize
    this.fetchDate()
  }


}

export interface studentAccountInfo {
  _id: string,
  student_name: string,
  student_id: string,
  password: string,
  found: string,
  comprehensive: string,
  semester : number
}
