import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeRoutingModule } from './college-routing.module';
import { CollegeNavComponent } from './college-nav/college-nav.component';
import { CollegeHomePageComponent } from './college-home-page/college-home-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    CollegeNavComponent,
    CollegeHomePageComponent
  ],
  imports: [
    CommonModule,
    CollegeRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzDropDownModule,
    NzInputModule
  ]
})
export class CollegeModule { }
