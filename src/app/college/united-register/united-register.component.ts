import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject, first, takeUntil } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';
import * as XLSX from 'xlsx';
import { UnitedSubjectEditorComponent } from './united-subject-editor/united-subject-editor.component';
import { PrintService } from 'src/app/service/print/print.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { UnitedPaperComponent } from './united-paper/united-paper.component';
import { unitedPaper } from 'src/app/public/pages/united/united-register/united-user-paper/united-user-paper.component';
import { environment } from 'src/environments/environment';
import * as saveAs from 'file-saver';
import { DeleteGuestInfoComponent } from './delete-guest-info/delete-guest-info.component';

@Component({
  selector: 'app-united-register',
  templateUrl: './united-register.component.html',
  styleUrls: ['./united-register.component.scss']
})
export class UnitedRegisterComponent implements OnInit, OnDestroy {

  @ViewChild('pdfContainer', { read: ViewContainerRef }) container?: ViewContainerRef;

  private componentRefs: ComponentRef<any>[] = [];

  public processor: number = 0

  private college_id?: string

  public loading: boolean = true
  public exporting: boolean = false
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

  private notification: Subject<void> = new Subject<void>()

  ngOnInit(): void {
    this.college_id = localStorage.getItem('college')!
    this.fetchUnitedRegisterInfo()

    this.collegeService.unitedExamPaperEntriesSubject.pipe(takeUntil(this.notification)).subscribe(() => {
      this.fetchUnitedRegisterInfo()
    })
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

  changeSubject(id: unitedRegisterUserInfo) {
    this.collegeService.change_subject_data = id
    const modal = this.modal.create({
      nzTitle: '修改科目',
      nzContent: UnitedSubjectEditorComponent,
      nzFooter: null,
      nzCentered: true,
      nzStyle: { minWidth: '700px' }
    })

    modal.afterClose.subscribe(result => {
      if (result) {
        this.collegeService.changeSubject(id._id, result._f, result._c).pipe(first()).subscribe(res => {
          if (res.status) {
            this.modal.success({
              nzTitle: '修改成功',
              nzContent: '修改科目信息成功！'
            })
          }
          else {
            this.modal.error({
              nzTitle: '修改失败',
              nzContent: res.message
            })
          }

        })
      }
    })
  }

  getSubjectString(subject: string[]) {
    if (subject && subject.length === 2) {
      let result = ''
      subject[0] && subject[0].length !== 0 ? subject[1] && subject[1].length !== 0 ? result = `${subject[0]}，${subject[1]}` : result = subject[0] : subject[1] && subject[1].length !== 0 ? result += subject[1] : result = '公共课'
      return result
    } else {
      return subject.toString()
    }
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

  onValidate(condition: number, id: string) {
    const std_id_list = Array.from(this.setOfCheckedId)
    if (condition == 0) {
      this.collegeService.validateAccount(id, condition, [], false).subscribe(data => {
        if (data.status) {
          this.modal.success({
            nzTitle: '审核通过',
            nzContent: '审核状态通过'
          })
        }
      })
    }
    else if (condition === 1) {
      this.collegeService.validateAccount('', condition, std_id_list, false).subscribe(data => {
        if (data.status) {
          this.modal.success({
            nzTitle: '审核通过',
            nzContent: '审核状态通过'
          })
        }

      })
    }
    else {
      this.collegeService.validateAccount(id, condition, [], true).subscribe(data => {
        if (data.status) {
          this.modal.success({
            nzTitle: '审核取消',
            nzContent: '已取消审核资质'
          })
        }

      })
    }
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => { item.role === 'guest' ? this.updateCheckedSet(item._id, value) : '' });
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  deleteGuestUnited(data: unitedRegisterUserInfo) {
    const modal = this.modal.create({
      nzTitle: '删除访客信息',
      nzContent: DeleteGuestInfoComponent,
      nzFooter: null
    })

    modal.afterClose.subscribe(res => {

      this.collegeService.deleteGuestInfo(data._id, res.checked ? 1 : 0).pipe(first()).subscribe(res => {
        if (res.status) {
          this.modal.success({
            nzTitle: '删除成功',
            nzContent: '访客信息删除成功！'
          })
        }
        else {
          this.modal.error({
            nzTitle: '删除失败',
            nzContent: 'err：' + res.message
          })
        }
      })
    })
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
      found: '专业基础课',
      comphen: '专业综合课',
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

          else if (key === 'role') {
            item[key] = item[key] === 'guest' ? '非在籍' : '在籍'
          }

          newItem[fieldsMapList[key]] = item[key];
        }
        else {
          if (key === 'found' && item['subject'].length > 0) {
            newItem[fieldsMapList['found']] = item['subject'][0]
          }
          else if (key === 'comphen' && item['subject'].length > 1) {
            newItem[fieldsMapList['comphen']] = item['subject'][1]
          }
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

  constructor(private collegeService: CollegesService, private fb: NonNullableFormBuilder,
    private modal: NzModalService, private printService: PrintService) { }

  ngOnDestroy(): void {
    this.componentRefs.forEach(ref => ref.destroy());
    this.notification.next()
    this.notification.complete()
  }

  generatePDFs() {
    this.pdf = new jsPDF('p', 'mm', [148, 210]);
    this.exporting = true

    this.collegeService.getAllStudentsUnitedInfo(localStorage.getItem('information')!).pipe(first()).subscribe(async res => {
      const united_infos: unitedPaper[] = res.data

      let length = united_infos.length
      let slice_N = 10
      let slice_total = Math.floor(length / slice_N) + 1
      let maxPaperPerPage = 100
      let i = 0
      try {
        while (i < slice_total) {
          let sub = united_infos.slice(i * slice_N, i * slice_N + slice_N)
          let sub_length = sub.length
          await this.generater(sub, sub_length, i, slice_N)
          i++;
          this.processor = (i / slice_total) * 100
          if (i === slice_total) {
            const blob = this.pdf.output("blob")
            saveAs(blob, `${this.collegeService.collegeName}_${new Date().getFullYear()}_学生联考准考证_${Math.floor((i + 1)/maxPaperPerPage)}`);
            this.pdf = new jsPDF('p', 'mm', [148, 210]);
          }
        }
        this.exporting = false
        this.processor = 0
      }
      catch (err) {
        this.modal.error({
          nzTitle: '导出错误！',
          nzContent: `错误信息：${err}`
        })
        this.exporting = false
        this.processor = 0
      }
    })
  }

  async generater(data: unitedPaper[], length: number, slice_number: number, slice_N: number) {
    let i = 0
    while (i < length) {

      await new Promise(resolve => {
        let info = data[i]
        let url = environment.apiUrl + info.image_url
        this.collegeService.DownLoadImage(url).pipe(first()).subscribe(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.imageCache.set(url, reader.result as string);
            resolve(undefined)
          };
          reader.readAsDataURL(blob);
        })
      });
      i++
    }

    i = 0

    while (i < length) {
      let info = data[i]
      await new Promise(async resolve => {
        const componentRef = this.container!.createComponent(UnitedPaperComponent);
        componentRef.instance.united_info = info
        componentRef.instance.imageCache = this.imageCache
        this.componentRefs.push(componentRef);
        setTimeout(async () => {
          await this.exportToPDF(componentRef.location.nativeElement, 'temp', i === length - 1);
          componentRef.destroy(); // Destroy component after use
          resolve(null)
        }, 200)
      })
      i++
    }
  }

  download() {
    this.pdf.save('download.pdf')
  }

  async exportToPDF(element: HTMLElement, filename: string, isLast: boolean) {
    let canvas = await html2canvas(element, {
      scale: 2, // 增加分辨率以提高图像质量
      useCORS: true, // 允许加载跨域图片
    })
    this.createPDF(canvas, filename, isLast);
  }

  private async updateCanvas(element: HTMLElement, canvas: HTMLCanvasElement, filename: string, isLast: boolean) {
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
      await html2canvas(element, { canvas })
      this.createPDF(canvas, filename, isLast);
    }
  }

