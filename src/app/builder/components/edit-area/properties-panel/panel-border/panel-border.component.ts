import { Component, OnInit, Input, HostListener, OnChanges } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import * as componentType from '../../../../../shared/common/component-type';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';
import { Rect } from '../../../../../shared/interfaces/rect';
@Component({
  selector: 'app-panel-border',
  templateUrl: './panel-border.component.html',
  styleUrls: ['./panel-border.component.scss']
})
export class PanelBorderComponent implements OnInit {
  componentType = componentType;
  @Input('component') component;
  @Input('showColorPicker') showColorPicker;
  constructor(private cService: ComponentActionService) { }

  ngOnInit() {
  }
  get borderWidth() {
    if (this.component.type === this.componentType.HLINE) {
      return this.component.contentStyle['border-top-width'] ?
        this.component.contentStyle['border-top-width'].replace(/px/g, '') : '0';
    } else if (this.component.type === this.componentType.VLINE) {
      return this.component.contentStyle['border-left-width'] ?
        this.component.contentStyle['border-left-width'].replace(/px/g, '') : '0';
    } else {
      return this.component.contentStyle['border-width'] ? this.component.contentStyle['border-width'].replace(/px/g, '') : '0';
    }
  }
  get borderStyle() {
    return this.component.contentStyle['border-style'] || '';
  }
  get borderColor() {
    return this.component.contentStyle['border-color'] || 'rgba(0,0,0,1)';
  }
  set borderWidth(borderWidth) {
    if (borderWidth == null || !borderWidth) {
      if (this.component.type === this.componentType.HLINE || this.component.type === this.componentType.VLINE) {
        borderWidth = '1';
      } else {
        borderWidth = '0';
        this.borderStyle = '';
        this.borderColor = 'rgba(0,0,0,1)';
      }
    } else {
      this.borderStyle = this.borderStyle ? this.borderStyle : 'solid';
      this.borderColor = this.borderColor ? this.borderColor : 'rgba(0,0,0,1)';
    }
    const rect: Rect = JSON.parse(JSON.stringify(this.component.rect));
    if (this.component.type === this.componentType.HLINE && parseInt(borderWidth, 10) >= 25) {
      rect.dimension.height = parseInt(borderWidth, 10) + 1;
    } else if (this.component.type === this.componentType.VLINE && parseInt(borderWidth, 10) >= 25) {
      rect.dimension.width = parseInt(borderWidth, 10) + 1;
    } else if (this.component.type === this.componentType.HLINE && parseInt(borderWidth, 10) < 25) {
      rect.dimension.height = 25;
    } else if (this.component.type === this.componentType.VLINE && parseInt(borderWidth, 10) < 25) {
      rect.dimension.width = 25;
    }
    this.component.rect = JSON.parse(JSON.stringify(rect));
    if (this.component.type === this.componentType.HLINE) {
      this.component.contentStyle['border-top-width'] = borderWidth + 'px';
    } else if (this.component.type === this.componentType.VLINE) {
      this.component.contentStyle['border-left-width'] = borderWidth + 'px';
    } else {
      this.component.contentStyle['border-width'] = borderWidth + 'px';
    }
  }
  set borderStyle(borderStyle) {
    this.component.contentStyle['border-style'] = borderStyle;
  }
  set borderColor(borderColor) {
    this.component.contentStyle['border-color'] = borderColor;
  }
  get borderRadiusArr() {
    const borderRadiusArr = this.component.contentStyle['border-radius'] ?
      this.component.contentStyle['border-radius'].replace(/px/g, '').split(' ') : ['0', '0', '0', '0'];
    if (borderRadiusArr.length === 1) {
      for (let i = 0; i < 3; i++) {
        borderRadiusArr.push(borderRadiusArr[0]);
      }
    }
    return borderRadiusArr;
  }
  setBorderRadius(index, value) {
    if (value == null || !value) {
      value = 0;
    }
    if (index < 0) {
      this.component.contentStyle['border-radius'] = value + 'px';
    } else {
      const borderRadiusArr = JSON.parse(JSON.stringify(this.borderRadiusArr));
      borderRadiusArr[index] = value;
      this.component.contentStyle['border-radius'] = borderRadiusArr[0] + 'px ' + borderRadiusArr[1] + 'px ' + borderRadiusArr[2]
        + 'px ' + borderRadiusArr[3] + 'px ';
    }
  }
  inputKeyDown(index, event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopPropagation();
      if (parseInt(event.target['value'], 10) - 1 < 0) {
        return;
      }
      this.setBorderRadius(index, (parseInt(event.target['value'], 10) - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      event.stopPropagation();
      this.setBorderRadius(index, (parseInt(event.target['value'], 10) + 1));
    }
  }
}
