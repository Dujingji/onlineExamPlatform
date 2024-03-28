import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, filter} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Paper } from 'src/modules/paper/paper';
import { answerModel } from 'src/app/public/pages/exam-page/exam-paper/exam-paper.component';
import { AdminService } from 'src/app/service/admin/admin.service';


@UntilDestroy()
@Component({
  selector: 'app-papers-view',
  templateUrl: './papers-view.component.html',
  styleUrls: ['./papers-view.component.scss']
})
export class PapersViewComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public paperData?: Paper
  public selectedList: answerModel[] = []

  private paper_id?: string
  public sumbitStauts = false

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private router: Router,
    private adminService: AdminService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.paper_id = this.route.snapshot.paramMap.get('id')!
    this.retrieveData(this.paper_id)
  }

  get paper() {
    if (this.paperData) {
      return this.paperData.paper
    }
    return ""
  }

  get section() {
    if (this.paperData) {
      return this.paperData.section
    }
    return []
  }

  get ID() {
    return this.paper_id
  }

  retrieveData(id: string): void {
    this.adminService.getPaperView(id)
      .subscribe((data) => {
        this.paperData = data.paper;
      })
  }

  WaringChanged(i: number, id: string) {
    let path = "/admin/paperView/" + id + '#' + i
    window.location.assign(path)
  }

  correctIndex(i: number): number {
    let count = 0;
    if (this.paperData) {
      this.paperData.n.forEach((element, index) => {
        if (index < i) {
          count += element
        }
      })
    }
    return count
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
