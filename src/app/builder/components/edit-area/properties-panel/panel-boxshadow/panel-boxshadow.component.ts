import { Component, OnInit, Input } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';

@Component({
  selector: 'app-panel-boxshadow',
  templateUrl: './panel-boxshadow.component.html',
  styleUrls: ['./panel-boxshadow.component.scss']
})
export class PanelBoxshadowComponent {
  @Input('component') component;
  constructor() { }

  get boxShadow() {
    const boxShadow = this.component.contentStyle['box-shadow'] ?
      this.component.contentStyle['box-shadow'].replace(/px/g, '') : '0 0 0 0 rgba(0,0,0,1)';
    return boxShadow.split(' ');
  }

  get hOffset() {
    return this.boxShadow[0];
  }
  get vOffset() {
    return this.boxShadow[1];
  }
  get blur() {
    return this.boxShadow[2];
  }
  get spread() {
    return this.boxShadow[3];
  }
  get color() {
    return this.boxShadow[4];
  }
  changeShadow(index, value) {
    const boxShadow = JSON.parse(JSON.stringify(this.boxShadow));
    boxShadow[index] = value;
    this.component.contentStyle['box-shadow'] = boxShadow[0] + 'px '
      + boxShadow[1] + 'px ' + boxShadow[2] + 'px ' + boxShadow[3] + 'px ' + boxShadow[4];
  }
}
