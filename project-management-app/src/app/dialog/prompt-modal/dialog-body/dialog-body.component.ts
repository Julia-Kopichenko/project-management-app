/* eslint-disable no-return-assign */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
})
export class DialogBodyComponent implements OnInit {
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
    this.isOneFieldForm$.subscribe((value) => {
      console.log(value);
      this.isOneFieldForm = value;

      if (value) {
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
}
