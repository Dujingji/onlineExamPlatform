import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { HomePageModule } from './home-page/home-page.module';


@NgModule({
  declarations: [
    PublicComponent
  ],
  exports:[],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    HomePageModule
  ]
})
export class PublicModule { }
