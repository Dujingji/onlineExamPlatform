
import { Component, OnInit} from '@angular/core';
import { Paper, questions, section } from 'src/modules/paper/paper';
import { ActivatedRoute } from '@angular/router';

import * as ClassicEditor from '../../../../../shared/ckeditor'
import { AdminService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-papers-content',
  templateUrl: './papers-content.component.html',
  styleUrls: ['./papers-content.component.scss']
})
export class PapersContentComponent implements OnInit{
  public paper_id?: string
  public selectedPaper = null;
  public questionPerPage: number = 3;
  public selectPage = 1;
  public paperData?: Paper;
  public Editor = ClassicEditor

  constructor(private Activatedroute: ActivatedRoute, private adminService: AdminService) {
  }

  onReady(editor: any) {
    if (editor.ui.view.editable.element.parentElement) {
      editor.ui.view.editable.element.parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.view.editable.element
      );
    }
  }

  ngOnInit(): void {
    this.paper_id = this.Activatedroute.snapshot.paramMap.get('id')!;
    this.retrieveData(this.paper_id)
  }

  get section() : section[]{
    if(this.paperData){
      return this.paperData.section
    }
    return []
  }

  getAnswer(i: number): number {
    if (this.paperData) {
      return this.convertN(this.paperData.questions[i].answer)
    }
    return 0
  }

  calMultQ(i: number, a: number): boolean {
    if (Math.floor(a % Math.pow(10, i + 1) / Math.pow(10, i)) == 0) {
      return false
    }
    return true
  }

  getQuestions(n: number): questions[] {
    if (this.paperData) {
      let start = 0
      let end = this.paperData.n[0]
      for (let i = 0; i < n; i++) {
        start += this.paperData.n[i]
        end += this.paperData.n[i + 1]
      }
      return this.paperData.questions.slice(start, end)
    }
    return []
  }

  currentIndex(n: number): number {
    let total = 0
    if (this.paperData) {
      for (let i = 0; i < n; i++) {
        total += this.paperData.n[i]
      }
    }
    return total
  }

  retrieveData(id: string) {
    this.adminService.getPaperView(id)
      .subscribe((data) => {
        this.paperData = data.paper;
      })
  }

  convertN(input: string): number {
    let r = 0;
    switch (input) {
      case "A": {
        r = 0;
        break;
      }
      case "B": {
        r = 1;
        break;
      }
      case "C": {
        r = 2;
        break;
      }
      case "D": {
        r = 3;
        break;
      }
      case "E": {
        r = 4;
        break;
      }
    }
    return r;
  }

  convert(input: number): string {
    let r = "";
    switch (input) {
      case 0: {
        r = "A";
        break;
      }
      case 1: {
        r = "B";
        break;
      }
      case 2: {
        r = "C";
        break;
      }
      case 3: {
        r = "D";
        break;
      }
      case 4: {
        r = "E";
        break;
      }
    }
    return r;
  }
}
