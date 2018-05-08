import { Component, OnInit, Input } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import { FontActionService } from '../../../../services/font-action.service';
import { element } from 'protractor';
import * as componentType from '../../../../../shared/common/component-type';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';
import { PageActionService } from '../../../../../shared/services/page-action.service';
import { SectionActionService } from '../../../../../shared/services/section-action.service';


@Component({
  selector: 'app-panel-character',
  templateUrl: './panel-character.component.html',
  styleUrls: ['./panel-character.component.scss']
})
export class PanelCharacterComponent implements OnInit {
  @Input('element') element;
  private componentType = componentType;
  constructor(private fService: FontActionService, private cService: ComponentActionService, private pService: PageActionService,
    private sService: SectionActionService) {
  }
  get fonts() {
    if (this.fService.googleFonts) {
      return this.fService.googleFonts;
    } else {
      this.fService.getGoogleFonts().subscribe(data => {
        return this.fService.googleFonts;
      });
    }
  }
  get fontWeights() {
    return this.fService.fontWeights;
  }

  get isMobile() {
    return this.pService.isMobile;
  }
  get contentStyle() {
    if (!this.element.component.contentStyle) {
      this.element.component.contentStyle = {};
    }
    if (!this.element.component.mobileStyle) {
      this.element.component.mobileStyle = {
      };
    }
    return this.isMobile ? this.element.component.mobileStyle : this.element.component.contentStyle;
  }

  ngOnInit() {
  }
  fontSizeChange(value) {
    const selectedCom = this.element;
    const lineHeight = this.contentStyle['line-height'];
    if (lineHeight && parseInt(lineHeight.split('px')[0], 10) < parseInt(value, 10)) {
      this.contentStyle['line-height'] = value + 'px';
    }
    this.contentStyle['font-size'] = value + 'px';
    if (selectedCom.component.type === componentType.BUTTON) {
      const beforeHeight = selectedCom.elementRef.nativeElement.offsetHeight;
      selectedCom.elementRef.nativeElement.style.removeProperty('height');
      const afterHeight = selectedCom.elementRef.nativeElement.offsetHeight;
      if (afterHeight >= beforeHeight) {
        if (this.isMobile) {
          selectedCom.component.mobileRect.dimension.height = afterHeight;
        } else {
          selectedCom.component.rect.dimension.height = afterHeight;
        }
        // this.cService.updateComponentDimention(selectedCom.component.id, { height: afterHeight });
      } else {
        selectedCom.elementRef.nativeElement.style.height = beforeHeight + 'px';
      }
    }
  }
  getComputedStyle(styleName: string) {
    const elm = (this.element.elementRef.nativeElement as HTMLElement);
    if (styleName === 'line-height') {
      const beforeHeight = elm.style.height;
      elm.style.whiteSpace = 'nowrap';
      elm.style.removeProperty('height');
      const lineHeight = elm.offsetHeight;
      elm.style.removeProperty('white-space');
      if (beforeHeight) {
        elm.style.height = beforeHeight;
      }
      return lineHeight + 'px';
    }
    return window.getComputedStyle(this.element.elementRef.nativeElement, null).getPropertyValue(styleName);
  }
}
