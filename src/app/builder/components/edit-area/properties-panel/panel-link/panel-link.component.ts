import { Component, OnInit, Input } from '@angular/core';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import * as componentType from '../../../../../shared/common/component-type';

@Component({
  selector: 'app-panel-link',
  templateUrl: './panel-link.component.html',
  styleUrls: ['./panel-link.component.scss']
})
export class PanelLinkComponent implements OnInit {
  componentType = componentType;
  @Input('component') component;
  constructor(private sService: SectionActionService) { }
  ngOnInit() {
  }
  get sectionComponents() {
    return this.sService.sectionComponents.filter(sectionComponent => {
      return sectionComponent.section.type === 'section';
    });
  }
  get popupComponents() {
    return this.sService.sectionComponents.filter(sectionComponent => {
      return sectionComponent.section.type === 'popup';
    });
  }
  toggleTarget(checked) {
    if (this.component.link) {
      this.component.link.target = checked ? '_blank' : null;
    } else {
      this.component.link = {
        'type': null, 'value': null, 'target': checked ? '_blank' : null
      };
    }
  }
  get linkTarget() {
    return this.component.link ? this.component.link.target : null;
  }
  get linkType() {
    return this.component.link ? this.component.link.type : null;
  }
  set linkType(type) {
    if (type === '') {
      this.component.link = null;
    }
    this.component.link = {
      'type': type, 'value': null
    };
  }
  get linkValue() {
    return this.component.link ? this.component.link.value : null;
  }
  set linkValue(value) {
    if (this.component.link) {
      this.component.link.value = value;
    } else {
      this.component.link = {
        'type': null, 'value': value
      };
    }
  }
}
