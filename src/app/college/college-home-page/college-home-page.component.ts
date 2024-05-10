import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-college-home-page',
  templateUrl: './college-home-page.component.html',
  styleUrls: ['./college-home-page.component.scss']
})
export class CollegeHomePageComponent implements OnInit {

  public searchValue: string = '';
  public visible = false;
  private student_data: studentAccountInfo[] = []
  public listOfDisplayData: studentAccountInfo[] = [];
  public total: number = 1;
  public pageSize: number = 10;
  public pageIndex: number = 1;
  public loading: boolean = false;
  public filterFound: filter[] = []
  public filterCompe: filter[] = []
  private fList: string[] = []
  private CList: string[] = []

  public checked = false;
  public indeterminate = false;

  public foundationOption: option[] = []
  public comprehensiveOption: option[] = []

  private searchTag: boolean = false

  public setOfCheckedId = new Set<string>();

  private listOfCurrentPageData: readonly studentAccountInfo[] = [];

  private college_id?: string

  public validateForm: FormGroup<{
    username: FormControl<string>;
    grade: FormControl<string>;
    comprehensive_list: FormControl<string[]>;
    foundation_list: FormControl<string[]>;
  }> = this.fb.group({
    username: [''],
    grade: [''],
    comprehensive_list: [new Array<string>],
    foundation_list: [new Array<string>]
  });

  public listOfColumn = [
    {
      title: '姓名',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.student_name.localeCompare(b.student_name),
      priority: false,
      filterFn: null
    },
    {
      title: '年级',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.semester - b.semester,
      priority: false,
      filterFn: null,
    },
    {
      title: '身份证',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.student_id.localeCompare(b.student_id),
      priority: 3,
      filterFn: null
    },
    {
      title: '密码',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.password.localeCompare(b.password),
      priority: 2,
      filterFn: null
    },
    {
      title: '专业基础课',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.found.localeCompare(b.found),
      priority: 1,
      filterFn: (list: string[], item: studentAccountInfo) => list.some(name => item.found.indexOf(name) !== -1)
    },
    {
      title: '专业综合课',
      compare: (a: studentAccountInfo, b: studentAccountInfo) => a.comprehensive.localeCompare(b.comprehensive),
      priority: 1,
      filterFn: (list: string[], item: studentAccountInfo) => list.some(name => item.comprehensive.indexOf(name) !== -1)
    }
  ];

