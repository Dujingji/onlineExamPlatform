import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import { UnitedService } from 'src/app/service/united/united.service';
import * as XLSX from 'xlsx';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateExamDialogComponent } from './create-exam-dialog/create-exam-dialog.component';
import { CreateClassroomDialogComponent } from './create-classroom-dialog/create-classroom-dialog.component';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss']
})
export class ExamsListComponent implements OnInit {

  public pageSize = 10
  public pageIndex = 1
  public total = 1

  private college_id: string | null = null
  private expandDataIndex: string = ''
  public listOfDisplayData: unitedExamInfo[] = []
  public MapOfClassroomData: Map<string, unitedExamClassroomInfo[]> = new Map()
  public loading: boolean = true
  public expandLoading: Map<number, boolean> = new Map()

  public validateForm: FormGroup<{
    name: FormControl<string>;
    major: FormControl<string[]>;
    date: FormControl<Date[]>;
    status: FormControl<number>
  }> = this.fb.group({
    name: [''],
    major: [new Array<string>()],
    date: [new Array<Date>()],
    status: [-1]
  })

  public searchValue: string = '';
  public visible = false;
  public exam_data: unitedExamInfo[] = [];

  public checked = false
  public indeterminate = false;
  public majorList: option[] = [];

  private searchTag: boolean = false;

  public setOfCheckedId = new Set<string>();

  private listOfCurrentPageData: readonly unitedExamInfo[] = [];

  public expandSet = new Set<String>();

  constructor(private collegeService: CollegesService, private fb: NonNullableFormBuilder, private modal: NzModalService) { }

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')!
    this.fetchUnitedExamInfo()

