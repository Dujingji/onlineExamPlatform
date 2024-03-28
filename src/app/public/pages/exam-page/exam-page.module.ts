import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExamPageRoutingModule } from './exam-page-routing.module';
import { PapersViewComponent } from 'src/app/admin/exams/papers-list/papers-view/papers-view.component';
import { PapersContentComponent } from 'src/app/admin/exams/papers-list/papers-view/papers-content/papers-content.component';
import { ExamResultComponent } from '../exam-result/exam-result/exam-result.component';
import { ResultPageComponent } from '../exam-result/exam-result/result-page/result-page.component';
import { ExamPageComponent } from './exam-paper.component';
import { ExamPaperComponent } from './exam-paper/exam-paper.component';
import { SafeHtmlPipe } from 'src/app/shared/safe-html.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog/dialog.component';
import { SumbitDialogComponent } from 'src/app/dialog/dialog/sumbit-dialog/sumbit-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MathModule } from '../../../shared/math/math-service/math-service.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ExamPageComponent,
    ExamPaperComponent,
    DialogComponent,
    SumbitDialogComponent,
    ExamResultComponent,
    ResultPageComponent,
    PapersViewComponent,
    PapersContentComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    CKEditorModule,
    ExamPageRoutingModule,
    MatTableModule,
    MathModule
  ],
  providers:[]
})
export class ExamPageModule { }
