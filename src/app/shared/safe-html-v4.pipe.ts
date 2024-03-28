import { DomSanitizer } from '@angular/platform-browser'
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtmlV4'})
export class SafeHtmlPipeV4 implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {

  }
  transform(html : any) {
    return this.sanitized.bypassSecurityTrustHtml(html);
  }
}
