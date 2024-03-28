import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  public pageSize: number = 10
  public page: number = 0
  public total: number = 999
  public desiredPage : number = 0
  public totalPages : number = 0

  displayedColumns: string[] = ['学生姓名','教学点', '反馈时间', '专业', '位置', "内容", "是否纠错"];
  private feedbackData : feedback[] = []

  constructor(private adminService: AdminService) {

  }

  get dataSource() {
    return new MatTableDataSource<feedback>(this.feedbackData);
  }

  ngOnInit(): void {
    this.fetchAllFeedback()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }


  goToDesiredPage() {
    if (this.desiredPage > 0 && this.desiredPage <= this.totalPages) {
      this.paginator.pageIndex = this.desiredPage - 1;
      this.paginator._changePageSize(this.paginator.pageSize); // 手动触发页数变化事件
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex
    this.fetchAllFeedback()
  }

  fetchAllFeedback(){
    this.adminService.getFeedbackData(this.page, this.pageSize)
    .subscribe(data =>{
      this.feedbackData = data.feedback
      this.total = data.total
      this.totalPages = Math.ceil(this.total / this.pageSize);
    })
  }

  DateString(date: Date): string {
    let temp = new Date(date)
    return temp.getFullYear() + '年' + (temp.getMonth() + 1) + '月' + temp.getDate() + '日'
  }

  onDownloadData(){

  }

}

export interface feedback {
  std_name: string;
  college: string;
  feedback : string;
  date : string;
  status : boolean;
  position : string;
  major : string;
}
