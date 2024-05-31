import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VocabularyHomepageComponent } from '../../vocabulary-homepage/vocabulary-homepage.component';
import { VocabularyComponent } from '../vocabulary.component';
import { VocabularyCalendarComponent } from '../../vocabulary-calendar/vocabulary-calendar.component';
import { VocabularyDetailPageComponent } from '../../vocabulary-detail/vocabulary-detail-page/vocabulary-detail-page.component';
import { VocabularyDetailListComponent } from '../../vocabulary-detail-list/vocabulary-detail-list.component';



@NgModule({
  declarations: [
    // VocabularyHomepageComponent,
    // VocabularyComponent,
    // VocabularyCalendarComponent,
    // VocabularyDetailPageComponent,
    // VocabularyDetailListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class VocabularyModule { }
