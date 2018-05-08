import { Directive, Input, HostListener } from '@angular/core';
import { SectionActionService } from '../services/section-action.service';
import { ComponentActionService } from '../services/component-action.service';

@Directive({
  selector: '[appOpenPopup]'
})
export class OpenPopupDirective {
  @Input('appOpenPopup') appOpenPopup;
  constructor(private sService: SectionActionService, private cService: ComponentActionService) { }

  @HostListener('click')
  openPopup() {
    if (this.appOpenPopup === this.sService.selectedSection) {
      return;
    }
    this.sService.sectionComponents.filter(sectionComponent => {
      return sectionComponent.section.type === 'popup';
    }).forEach(sectionComponent => {
      if (sectionComponent.section.id === this.appOpenPopup.section.id) {
        sectionComponent.section.popup.isShow = true;
      } else {
        sectionComponent.section.popup.isShow = false;
      }
    });
    if (this.sService.selectedSection) {
      this.cService.componentUpdated.emit({
        key: 'disableResize',
        section: this.sService.selectedSection.section
      });
    }
    this.sService.selectedSection = this.appOpenPopup;
    this.cService.componentUpdated.emit({
      key: 'enableResize',
      section: this.sService.selectedSection.section
    });
  }
}
