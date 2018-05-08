import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { WidgetSectionComponent } from '../widget-section/widget-section.component';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../shared/services/page-action.service';
declare var $: any;

@Component({
  selector: 'app-widget-edit-section',
  templateUrl: './widget-edit-section.component.html',
  styleUrls: ['./widget-edit-section.component.scss']
})
export class WidgetEditSectionComponent implements OnInit {
  @Input('parent') parent;
  constructor(public elementRef: ElementRef, private sService: SectionActionService, private pService: PageActionService) { }

  ngOnInit() {
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  cloneSection(event: Event) {
    this.sService.cloneSectionByid(this.parent.section.id);
  }
  moveSection(event: Event, direction: number) {
    this.sService.moveSectionByid(this.parent.section, direction);
  }
  deleteSection(event: Event) {
    this.sService.deleteSection(this.parent);
  }
}
