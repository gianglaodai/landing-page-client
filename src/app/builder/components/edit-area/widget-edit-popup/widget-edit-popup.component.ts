import { Component, OnInit, Input } from '@angular/core';
import { WidgetSectionComponent } from '../widget-section/widget-section.component';
import { element } from 'protractor';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { SectionActionService } from '../../../../shared/services/section-action.service';

@Component({
  selector: 'app-widget-edit-popup',
  templateUrl: './widget-edit-popup.component.html',
  styleUrls: ['./widget-edit-popup.component.scss']
})
export class WidgetEditPopupComponent implements OnInit {
  @Input('parent') parent;

  constructor(private sService: SectionActionService, private cService: ComponentActionService) { }

  ngOnInit() {
  }
  deletePopup(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.sService.deleteSection(this.parent);
  }

  clonePopup(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const selectedId: string = this.parent.section.id;
    this.sService.cloneSectionByid(selectedId);
  }
  closePopup(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cService.componentUpdated.emit({
      key: 'disableResize',
      section: this.parent.section
    });
    this.sService.selectedSection = null;
    this.parent.section.popup.isShow = false;
  }
}
