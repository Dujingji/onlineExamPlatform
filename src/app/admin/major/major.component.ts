import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { major } from 'src/modules/major/major';
import { MajorEditDialogComponent } from '../dialog/major-edit-dialog/major-edit-dialog.component';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';

@Component({
  selector: 'app-major',
  templateUrl: './major.component.html',
  styleUrls: ['./major.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MajorComponent {
  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  private majorData: major[] = []
  private found : string[] = []

  displayedColumns: string[] = ['ID', '学科名称', "学科类别", "所属基础课", "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns];
  expandedElement: major | null = null;

  ngOnInit(): void {
    this.fetchAllMajor()

    this.adminService.majorEntriesSubject.subscribe(() => {
      this.fetchAllMajor()
    })
  }

  get dataSource() {
    return new MatTableDataSource<major>(this.majorData);
  }

  fetchAllMajor() {
    this.adminService.getAllMajorEntries()
      .subscribe((data) => {
        console.log(data)
        this.majorData= data.major
        this.found = data._f
      })
  }

  onCreateMajor() {
    let dialogRef = this.dialog.open(MajorEditDialogComponent)
    let instance = dialogRef.componentInstance;

    instance.foundList = this.found

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: major = {
          name: result.name,
          ID: this.majorData.length + 1,
          type : result.type,
          arrg : result.arrg
        }
        this.adminService.addMajor(data).pipe(first()).subscribe((data) => {
          this.adminService.setSubmitExamStatus(data.status)
        })
        let SumbitDialogRef = this.dialog.open(ExamSubmitDialogComponent)
        SumbitDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.adminService.setSubmitExamStatus(false)
          }
        })
      }
    })
  }

  getMajorType(type : number){
    if(type == 0 || type == 1){
      return '公共课'
    }
    else if (type == 2){
      return '专业基础课'
    }else{
      return '专业综合课'
    }
  }

  onDeleteMajor(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteMajor(id).pipe(first()).subscribe((data) => { })
      }
    })
  }
}
