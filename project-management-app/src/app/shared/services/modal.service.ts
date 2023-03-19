import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //! fix
  private oneFiledForm$ = new BehaviorSubject<boolean>(true);
  // private oneFiledForm$ = new BehaviorSubject<boolean>(false);

  setOneFiledForm() {
    this.oneFiledForm$.next(true);
  }

  setTwoFiledForm() {
    this.oneFiledForm$.next(false);
  }

  isOneFiledForm(): boolean {
    return this.oneFiledForm$.getValue();
  }
}
