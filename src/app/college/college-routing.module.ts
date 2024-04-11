import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { CollegeNavComponent } from './college-nav/college-nav.component';
import { CollegeHomePageComponent } from './college-home-page/college-home-page.component';

const routes: Routes = [
  {

    path: '', component: CollegeNavComponent,
    children: [{
      path: '', component: CollegeHomePageComponent
    }],
    canActivate: [canActivate]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeRoutingModule { }
