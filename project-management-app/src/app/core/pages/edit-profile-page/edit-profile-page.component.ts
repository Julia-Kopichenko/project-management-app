import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingUpData } from '@app/shared/models/interfaces/auth-interface';
import { EditProfileService } from '@app/shared/services/editProfile/edit-profile.service';
import { UserDataService } from '@app/shared/services/userData/user-data.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.scss'],
})
export class EditProfilePageComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  hide = true;

  data = 'Delete your profile?';

  constructor(
    private readonly editProfileService: EditProfileService,
    private location: Location,
    private readonly userDataService: UserDataService,
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
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit(): void {
    const userData: SingUpData = {
      name: this.form.value.name || '',
      login: this.form.value.login || '',
      password: this.form.value.password || '',
    };

    this.editProfileService.updateUser(userData);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteUser(event: any): void {
    if (event.clicked) {
      this.editProfileService.deleteUser();
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
