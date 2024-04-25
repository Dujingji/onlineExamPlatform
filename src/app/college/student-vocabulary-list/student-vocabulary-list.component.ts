import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormRecord, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-student-vocabulary-list',
  templateUrl: './student-vocabulary-list.component.html',
  styleUrls: ['./student-vocabulary-list.component.scss']
})
export class StudentVocabularyListComponent implements OnInit {
  public pageSize = 10;
  public pageIndex = 1;
  public total = 1;
  public visible = false;
  public searchValue: string = '';

  private listOfCurrentPageData: readonly stduentVocabualryData[] = [];
  public checked = false;
  public indeterminate = false;

  public student_data: stduentVocabualryData[] = []
  public setOfCheckedId = new Set<string>();
  private college_id: string | null = ''
  public listOfDisplayData: stduentVocabualryData[] = []
  public loading: boolean = true

  private seacrchTag: boolean = false;

  public validateForm: FormGroup<{
    username: FormControl<string>;
    grade: FormControl<string>;
  }> = this.fb.group({
    username: [''],
    grade: [''],
  });

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')
    this.fetchStudentVocabularyData()

  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  constructor(private collegesService: CollegesService, private fb: NonNullableFormBuilder) {

  }

  fetchStudentVocabularyData() {
    this.loading = true
    if (this.college_id) {
      this.collegesService.getAllStudentVocabularyData(this.college_id, this.pageSize, this.pageIndex).subscribe(data => {
        this.loading = false
        this.total = data.total
        this.student_data = data.data
        this.listOfDisplayData = [...this.student_data]
      })
    }
  }

  public listOfSelection = [
    {
      text: '全部选择',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ]

  public listOfColumn = [
    {
      title: '姓名',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.std_name.localeCompare(b.std_name),
      priority: false,
      filterFn: null
    },
    {
      title: '年级',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.grade - b.grade,
      priority: false,
      filterFn: null
    },
    {
      title: '累计打卡天数',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.total_day - b.total_day,
      priority: false,
      filterFn: null
    },
    {
      title: '连续打卡天数',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.continue_day - b.continue_day,
      priority: false,
      filterFn: null
    },
    {
      title: '日平均学习数',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.day_avg - b.day_avg,
      priority: false,
      filterFn: null
    },
    {
      title: '单词总量',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.total_study - b.total_study,
      priority: false,
      filterFn: null
    },
    {
      title: '完成度',
      compare: (a: stduentVocabualryData, b: stduentVocabualryData) => a.precent - b.precent,
      priority: false,
      filterFn: null
    },
  ]

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
    if (this.seacrchTag) {
      this.onSearchData()
    }
    else {
      this.fetchStudentVocabularyData()
    }
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    if (this.seacrchTag) {
      this.onSearchData()
    }
    else {
      this.fetchStudentVocabularyData()
    }
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange($event: readonly stduentVocabualryData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.std_id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.std_id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.std_id)) && !this.checked;
  }

  onSearchData() {
    if (!this.seacrchTag) {
      this.pageIndex = 1;
      this.pageSize = 10;
    }
    this.seacrchTag = true
    let username = this.validateForm.value.username;
    let grade = this.validateForm.value.grade
    this.loading = true
    if (this.college_id) {
      this.collegesService.getSearchStudentVocabularyData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade }, 'fetch').subscribe(data => {
        this.loading = false
        this.total = data.total
        this.student_data = data.data
        this.listOfDisplayData = [...this.student_data]
      })
    }
    else {
      alert('教学点id丢失，重新登录已获取id')
    }
  }

  onResetSearchBar() {
    this.seacrchTag = false
    this.validateForm.reset()
    this.pageIndex = 1;
    this.pageSize = 10;
    this.fetchStudentVocabularyData()
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.student_data.filter((item: stduentVocabualryData) => item.std_name.indexOf(this.searchValue) !== -1);
  }

  exportToExcel(jsonData: any[], fileName: string) {
    const fieldsMapList : any = {
      std_name: '学生姓名',
      grade: '年级',
      total_day: '累计打卡天数',
      continue_day: '连续打卡天数',
      day_avg: '日平均学习量',
      total_study: '学习总数',
      precent: '完成率',
    }

    const newJsonData = jsonData.map(item => {
      let newItem : any = {};
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
  }

  jsonCheck(condition: number): void {
    let now = new Date()
    let fileName = this.collegesService.collegeName + '_' + now.getTime()
    let jsonData: stduentVocabualryData[] = []
    if (condition === 0) {
      // 将JSON数据转换为工作表
      jsonData = this.listOfCurrentPageData.filter(item => this.setOfCheckedId.has(item.std_id))
      fileName += '_选择数据'
      this.exportToExcel(jsonData, fileName)
    }
    else {
      let username = this.validateForm.value.username;
      let grade = this.validateForm.value.grade
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

        this.collegesService.getSearchStudentVocabularyData(this.college_id, this.pageSize, this.pageIndex, { username: username, grade: grade }, c)
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

export interface stduentVocabualryData {
  std_name: string,
  std_id: string,
  total_day: number,
  continue_day: number,
  day_avg: number,
  total_study: number,
  precent: number,
  grade: number
}
