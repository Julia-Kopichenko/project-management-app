import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnDestroy {
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;

  @Input() oneFieldForm = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent);

    this.subscription = dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
