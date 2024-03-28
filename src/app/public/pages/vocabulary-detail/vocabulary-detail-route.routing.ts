import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { VocabularyDetailPageComponent } from './vocabulary-detail-page/vocabulary-detail-page.component';


const routes: Routes = [
  {
    path: '', component: VocabularyDetailPageComponent,
    canActivate: [canActivate]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VocabularyDetailRoute { }
