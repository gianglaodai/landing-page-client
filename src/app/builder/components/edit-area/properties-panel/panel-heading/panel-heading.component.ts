import { Component, OnInit, Input } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import * as componentType from '../../../../../shared/common/component-type';

@Component({
  selector: 'app-panel-heading',
  templateUrl: './panel-heading.component.html',
  styleUrls: ['./panel-heading.component.scss']
})
export class PanelHeadingComponent implements OnInit {
  @Input('element') element: WidgetElementComponent;
  componentType = componentType;

  constructor() { }

  ngOnInit() {
  }

  changeHeading(value) {
    const baseComp = componentType.COMPONENTS[value];
    this.element.component.contentStyle['font-size'] = baseComp.contentStyle['font-size'];
    this.element.component.contentStyle['line-height'] = baseComp.contentStyle['line-height'];
  }
}
