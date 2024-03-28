import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentPaperViewComponent } from './student-paper-view/student-paper-view.component';
import { ContentComponent } from './student-paper-view/content/content.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatTableModule } from '@angular/material/table'
import { SafeHtmlPipeV2 } from '../shared/safe-html-v2.pipe';
import { MathModule } from '../shared/math/math-service/math-service.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCN } from '../shared/MatPaginatorIntl';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    NavComponent,
    StudentListComponent,
    StudentPaperViewComponent,
    ContentComponent,
    SafeHtmlPipeV2
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MdbFormsModule,
    MatTableModule,
    MathModule,
    MatPaginatorModule
  ],
  providers: [ //注意：用useClass
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCN }
  ],
})
export class TeacherModule { }