  onCurrentPageDataChange($event: readonly studentAccountInfo[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.student_id, value));
    this.refreshCheckedStatus();
  }

  public listOfSelection = [
    {
      text: '全部选择',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ]

  constructor(private collegesService: CollegesService, private cd: ChangeDetectorRef, private fb: NonNullableFormBuilder) {

  }

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')!
    this.fetchData()
    this.fetchMajor()
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.student_data.filter((item: studentAccountInfo) => item.student_name.indexOf(this.searchValue) !== -1);
  }

  createFilterFList(data: studentAccountInfo[]) {

    let temp1: filter[] = []
    let temp2: filter[] = []
    if (this.filterFound) {
      data.forEach((e, i) => {
        if (this.fList.indexOf(e.found ? e.found : '无') < 0) {
          this.fList.push(e.found ? e.found : '无')
          if (e.found)
            temp1.push({ text: e.found, value: e.found })
          else {
            temp1.push({ text: '无', value: '无' })
          }

        }
        if (this.CList.indexOf(e.comprehensive ? e.comprehensive : '无') < 0) {
          this.CList.push(e.comprehensive ? e.comprehensive : '无');
          if (e.comprehensive)
            temp2.push({ text: e.comprehensive, value: e.comprehensive })
          else {
            temp2.push({ text: '无', value: '无' })
          }
        }
      })
      this.filterCompe = temp2
      this.filterFound = temp1
    }
  }

  fetchMajor() {
    this.collegesService.getAllMajor()
      .pipe(first())
      .subscribe(data => {
        this.comprehensiveOption = data._c
        this.foundationOption = data._f
      })
  }

  fetchData() {
    if (localStorage.getItem('college')) {
      this.loading = true
      let college_id = localStorage.getItem('college')
      this.collegesService.getAllStudentInfoData(college_id!, this.pageSize, this.pageIndex)
        .pipe(first())
        .subscribe(data => {
          this.student_data = data.data
          this.student_data.map(e => { if (!e.comprehensive) e.comprehensive = '无'; if (!e.found) e.found = '无' })
          this.listOfDisplayData = [...this.student_data]
          this.total = data.total
          this.loading = false
          this.fList = []
          this.CList = []
          this.createFilterFList(this.student_data)
        })
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchData()
    }
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchData()
    }
  }

  onSearchData() {
    if (!this.searchTag) {
      this.pageIndex = 1;
      this.pageSize = 10;
    }
    this.searchTag = true
    let username = this.validateForm.value.username;
    let grade = this.validateForm.value.grade
    let found_list = this.validateForm.value.foundation_list
    let compen_list = this.validateForm.value.comprehensive_list
    this.loading = true
    if (this.college_id) {
      this.collegesService.getSearchStudentInfoData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade, _f: found_list, _c: compen_list }, 'fetch')
        .pipe(first())
        .subscribe(data => {
          this.loading = false
          this.total = data.total
          this.student_data = data.data
          this.student_data.map(e => { if (!e.comprehensive) e.comprehensive = '无'; if (!e.found) e.found = '无' })
          this.listOfDisplayData = [...this.student_data]
          this.fList = []
          this.CList = []
          this.createFilterFList(this.student_data)
        })
    }
    else {
      alert('教学点id丢失，重新登录已获取id')
    }
  }

  onResetSearchBar() {
    this.searchTag = false
    this.validateForm.reset()
    this.pageIndex = 1;
    this.pageSize = 10;
    this.fetchData()
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.student_id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.student_id)) && !this.checked;
  }

  exportToExcel(jsonData: any[], fileName: string) {
    const fieldsMapList: any = {
      student_name: '学生姓名',
      semester: '年级',
      student_id: '身份证',
      password: '密码',
      found: '专业基础课',
      comprehensive: '专业综合课'
    }

    const newJsonData = jsonData.map(item => {
      let newItem: any = {};
      Object.keys(fieldsMapList).forEach(key => {
        if (item.hasOwnProperty(key)) {
          newItem[fieldsMapList[key]] = item[key];
        }
      });
      return newItem;
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newJsonData);
    // 创建工作簿并添加工作表
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // 生成Excel文件并保存
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  checkSearchStatus() {
    return !this.validateForm.value.username && !this.validateForm.value.grade
      && (this.validateForm.value.comprehensive_list && this.validateForm.value.comprehensive_list.length === 0)
      && (this.validateForm.value.foundation_list && this.validateForm.value.foundation_list.length === 0)
  }

  jsonCheck(condition: number): void {
    let now = new Date()
    let fileName = this.collegesService.collegeName + '_' + now.getTime()
    let jsonData: studentAccountInfo[] = []
    if (condition === 0) {
      // 将JSON数据转换为工作表
      jsonData = this.listOfCurrentPageData.filter(item => this.setOfCheckedId.has(item._id))
      fileName += '_选择数据'
      this.exportToExcel(jsonData, fileName)
    }
    else {
      let username = this.validateForm.value.username;
      let grade = this.validateForm.value.grade
      let found_list = this.validateForm.value.foundation_list
      let compen_list = this.validateForm.value.comprehensive_list
      this.loading = true
      if (this.college_id) {
        let c = ''
        if (condition === 1) {
          c = 'export'
          fileName += '_搜索数据'
        }

        else {
          c = 'all'
          fileName += '_全部数据'
        }

        this.collegesService.getSearchStudentInfoData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade, _f: found_list, _c: compen_list }, c)
          .pipe(first())
          .subscribe(data => {
            this.loading = false
            jsonData = data.data
            this.exportToExcel(jsonData, fileName)
          })
      }
    }
  }
}

export interface studentAccountInfo {
  _id: string,
  student_name: string,
  student_id: string,
  password: string,
  found: string,
  comprehensive: string,
  semester: number
}

interface filter {
  text: string,
  value: string
}

export interface option {
  label: string,
  value: string
}
