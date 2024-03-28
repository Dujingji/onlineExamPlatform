import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamPageComponent } from './exam-paper.component';
import { ExamPaperComponent } from './exam-paper/exam-paper.component';
import { ExamResultComponent } from '../exam-result/exam-result/exam-result.component';
import { canActivate } from 'src/app/service/router-guard';


const routes: Routes = [
  {
    path: ':id', component: ExamPageComponent, children: [
      { path: '', component: ExamPaperComponent },
    ],
    canActivate: [canActivate]
  },
  {
    path: 'result/:id', component: ExamResultComponent, children: [
      { path: '', component: ExamPaperComponent }
    ],
    canActivate: [canActivate]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPageRoutingModule { }
