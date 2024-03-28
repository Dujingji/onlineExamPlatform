import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { MathContent, MathServiceImpl } from "src/modules/mathContent/math-content";

@Directive({
  selector: '[appMath]'
})
export class MathDirective implements OnInit, OnChanges, OnDestroy {
  private alive$ = new Subject<boolean>();

  @Input()
  appMath?: MathContent;
  private readonly _el: HTMLElement;

  constructor(private service: MathServiceImpl,
    private el: ElementRef) {
    this._el = el.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    this.service
      .ready()
      .pipe(
        take(1),
        takeUntil(this.alive$)
      ).subscribe(res => {
        this.service.render(this._el, this.appMath);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {
    this.alive$.next(false);
  }
}
