import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-united-register',
  templateUrl: './united-register.component.html',
  styleUrls: ['./united-register.component.scss']
})
export class UnitedRegisterComponent implements OnInit {

  private college_id?: string

  public loading: boolean = true
  public pageSize = 10
  public pageIndex = 1
  public total = 1

  public listOfDisplayData: unitedRegisterUserInfo[] = []

  public searchValue: string = '';
  public visible = false;
  public register_data: unitedRegisterUserInfo[] = [];

  public checked = false
  public indeterminate = false;

  private searchTag: boolean = false;

  public setOfCheckedId = new Set<string>();

  private listOfCurrentPageData: readonly unitedRegisterUserInfo[] = [];

  public expandSet = new Set<String>();

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')!
    this.fetchUnitedRegisterInfo()
  }

  fetchUnitedRegisterInfo() {
    this.loading = true
    this.collegeService.getUnitedRegisterInfo(this.pageIndex, this.pageSize).pipe(first()).subscribe(res => {
      this.total = res.total
      this.register_data = res.data
      this.listOfDisplayData = [...this.register_data]
      this.loading = false
    })
  }

  onResetSearchBar() {
    this.searchTag = false
    this.validateForm.reset()
    this.pageIndex = 1;
    this.pageSize = 10;
    this.fetchUnitedRegisterInfo()
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.register_data.filter((item: unitedRegisterUserInfo) => item.std_name.indexOf(this.searchValue) !== -1);
  }

  onSearchData() {
    if (!this.searchTag) {
      this.pageIndex = 1;
      this.pageSize = 10;
    }
    this.searchTag = true
    this.loading = true
    let std_name = this.validateForm.value.name
    let role = this.validateForm.value.role
    let paid = this.validateForm.value.paid
    if (this.college_id) {
      this.collegeService.getSearchUnitedRegisterInfo(this.pageSize, this.pageIndex, { name: std_name, role: role, paid: paid }, 'fetch').pipe(first()).subscribe(res => {
        this.loading = false
        this.total = res.total
        this.register_data = res.data
        this.listOfDisplayData = [...this.register_data]
      })
    }
    else {
      alert('教学点id丢失，重新登录已获取id')
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchUnitedRegisterInfo()
    }
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchUnitedRegisterInfo()
    }
  }

  onCurrentPageDataChange($event: readonly unitedRegisterUserInfo[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  checkSearchStatus() {
    return !(this.validateForm.value.name && this.validateForm.value.name.length !== 0)
      && !(this.validateForm.value.role && this.validateForm.value.role.length !== 0)
      && !(this.validateForm.value.paid! >= 0)
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item._id, value));
    this.refreshCheckedStatus();
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
    if (this.listOfCurrentPageData.length !== 0)
      this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item._id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item._id)) && !this.checked;
  }

  getPaidString(paid: number) {

    let result = this.PaidOption.filter(e => e.value === paid)
    return result[0].label
  }

  exportToExcel(jsonData: any[], fileName: string) {
    const fieldsMapList: any = {
      std_name: '学生姓名',
      role: '账户类别',
      subject: '报考科目',
      paid: '缴费状态',
      assignment: '分配状态'
    }

    const newJsonData = jsonData.map(item => {
      let newItem: any = {};
      Object.keys(fieldsMapList).forEach(key => {
        if (item.hasOwnProperty(key)) {
          if (key === 'paid') {
            item[key] = this.getPaidString(item[key])
          }
          else if (key === 'assignment') {
            item[key] = item[key] ? '已分配' : '未分配'
          }

          else if(key === 'role'){
            item[key] = item[key] === 'guest' ? '非在籍' : '在籍'
          }

          else if (key === 'subject') {
            let newOne = ''
            item[key].map((e : any) => {
              newOne += (e + ' / ')
            })
            item[key] = newOne
          }
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

  jsonCheck(condition: number): void {
    let now = new Date()
    let fileName = this.collegeService.collegeName + '_' + now.getTime()
    let jsonData: unitedRegisterUserInfo[] = []
    if (condition === 0) {
      // 将JSON数据转换为工作表
      jsonData = this.listOfCurrentPageData.filter(item => this.setOfCheckedId.has(item._id))
      fileName += '_选择数据'
      this.exportToExcel(jsonData, fileName)
    }
    else {
      let std_name = this.validateForm.value.name
      let role = this.validateForm.value.role
      let paid = this.validateForm.value.paid
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
        this.collegeService.getSearchUnitedRegisterInfo(this.pageSize, this.pageIndex, { name: std_name, role: role, paid: paid }, c).pipe(first()).subscribe(res => {
          this.loading = false
          jsonData = res.data
          this.exportToExcel(jsonData, fileName)
        })
      }
    }
  }

  constructor(private collegeService: CollegesService, private fb: NonNullableFormBuilder, private modal: NzModalService) { }


  public validateForm: FormGroup<{
    name: FormControl<string>;
    paid: FormControl<number>;
    role: FormControl<string>;
  }> = this.fb.group({
    name: [''],
    paid: [-1],
    role: ['']
  })

  public roleOption: roleOption[] = [
    {
      label: '非在籍',
      value: 'guest'
    },
    {
      label: '在籍',
      value: 'student'
    }
  ]


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
      compare: (a: unitedRegisterUserInfo, b: unitedRegisterUserInfo) => a.std_name.localeCompare(b.std_name),
      priority: false,

    },
    {
      title: '账户类型',
      compare: (a: unitedRegisterUserInfo, b: unitedRegisterUserInfo) => a.role.localeCompare(b.role),
      priority: false,

    },
    {
      title: '报考科目',
      compare: false,
      priority: false
    },
    {
      title: '分配状态',
      compare: false,
      priority: false
    },
    {
      title: '缴费状态',
      compare: (a: unitedRegisterUserInfo, b: unitedRegisterUserInfo) => a.paid - b.paid,
      priority: false,

    }
  ]

  public PaidOption: paidOption[] = [
    {
      value: 0,
      label: '未交费'
    },
    {
      value: 1,
      label: '已缴费，未审核'
    },
    {
      value: 2,
      label: '已缴费，已审核'
    },
    {
      value: 3,
      label: '无需缴费'
    },

  ]

}

export interface unitedRegisterUserInfo {
  _id: string,
  role: string,
  std_name: string,
  paid: number,
  subject: string[],
  assignment: boolean
}

export interface roleOption {
  label: string,
  value: string
}

export interface paidOption {
  label: string,
  value: number
}
