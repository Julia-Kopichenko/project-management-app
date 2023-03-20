import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //! fix
  private oneFiledForm$ = new BehaviorSubject<boolean>(true);
  // private oneFiledForm$ = new BehaviorSubject<boolean>(false);

  setIsOneFiledForm(val: boolean) {
    this.oneFiledForm$.next(val);
  }

  isOneFiledForm(): boolean {
    return this.oneFiledForm$.getValue();
  }
}
