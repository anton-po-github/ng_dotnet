import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableTemplate]',
  standalone: true
})
export class TableTemplateDirective {
  @Input('appTableTemplate') columnName!: string;

  constructor(public template: TemplateRef<any>) {}
}