  private imageCache: Map<string, string> = new Map();

  private pdf = new jsPDF('p', 'mm', [148, 210]);

  private createPDF(canvas: HTMLCanvasElement, filename: string, isLast: boolean) {
    const contentDataURL = canvas.toDataURL('image/jpeg', 0.7);

    const imgHeight = 210; // A5 height in mm for landscape
    const imgWidth = 148; // A5 width in mm for landscape
    const imgRatio = canvas.width / canvas.height;
    const a4Ratio = imgWidth / imgHeight;

    let finalWidth, finalHeight;

    // Adjust dimensions to fit A4 landscape
    if (imgRatio > a4Ratio) {
      // Image is wider
      finalWidth = imgWidth;
      finalHeight = imgWidth / imgRatio;
    } else {
      // Image is taller or the same
      finalHeight = imgHeight;
      finalWidth = imgHeight * imgRatio;
    }

    // Center the image on the page
    const x = (imgWidth - finalWidth) / 2;
    const y = (imgHeight - finalHeight) / 2;


    this.pdf.addImage(contentDataURL, 'JPEG', 0, 0, 148, 210);

    if (isLast) {
      this.imageCache.clear()
      this.pdf.addPage();
    } else {
      // Add a new page if not the last component
      this.pdf.addPage();
    }
  }



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
