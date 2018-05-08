import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalPopupTemplateComponent } from '../components/edit-area/modal/modal-popup-template/modal-popup-template.component';

@Directive({
  selector: '[appOpenModalPopup]'
})
export class OpenModalPopupDirective {
  constructor(private dialog: MatDialog) { }
  @HostListener('click') onClick() {
    this.dialog.open(ModalPopupTemplateComponent, {
      width: '700px',
      autoFocus: false
    });
  }

}
