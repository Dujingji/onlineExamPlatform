import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/admin.service';
import { saveAs } from 'file-saver';
import { Subscription, first } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { exerciseModel } from 'src/modules/exercise/exercise';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExerciseListComponent implements OnInit{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  fileName: string = ''
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;

  private exerciseData : exerciseModel[] = []

  submitForm : FormGroup
  public pageSize: number = 10
  public page: number = 0
  public total: number = 0
  public desiredPage : number = 0
  public totalPages : number = 0
  public majorName : string = ''
  private expended : boolean = false

  displayedColumns: string[] = ['题库名称', '所属专业', '章节数目',  "题目数量", '上传时间', "按钮"];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: exerciseSection | null = null;

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) {
    this.submitForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'major': new FormControl('', [Validators.required])
    })
    this.fetchAllExericse()

    this.adminService.exerciseEntriesSubject.subscribe(response => {
      this.fetchAllExericse()
    })
  }

  expendedEvent(i : number){
    this.expended = !this.expended
    if(this.expended){
      this.adminService.exerciseSEntriesSubject.next()
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.onPageChange(event);
    });
  }

  date(data: any) {
    let temp = new Date(data).toLocaleString()
    return temp
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
    this.fetchAllExericse()
  }

  onSearch(){
    if( this.submitForm.value.major.length !== 0){
      this.adminService.getAllExerciseTitle(this.page, this.pageSize, 1, this.submitForm.value.major)
      .subscribe((data) => {
        this.exerciseData = data.data
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
    }
    else{
      this.adminService.getAllExerciseTitle(this.page, this.pageSize, 0, '')
      .subscribe((data) => {
        this.exerciseData = data.data
        this.total = data.total
        this.totalPages = Math.ceil(this.total / this.pageSize);
      })
    }
  }

  fetchAllExericse(){
    this.adminService.getAllExerciseTitle(this.page, this.pageSize, 0, '')
    .pipe(first())
    .subscribe(data =>{
      this.exerciseData = data.data
      this.total = data.total
      this.totalPages = Math.ceil(this.total / this.pageSize);
    })
  }

  get dataSource() {
    return new MatTableDataSource<exerciseModel>(this.exerciseData);
  }

  onDownloadTemp() {
    this.adminService.downloadExerciseTemp().subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL)
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();
      formData.append("file", file, this.fileName);
      const upload = this.adminService.uploadExc(formData)
      this.uploadSub = upload.subscribe((event) => {
        if (event.type == HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          this.reset()
        }
      })
    }
  }

  cancelUpload() {
    if (this.uploadSub) this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
    this.fileName = ''
  }

  onDelete(id : string){
    this.adminService.deleteExercise(id).subscribe(data =>{

    })
  }

  onExportData(id : string){
    this.adminService.exportExerciseData(id).subscribe(data => {
      let downloadURL = window.URL.createObjectURL(data);
      saveAs(downloadURL)
    })
  }
}

export interface exerciseSection{
  name : string,
  ID : string,
  length : number
}