    this.collegeService.examEntriesSubject.subscribe((res) => {
      this.collegeService.fetchExamClassroomInfo(this.college_id ? this.college_id : "", this.collegeService.change_exam_id)
        .pipe(first())
        .subscribe(res => {
          this.MapOfClassroomData.set(this.collegeService.change_exam_id, res.data)
        })
      this.fetchUnitedExamInfo()
    })
  }

  fetchUnitedExamInfo() {
    this.loading = true
    if (this.college_id) {
      this.collegeService.fetchAllUntiedExam(this.pageSize, this.pageIndex, this.college_id)
        .pipe(first())
        .subscribe((data) => {
          this.exam_data = data.data
          this.total = data.total
          this.listOfDisplayData = [...this.exam_data]
          this.loading = false
        })
    }
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.exam_data.filter((item: unitedExamInfo) => item.name.indexOf(this.searchValue) !== -1);
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.pageIndex = 1;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchUnitedExamInfo()
    }
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    if (this.searchTag) {
      this.onSearchData()
    }
    else {
      this.fetchUnitedExamInfo()
    }
  }

  onSearchData() {
    if (!this.searchTag) {
      this.pageIndex = 1;
      this.pageSize = 10;
    }
    this.searchTag = true
    let name = this.validateForm.value.name;
    let major = this.validateForm.value.major;
    let status = this.validateForm.value.status;
    let start = this.validateForm.value.date ? this.validateForm.value.date[0] : undefined;
    let end = this.validateForm.value.date ? this.validateForm.value.date[1] : undefined;
    this.loading = true
    if (this.college_id) {
      //
    }
    else {
      alert('教学点id丢失，重新登录已获取id')
    }
  }

  onCurrentPageDataChange($event: readonly unitedExamInfo[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item._id, value));
    this.refreshCheckedStatus();
  }

  onResetSearchBar() {
    this.searchTag = false
    this.validateForm.reset()
    this.pageIndex = 1;
    this.pageSize = 10;
    this.fetchUnitedExamInfo()
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

  checkSearchStatus() {
    return !this.validateForm.value.name && !this.validateForm.value.major
      && (!this.validateForm.value.date)
  }

  onExpandChange(id: string, index: number, checked: boolean): void {
    let data = this.exam_data[index]
    if (!data.fetchExpandData && this.college_id) {
      this.expandLoading.set(index, true)
      this.expandDataIndex = data._id
      this.collegeService.fetchExamClassroomInfo(this.college_id, data._id)
        .pipe(first())
        .subscribe(res => {
          data.fetchExpandData = true
          this.MapOfClassroomData.set(data._id, res.data)
          this.expandLoading.set(index, false)
        })
    }
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  onEdit(data: unitedExamInfo) {
    this.collegeService.exam_data = data
    //打开一个会话框
    const modal = this.modal.create({
      nzTitle: '创建考试',
      nzContent: CreateExamDialogComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: { minWidth: '700px' }
    })

    modal.afterClose.subscribe(result => {
      if (result) {
        let time = new Date(result.date[1]).getTime() - new Date(result.date[0]).getTime()
        let submit: submitDataModel = {
          college_id: this.college_id ? this.college_id : '',
          name: result.name,
          start_date: result.date[0],
          end_date: result.date[1],
          time: time / 1000,
          major: result.major,
          status: result.status,
          location: result.location,
          notification: result.notification
        }
        this.collegeService.editUnitedExam(submit, data._id).pipe(first()).subscribe(data => {
          if (data.status) {
            const modal = this.modal.success({
              nzTitle: '提交成功',
              nzContent: '修改信息成功！'
            });
          }
        })
      }
      this.collegeService.exam_data = undefined
    });
  }

  onClassroomEdit(data: unitedExamClassroomInfo) {
    this.collegeService.classroom_data = data
    const modal = this.modal.create({
      nzTitle: '创建考试教室',
      nzContent: CreateClassroomDialogComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: { minWidth: '700px' }
    });

    this.collegeService.change_exam_id = data.exam_id
    //进行数据提交
    modal.afterClose.subscribe(result => {
      if (result) {
        let submit: submitClassroomData = {
          exam_id: data.exam_id,
          college_id: this.college_id ? this.college_id : '',
          name: result.name,
          site_number: result.site_number
        }

        this.collegeService.editUnitedExamClassroom(submit, data._id).pipe(first()).subscribe(data => {
          if (data.status) {
            const modal = this.modal.success({
              nzTitle: '提交成功',
              nzContent: '修改信息成功！'
            });
          }
        })
      }
      this.collegeService.classroom_data = data
    });

  }

  onDelete(condition: number, exam_id: string, name: string) {
    this.collegeService.change_exam_id = ''
    if (condition === 0) {
      this.modal.confirm({
        nzTitle: '确定删除吗？',
        nzContent: `确定删除 ${name} 吗？删除后无法恢复！请谨慎删除`,
        nzOkText: '确定',
        nzCancelText: '取消',
        nzOnOk: () => { return { status: true } }
      }).afterClose.subscribe(result => {
        if (result && result.status) {
          this.collegeService.deletedUnitedExam(exam_id, condition, []).subscribe(res => {
            if (res.status) {
              this.modal.success({
                nzTitle: '删除考试',
                nzContent: '删除考试成功！'
              });
            }
          })
        }
      })
    } else {
      this.modal.confirm({
        nzTitle: '确定删除吗？',
        nzContent: `确定删除选中的 ${this.setOfCheckedId.size} 个考试吗？删除后无法恢复！请谨慎删除`,
        nzOkText: '确定',
        nzCancelText: '取消',
        nzOnOk: () => { return { status: true } }
      }).afterClose.subscribe(result => {
        if (result && result.status) {
          let exam_id_list = Array.from(this.setOfCheckedId)
          this.collegeService.deletedUnitedExam('', condition, exam_id_list).subscribe(res => {
            if (res.status) {
              this.modal.success({
                nzTitle: '删除考试',
                nzContent: '已删除所以选择的考试！'
              });
            }
          })
        }
      })
    }
  }

  onDeleteClassroom(classroom_id: string, name: string, exam_id: string) {
    this.modal.confirm({
      nzTitle: '确定删除吗？',
      nzContent: `确定删除 ${name} 吗？删除后无法恢复！请谨慎删除`,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => { return { status: true } }
    }).afterClose.subscribe(result => {
      if (result && result.status) {
        this.collegeService.change_exam_id = exam_id
        this.collegeService.deletedUnitedExamClassroom(classroom_id).subscribe(res => {
          if (res.status) {
            this.modal.success({
              nzTitle: '删除教室',
              nzContent: '删除教室成功！'
            });
          }
        })
      }
    })
  }

  onCreate() {
    //打开一个会话框
    const modal = this.modal.create({
      nzTitle: '创建考试',
      nzContent: CreateExamDialogComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: { minWidth: '700px' }
    })

    //进行数据提交
    modal.afterClose.subscribe(result => {
      if (result) {
        let time = new Date(result.date[1]).getTime() - new Date(result.date[0]).getTime()
        let submit: submitDataModel = {
          college_id: this.college_id ? this.college_id : '',
          name: result.name,
          start_date: result.date[0],
          end_date: result.date[1],
          time: time / 1000,
          major: result.major,
          status: result.status,
          location: result.location,
          notification: result.notification
        }
        this.collegeService.createUnitedExam(submit).pipe(first()).subscribe(data => {
          if (data.status) {
            const modal = this.modal.success({
              nzTitle: '提交成功',
              nzContent: '考试创建成功！'
            });
          }
        })
      }
    });
  }

  onCreateClassroom(exam_id: string) {
    //打开一个会话框
    const modal = this.modal.create({
      nzTitle: '创建考试教室',
      nzContent: CreateClassroomDialogComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: { minWidth: '700px' }
    });

    this.collegeService.change_exam_id = exam_id

    //进行数据提交
    modal.afterClose.subscribe(result => {
      if (result) {
        let submit: submitClassroomData = {
          exam_id: exam_id,
          college_id: this.college_id ? this.college_id : '',
          name: result.name,
          site_number: result.site_number
        }

        this.collegeService.createUnitedExamClassroom(submit).pipe(first()).subscribe(data => {
          if (data.status) {
            const modal = this.modal.success({
              nzTitle: '提交成功',
              nzContent: '班级创建成功！'
            });
          }
        })

      }
    });
  }

  assignMember(exam_id: string, data: unitedExamInfo) {
    this.modal.info({
      nzTitle: '自动分配',
      nzContent: `<p>点击确认将进行自动分配 </p> <p> 教室数量：${data.exam_classroom.length}， 报考人数：${data.registed_member.length} </p> `,
      nzOnOk: () => { return { status: true } }
    })
      .afterClose
      .subscribe(result => {
        if (result && result.status) {

          this.collegeService.change_exam_id = exam_id

          this.collegeService.autoAssignMember(exam_id)
            .pipe(first())
            .subscribe(res => {
              if (res.status) {
                this.modal.success({
                  nzTitle: '分配成功',
                  nzContent: '自动分配成功！'
                })
              } else {
                this.modal.error({
                  nzTitle: '分配失败',
                  nzContent: res.message
                });
              }
            })
        }
      })
  }

  getStautsString(status: number) {

    switch (status) {
      case 0:
        return '报名中...'
      case 1:
        return '请分配教室...'
      case 2:
        return '等待考试开始...'
      case 3:
        return '考试进行中...'
      case 4:
        return '等待上传成绩...'
      case 5:
        return '流程结束'
      default:
        return ''
    }
  }

  getDateString(data: unitedExamInfo) {
    return new Date(data.start_date).toLocaleString() + ' - ' + new Date(data.end_date).toLocaleString()
  }

  getTimeString(data: unitedExamInfo) {
    let time = new Date(data.end_date).getTime() - new Date(data.start_date).getTime()
    let hour = Math.floor(time / 1000 / 3600)
    let mins = Math.floor(time / 1000 % 3600 / 60)
    let sec = Math.floor(time / 1000 % 3600 % 60)
    return `${hour} 时 ${mins} 分 ${sec} 秒 `
  }

  public listOfSelection = [
    {
      text: '全部选择',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ]

  public listOfExpandColum = [
    {
      title: '班级名称'
    },
    {
      title: '座位总数'
    },
    {
      title: '已分配人数'
    }
  ]

  public listOfColumn = [
    {
      title: '考试名称',
      compare: (a: unitedExamInfo, b: unitedExamInfo) => a.name.localeCompare(b.name),
      priority: false,

    },
    {
      title: '科目',
      compare: (a: unitedExamInfo, b: unitedExamInfo) => a.major.localeCompare(b.major),
      priority: false,

    },
    {
      title: '地点',
      compare: false,
      priority: false
    },
    {
      title: '考试时间',
      compare: (a: unitedExamInfo, b: unitedExamInfo) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
      priority: false,

    },
    {
      title: '时长',
      compare: false,
      priority: false,

    },
    {
      title: '教室数量',
      compare: false,
      priority: false
    },
    {
      title: '参考人数',
      compare: (a: unitedExamInfo, b: unitedExamInfo) => a.registed_member.length - b.registed_member.length,
      priority: false,
    },
    {
      title: '状态',
      compare: (a: unitedExamInfo, b: unitedExamInfo) => a.status - b.status,
      priority: false
    }
  ]

}

export interface unitedExamInfo {
  name: string,
  major: string,
  start_date: Date,
  end_date: Date
  time: number,
  status: number
  registed_member: string[]
  exam_classroom: string[]
  notification: string
  _id: string,
  location: string,
  fetchExpandData: boolean
}

export interface unitedExamClassroomInfo {
  _id: string,
  exam_id: string
  member: memberModel[],
  site_number: number,
  college: string,
  college_id: string,
  name: string
}

interface memberModel {
  std_id: string,
  name: string,
  role: string
}

export interface timeSpam {
  hour: number,
  mins: number,
  sec: number
}

interface option {
  label: string,
  value: string
}

export interface submitDataModel {
  college_id: string,
  name: string,
  start_date: Date,
  end_date: Date,
  time: number,
  major: string,
  status: number,
  location: string,
  notification: string
}

export interface submitClassroomData {
  exam_id: string,
  college_id: string,
  name: string,
  site_number: number
}
