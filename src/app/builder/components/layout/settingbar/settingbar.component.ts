import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { WidgetElementComponent } from '../../edit-area/widget-element/widget-element.component';
import * as componentType from '../../../../shared/common/component-type';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../shared/services/page-action.service';

@Component({
  selector: 'app-settingbar',
  templateUrl: './settingbar.component.html',
  styleUrls: ['./settingbar.component.scss']
})
export class SettingbarComponent implements OnInit {
  componentType = componentType;
  constructor(private cService: ComponentActionService, private sService: SectionActionService,
    private pService: PageActionService, private elementRef: ElementRef) {
  }
  get selectedComponent() {
    return this.cService.selectedComponent;
  }
  get selectedSection() {
    return this.sService.selectedSection;
  }
  get isMobile() {
    return this.pService.isMobile;
  }

  ngOnInit() {
  }
}
