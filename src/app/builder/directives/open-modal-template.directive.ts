import { Directive, Input, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalSectionTemplateComponent } from '../components/edit-area/modal/modal-section-template/modal-section-template.component';

@Directive({
  selector: '[appOpenModalTemplate]'
})
export class OpenModalTemplateDirective {
  @Input('sectionId') sectionId;
  constructor(private dialog: MatDialog) { }
  @HostListener('click') onClick() {
    this.dialog.open(ModalSectionTemplateComponent, {
      width: '700px',
      data: { sectionId: this.sectionId },
      autoFocus: false
    });
  }
}
