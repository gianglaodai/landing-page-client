import { Component, OnInit, ElementRef, ViewChild, Input, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import * as componentType from '../../../../shared/common/component-type';
import { WidgetEditSectionComponent } from '../widget-edit-section/widget-edit-section.component';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { WidgetSection } from '../../../../shared/interfaces/widget-section';
import { SectionRangeComponent } from '../section-range/section-range.component';
import { WidgetElementComponent } from '../widget-element/widget-element.component';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { ConvertRectPipe } from '../../../../shared/pipes/convert-rect.pipe';
declare var $: any;

@Component({
  selector: 'app-section',
  templateUrl: './widget-section.component.html',
  styleUrls: ['./widget-section.component.scss']
})
export class WidgetSectionComponent implements OnInit {
  @Input('section') section: WidgetSection;
  @ViewChild('sectionRange') sectionRange;
  @ViewChildren('childrensElm') childrensElm: QueryList<WidgetElementComponent>;
  componentType = componentType;
  constructor(private sService: SectionActionService, private cService: ComponentActionService, public elementRef: ElementRef,
    private pService: PageActionService, private rectPipe: ConvertRectPipe) {
  }
  ngOnInit() {
    this.sService.sectionComponents.push(this);
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  getPosition(component) {
    const rect = this.isMobile ? component.mobileRect : component.rect;
    if (!rect) {
      return null;
    }
    const rectStyle = {};
    Object.entries(rect).forEach(entry => {
      Object.entries(entry[1]).forEach(property => {
        rectStyle[property[0]] = property[1].toString() + 'px';
      });
    });
    return rectStyle;
  }
  attachSection() {
    this.cService.unAttachComponent();
    if (this.sService.selectedSection) {
      this.cService.componentUpdated.emit({
        key: 'disableResize',
        section: this.sService.selectedSection.section
      });
    }
    this.sService.selectedSection = this;
    this.cService.componentUpdated.emit({
      key: 'enableResize',
      section: this.section
    });
  }

  joinStyle(arr: Array<any>) {
    let obj = {};
    arr.forEach(styles => {
      obj = Object.assign(obj, JSON.parse(JSON.stringify(styles)));
    });
    return obj;
  }
}
