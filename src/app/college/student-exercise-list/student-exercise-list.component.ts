import { first, map } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import { Component, OnInit } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Form, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-exercise-list',
  templateUrl: './student-exercise-list.component.html',
  styleUrls: ['./student-exercise-list.component.scss']
})
export class StudentExerciseListComponent implements OnInit {
  public pageSize = 10;
  public pageIndex = 1;
  public total = 1;

  private college_id: string | null = ''
  public listOfDisplayData: studentExerciseData[] = []
  public loading: boolean = true

  public completedOption: option[] =
    [
      { label: '0%', value: 0 },
      { label: '小于25%', value: 0.25 },
      { label: '小于50%', value: 0.5 },
      { label: '小于75%', value: 0.75 },
      { label: '75%~100%', value: 1 }
    ]

  public validateForm: FormGroup<{
    username: FormControl<string>;
    grade: FormControl<string>;
    completed: FormControl<number[]>;
    accruate: FormControl<boolean>;
  }> = this.fb.group({
    username: [''],
    grade: [''],
    completed: [new Array<number>],
    accruate: [false]
  });

  public searchValue: string = '';
  public visible = false;
  private student_data: studentExerciseData[] = []

  public checked = false;
  public indeterminate = false;

  public foundationOption: option[] = []
  public comprehensiveOption: option[] = []

  private searchTag: boolean = false

  public setOfCheckedId = new Set<string>();
  public panels : Map<string, panels[]> = new Map<string, panels[]>

  private listOfCurrentPageData: readonly studentExerciseData[] = [];
  public expandSet = new Set<string>();
  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onCurrentPageDataChange($event: readonly studentExerciseData[]): void {
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

  constructor(private collegesService: CollegesService, private fb: NonNullableFormBuilder) {

  }

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')!
    this.fetchStudentExerciseData()
  }

  createPanel(){
    this.student_data.forEach(e =>{
      if(e.e_detail){
        let detailMap = new Map<string, detail[]>()
        let descSet = new Set<string>()
        let major = e.e_detail.major
        e.e_detail.detail.forEach(d =>{
          descSet.add(d.exe_desc)
          if(detailMap.get(d.exe_desc)){
            detailMap.get(d.exe_desc)!.push(d)
          }
          else{
            detailMap.set(d.exe_desc, [d])
          }
        })
        let children : childenPanels[] = []
        descSet.forEach(d =>{
          let detail = detailMap.get(d)
          children.push({ active : false, detail: detail ? detail : [], title: d })
        })

        if(this.panels.get(e.student_id)){
          this.panels.get(e.student_id)!.push({ title: major, active: false, children: children})
        }
        else{
          this.panels.set(e.student_id, [{ title: major, active: false, children: children}])
        }

      }
      if(e.f_detail){
        let detailMap = new Map<string, detail[]>()
        let descSet = new Set<string>()
        let major = e.f_detail.major
        e.f_detail.detail.forEach(d =>{
          descSet.add(d.exe_desc)
          if(detailMap.get(d.exe_desc)){
            detailMap.get(d.exe_desc)!.push(d)
          }
          else{
            detailMap.set(d.exe_desc, [d])
          }
        })
        let children : childenPanels[] = []
        descSet.forEach(d =>{
          let detail = detailMap.get(d)
          children.push({ active : false, detail: detail ? detail : [], title: d })
        })
        if(this.panels.get(e.student_id)){
          this.panels.get(e.student_id)!.push({ title: major, active: false, children: children})
        }
        else{
          this.panels.set(e.student_id, [{ title: major, active: false, children: children}])
        }
      }
      if(e.p_detail){
        let detailMap = new Map<string, detail[]>()
        let descSet = new Set<string>()
        let major = e.p_detail.major
        e.p_detail.detail.forEach(d =>{
          descSet.add(d.exe_desc)
          if(detailMap.get(d.exe_desc)){
            detailMap.get(d.exe_desc)!.push(d)
          }
          else{
            detailMap.set(d.exe_desc, [d])
          }
        })
        let children : childenPanels[] = []
        descSet.forEach(d =>{
          let detail = detailMap.get(d)
          children.push({ active : false, detail: detail ? detail : [], title: d })
        })
        if(this.panels.get(e.student_id)){
          this.panels.get(e.student_id)!.push({ title: major, active: false, children: children})
        }
        else{
          this.panels.set(e.student_id, [{ title: major, active: false, children: children}])
        }
      }
    })
  }

