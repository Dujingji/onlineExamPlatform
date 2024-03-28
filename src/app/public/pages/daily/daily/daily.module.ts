import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DailyRoutingModule } from './daily-route.routing';
import { DailyPaperNavComponent } from './daily-paper-nav/daily-paper-nav.component';
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
import { MathModule } from 'src/app/shared/math/math-service/math-service.module';
import { MatTableModule } from '@angular/material/table';
import { DailyPaperComponent } from './daily-paper/daily-paper.component';
import { SafeHtmlPipeV5 } from 'src/app/shared/safe-html-v5.pipe';


@NgModule({
  declarations: [
    DailyPaperNavComponent,
    DailyPaperComponent,
    SafeHtmlPipeV5
  ],
  imports: [
    CommonModule,
    RouterModule,
    DailyRoutingModule,
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
export class DailyModule { }
