import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  oneFiledForm$ = new BehaviorSubject<boolean>(true);

  setIsOneFiledForm(val: boolean): void {
    this.oneFiledForm$.next(val);
  }
}