  fetchStudentExerciseData() {
    this.loading = true
    if (this.college_id) {
      this.collegesService.getAllStudentExerciseData(this.college_id, this.pageSize, this.pageIndex)
      .pipe(first())
      .subscribe(data =>{
        this.student_data = data.data
        this.listOfDisplayData = [...this.student_data]
        this.total = data.total
        this.loading = false
        this.createPanel()
      })
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.student_data.filter((item: studentExerciseData) => item.std_name.indexOf(this.searchValue) !== -1);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchStudentExerciseData()
    }
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchStudentExerciseData()
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
    let completed_number = this.validateForm.value.completed
    let accruate = this.validateForm.value.accruate
    this.loading = true
    if (this.college_id) {
      // this.collegesService.getSearchStudentInfoData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade, accruate: accruate, completed: completed_number }, 'fetch')
      //   .pipe(first())
      //   .subscribe(data => {
      //     this.loading = false
      //     this.total = data.total
      //     //this.student_data = data.data
      //     this.listOfDisplayData = [...this.student_data]
      //   })
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
    this.fetchStudentExerciseData()
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
      && (this.validateForm.value.completed && this.validateForm.value.completed.length === 0)
  }

  jsonCheck(condition: number): void {
    let now = new Date()
    let fileName = this.collegesService.collegeName + '_' + now.getTime()
    let jsonData: studentExerciseData[] = []
    if (condition === 0) {
      // 将JSON数据转换为工作表
      jsonData = this.listOfCurrentPageData.filter(item => this.setOfCheckedId.has(item.student_id))
      fileName += '_选择数据'
      this.exportToExcel(jsonData, fileName)
    }
    else {
      let username = this.validateForm.value.username;
      let grade = this.validateForm.value.grade
      let accurate = this.validateForm.value.accruate
      let completed = this.validateForm.value.completed
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

        this.collegesService.getSearchStudentInfoData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade }, c)
          .pipe(first())
          .subscribe(data => {
            this.loading = false
            //jsonData = data.data
            this.exportToExcel(jsonData, fileName)
          })
      }
    }

  }

  getPercent(detail : detail){
    return ((detail.completed / detail.total) * 100).toFixed(2)
  }


  public listOfColumn = [
    {
      title: '姓名',
      compare: (a: studentExerciseData, b: studentExerciseData) => a.std_name.localeCompare(b.std_name),
      priority: false,
      filterFn: null
    },
    {
      title: '年级',
      compare: (a: studentExerciseData, b: studentExerciseData) => a.semester - b.semester,
      priority: false,
      filterFn: null
    },
    {
      title: '政治理论',

      priority: false,
      filterFn: null
    },
    {
      title: '英语',
      priority: false,
      filterFn: null
    },
    {
      title: '专业基础课',
      priority: false,
      filterFn: null
    },
  ]


}

export interface studentExerciseData {
  student_id: string,
  std_name: string,
  semester: number,
  p_detail: exe,
  e_detail: exe,
  f_detail: exe
}

interface panels{
  title : string,
  children : childenPanels[],
  active: false
}

interface childenPanels{
  title : string
  detail : detail[],
  active : false
}

interface detail {
  major: string,
  description: string,
  completed: number,
  total: number,
  exe_desc: string,
  active?: boolean
}

interface exe {
  detail: detail[],
  major: string,
  completed: number,
  total: number
}

interface option {
  label: string,
  value: number
}
