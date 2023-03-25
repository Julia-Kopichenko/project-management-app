import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private oneFiledForm$ = new BehaviorSubject<boolean>(true);

  setIsOneFiledForm(val: boolean) {
    this.oneFiledForm$.next(val);
  }

  isOneFiledForm(): boolean {
    return this.oneFiledForm$.getValue();
  }
}
