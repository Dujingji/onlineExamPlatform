import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { canActivate } from '../service/router-guard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentPaperViewComponent } from './student-paper-view/student-paper-view.component';
import { ContentComponent } from './student-paper-view/content/content.component';

const routes: Routes = [
  {
    path: '', component: NavComponent, children: [{
      path: ':id', component: StudentListComponent
    }],
    canActivate: [canActivate]
  },
  {
    path: 'view/:std_id/:exam_id/:id', component: StudentPaperViewComponent,
    children: [{ path: '', component: ContentComponent }],
    canActivate: [canActivate]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
