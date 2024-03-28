import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseContentComponent } from './exercise-content/exercise-content.component';
import { ExerciseNavComponent } from './exercise-nav/exercise-nav.component';
import { ExerciseRoutingModule } from './exercise.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MathModule } from 'src/app/shared/math/math-service/math-service.module';
import { SafeHtmlPipeV4 } from 'src/app/shared/safe-html-v4.pipe';
import { FeedbackDialogComponent } from 'src/app/dialog/dialog/feedback-dialog/feedback-dialog.component';
import { ExpendedButtonComponent } from 'src/app/shared/expended-button/expended-button.component';


@NgModule({
  declarations: [
    ExerciseContentComponent,
    ExerciseNavComponent,
    SafeHtmlPipeV4,
    FeedbackDialogComponent,
    ExpendedButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ExerciseRoutingModule,
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
    MatTableModule,
    MathModule
  ]
})
export class ExerciseModule { }
