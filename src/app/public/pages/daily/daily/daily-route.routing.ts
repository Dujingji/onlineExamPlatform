import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { DailyPaperNavComponent } from './daily-paper-nav/daily-paper-nav.component';
import { DailyPaperComponent } from './daily-paper/daily-paper.component';


const routes: Routes = [
  {
    path: ':year/:month/:day/:major', component: DailyPaperNavComponent, children: [
      { path: '', component: DailyPaperComponent },
    ],
    canActivate: [canActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyRoutingModule { }
