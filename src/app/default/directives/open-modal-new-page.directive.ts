import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalNewPageComponent } from '../components/modal-new-page/modal-new-page.component';

@Directive({
  selector: '[appOpenModalNewPage]'
})
export class OpenModalNewPageDirective {

  constructor(private dialog: MatDialog) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(ModalNewPageComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}
