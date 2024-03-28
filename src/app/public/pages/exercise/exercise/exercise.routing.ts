import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { ExerciseNavComponent } from './exercise-nav/exercise-nav.component';
import { ExerciseContentComponent } from './exercise-content/exercise-content.component';

const routes: Routes = [
  {
    path: ':exc_id/:exc_detail_id', component: ExerciseNavComponent, children: [
      { path: '', component: ExerciseContentComponent },
    ],
    canActivate: [canActivate]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
