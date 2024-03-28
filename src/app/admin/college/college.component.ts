import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { college } from 'src/modules/college/college';
import { CollegeEditDialogComponent } from '../dialog/college-edit-dialog/college-edit-dialog.component';
import { ExamSubmitDialogComponent } from '../dialog/exam-submit-dialog/exam-submit-dialog.component';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CollegeComponent {
  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  private collegeData: college[] = []

  displayedColumns: string[] = ['教学点名称', '班级数量', '学生数量', "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: college | null = null;

  ngOnInit(): void {
    this.fetchAllCollege()

    this.adminService.collegeEntriesSubject.subscribe(() => {
      this.fetchAllCollege()
    })
  }

  get dataSource() {
    return new MatTableDataSource<college>(this.collegeData);
  }

  fetchAllCollege() {
    this.adminService.getAllCollegeEntries()
      .subscribe((data) => {
        console.log(data)
        this.collegeData = data.college
      })
  }

  onCreateCollege() {
    let dialogRef = this.dialog.open(CollegeEditDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data: college = {
          name: result.name,
          ID: this.collegeData.length + 1,
          classroom: [],
          student: 0
        }
        this.adminService.addCollege(data).pipe(first()).subscribe((data) => {
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

  onDeleteCollege(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {})
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteCollege(id).pipe(first()).subscribe((data) => { })
      }
    })
  }

}
