import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalIconComponent } from '../components/edit-area/modal/modal-icon/modal-icon.component';

@Directive({
  selector: '[appOpenModalIcon]'
})
export class OpenModalIconDirective {
  @Input('component') component;
  constructor(private dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(ModalIconComponent, {
      width: '900px',
      autoFocus: false,
      data: { component: this.component, type: 'url' }
    });
  }

}
