import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ExerciseService } from 'src/app/service/exercise/exercise.service';
import { PublicService, menuModel } from 'src/app/service/public/public.service';
import { exerciseModel } from 'src/modules/exercise/exercise';
import { major } from 'src/modules/major/major';

@Component({
  selector: 'app-exercise-page',
  templateUrl: './exercise-page.component.html',
  styleUrls: ['./exercise-page.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]

})
export class ExercisePageComponent implements OnInit {
  @ViewChild('content') content: ElementRef | undefined;

  public submitForm: FormGroup
  public submitForm1: FormGroup
  private std_id: string = localStorage.getItem("information")!
  private englishExericse: exerciseModel[] = []
  private politicsExericse: exerciseModel[] = []
  private foundExercise: exerciseModel[] = []
  private comprehensiveExercise: exerciseModel[] = []
  public major: string[] = []
  public type: number = 0
  public foundList: major[] = []
  public comprehensiveList: major[] = []
  public state: Array<string> = []


  constructor(private exerciseService: ExerciseService, private router: Router, private publicService: PublicService) {
    this.submitForm = new FormGroup({})
    this.submitForm1 = new FormGroup({})
  }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'found': new FormControl(undefined, [Validators.required])
    })
    this.submitForm1 = new FormGroup({
      'comprehensive': new FormControl(undefined, [Validators.required]),
    })
    this.retrieveData()

    this.exerciseService.majorEntriesSubject.subscribe(() => {
      this.retrieveData()
    })
  }

  get userInformation() {
    return localStorage.getItem("classroom")
  }

  getUrl(major: string, c: number) {
    if(c === 1){
      return major + ".jpg"
    }
    else{
      return major + "-子图.jpg"
    }
  }

  retrieveData(): void {
    this.exerciseService.getExerciseInformation(this.std_id).subscribe(data => {
      this.englishExericse = data.e_
      if (this.englishExericse.length !== 0)
        this.data.push(this.englishExericse)

      this.politicsExericse = data.p_
      if (this.politicsExericse.length !== 0)
        this.data.push(this.politicsExericse)

      this.foundExercise = data.f_
      if (this.foundExercise.length !== 0)
        this.data.push(this.foundExercise)

      this.comprehensiveExercise = data.c_
      if (this.comprehensiveExercise.length !== 0)
        this.data.push(this.comprehensiveExercise)

      this.major = data.major
      this.state = new Array<string>(this.major.length).fill('collapsed')
      this.type = data.type
      this.foundList = data._fl
      this.comprehensiveList = data._cl
    })
  }

  private data: Array<exerciseModel[]> = []

  displayedColumns: string[] = ['练习名称', '进度', "按钮"];

  getDataSource(index: number, major: string) {
    let filterList = this.data[index].filter(itme => itme.major === major)
    return filterList
  }

  setSubject(type: number, subject: string) {
    this.exerciseService.setSubject(this.std_id, type, subject)
  }

  navTo(e_id: string, e_model: string[]) {
    if (e_model.length !== 0) {
      this.exerciseService.getLastSection(this.std_id, e_id)
        .pipe(first())
        .subscribe(data => {
          this.router.navigateByUrl('/public/exercise/' + e_id + '/' + e_model[data.index])
        })
    }
  }

  toggleBlock(i: number) {
    this.state[i] = this.state[i] === 'expanded' ? 'collapsed' : 'expanded';
  }
}
