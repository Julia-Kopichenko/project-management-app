import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainPageService } from '@services/main-page/main-page.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  formGroup: FormGroup | null = null;

  constructor(
    private fb: FormBuilder,
    private mainPageService: MainPageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
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
  }

  onSubmit() {
    if (this.formGroup?.valid) {
      const newFormData = this.formGroup.value;

      this.mainPageService.createBoard(newFormData);
    }
  }
}
