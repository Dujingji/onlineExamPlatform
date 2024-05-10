import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { UnitedComponent } from './united/united.component';
import { UnitedRegisterComponent } from './united-register/united-register.component';
import { UnitedResultComponent } from './united-result/united-result.component';

const routes: Routes = [
  {
    path: '', component: UnitedComponent,
    canActivate: [canActivate]
  },
  {
    path: 'register', component: UnitedRegisterComponent,
    canActivate: [canActivate]
  },
  {
    path: 'result', component: UnitedResultComponent,
    canActivate: [canActivate]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitedRoutesModule { }
