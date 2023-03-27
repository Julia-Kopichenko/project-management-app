import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickStopPropagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick(event: any): void {
    event.stopPropagation();
  }
}
