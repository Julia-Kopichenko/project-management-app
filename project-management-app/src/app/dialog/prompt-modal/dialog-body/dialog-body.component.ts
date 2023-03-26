/* eslint-disable no-return-assign */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  form!: FormGroup;

  isOneFieldForm: boolean;

  isOneFieldForm$: Observable<boolean> = this.modalService.oneFiledForm$;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string }
  ) {}

  ngOnInit(): void {
    this.subscription = this.isOneFieldForm$.subscribe((isOneField) => {
      this.isOneFieldForm = isOneField;

      if (!isOneField) {
        this.form = this.fb.group({
          title: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20),
            ],
          ],
          description: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
            ],
          ],
        });
      } else {
        this.form = this.fb.group({
          title: [
            '',
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(20),
            ],
          ],
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      value: form,
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
