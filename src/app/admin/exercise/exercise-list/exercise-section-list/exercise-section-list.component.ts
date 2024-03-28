import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { exerciseSection } from '../exercise-list.component';
import { AdminService } from 'src/app/service/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exercise-section-list',
  templateUrl: './exercise-section-list.component.html',
  styleUrls: ['./exercise-section-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ExerciseSectionListComponent implements OnInit {
  @Input() id : string = ''

  private sectionData : exerciseSection[] = []

  displayedColumns: string[] = ['章节名称', "题目数量", "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: exerciseSection | null = null;

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.adminService.exerciseSEntriesSubject.subscribe(req =>{
      this.fetchAllExericse()
    })
  }

  get dataSource() {
    return new MatTableDataSource<exerciseSection>(this.sectionData);
  }

  fetchAllExericse(){
    this.adminService.getAllExericiseSection(this.id)
    .pipe(first())
    .subscribe(data =>{
      this.sectionData = data.data
    })
  }
}
