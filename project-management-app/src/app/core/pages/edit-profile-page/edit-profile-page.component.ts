import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditProfileService } from '@app/shared/services/editProfile/edit-profile.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  hide = true;

  data = 'Delete your profile?';

  public currentUserData = {
    name: '',
    login: '',
    password: '',
  };

  constructor(
    private readonly editProfileService: EditProfileService,
    private readonly translocoService: TranslocoService
  ) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete your profile?';
        } else {
          this.data = 'Удалить ваш профиль?';
        }
      })
    );
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  deleteUser(event: any) {
    if (event.clicked) {
      this.editProfileService.deleteUser();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
