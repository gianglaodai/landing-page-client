import { Component, OnInit, Input } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';

@Component({
  selector: 'app-panel-textshadow',
  templateUrl: './panel-textshadow.component.html',
  styleUrls: ['./panel-textshadow.component.scss']
})
export class PanelTextshadowComponent implements OnInit {
  @Input('component') component;
  constructor(private cService: ComponentActionService) { }

  ngOnInit() {
  }

  get textShadow() {
    const textShadow = this.component.contentStyle['text-shadow'] ?
      this.component.contentStyle['text-shadow'].replace(/px/g, '') : '0 0 0 rgba(0,0,0,1)';
    return textShadow.split(' ');
  }

  get hOffset() {
    return this.textShadow[0];
  }
  get vOffset() {
    return this.textShadow[1];
  }
  get blur() {
    return this.textShadow[2];
  }
  get color() {
    return this.textShadow[3];
  }
  changeShadow(index, value) {
    const textShadow = JSON.parse(JSON.stringify(this.textShadow));
    textShadow[index] = value;
    this.component.contentStyle['text-shadow'] = textShadow[0] + 'px '
      + textShadow[1] + 'px ' + textShadow[2] + 'px ' + textShadow[3];
  }

}
