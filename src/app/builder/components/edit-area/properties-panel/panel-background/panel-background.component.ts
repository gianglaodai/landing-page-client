import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../../shared/services/page-action.service';

@Component({
  selector: 'app-panel-background',
  templateUrl: './panel-background.component.html',
  styleUrls: ['./panel-background.component.scss']
})
export class PanelBackgroundComponent implements OnInit {
  @Input('element') element: any;
  @Input('component') component: any;
  constructor(private sService: SectionActionService, private pService: PageActionService) { }

  ngOnInit() {
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  get backgroundColor() {
    if (!this.component.contentStyle['background-color']) {
      this.component.contentStyle['background-color'] = 'rgba(255,255,255,0)';
    }
    return this.component.contentStyle['background-color'];
  }
  get backgroundImage() {
    return this.component.contentStyle['background-image'] ?
      this.component.contentStyle['background-image'].slice(4, -1).replace(/"/g, '') : null;
  }
  set backgroundImage(url) {
    const img = new Image();
    const comp = this.component;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const contentStyle = JSON.parse(JSON.stringify(comp.contentStyle));
      contentStyle['background-image'] = 'url(' + url + ')';
      comp.contentStyle = JSON.parse(JSON.stringify(contentStyle));
      if (!img.complete || typeof img.complete === 'undefined') {
        img.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABkBAMAAACWddTDAAAALVBMVEX39/ebm5urq6vv7+/
        Ly8vk5OTDw8Ofn5+/v7+3t7ezs7Onp6fY2NjPz8/c3NwR2HHmAAABd0lEQVRYw+3SsUrDQBzH8R80tNEW4Z/
        eRW01JDoL6VR0SrrUSdo3aBE6t5OT0LyB3Ryb3cEiuAmtTyDFF/BNvJaeYpYrEsTh/x0OkoMPx/0PHMdxHMdxHMdxf1zfBwoOvuv6v7dEjtZ+
        mJ81m+ZntY7XlhU4kbYap6lbmNTUgRNyAbTr7wJY0pnJuqqHKyshOvyyTohaRD6aRHQHW20JWETUM1hRf6ysCkUWzbVVC2Ons
        6giGSOuYnFbSAW6L3iVJqvsKcsWQDzVlkTpCLsSqpISI5QFkjn2DkxWpa6schVoDLU1XBE7yrIGM4kgRFEgJSLHZGFy7aD0w/
        I31gURSYxCWALBVlbT25zrMWtNngclidn6XEEHgNGyHH1fWetGfUp9X71tLAR6jllrNLdGUs0RqzkKnLtmq6vfV9ZSP8mDrVaBolqfzFZRv
        /usZVPtUgBtuj8GluSGyCHbQz4lU8RD5NMHEb0hnyopPYDjOI7jOI7juP/XJ3B1TRmE/KufAAAAAElFTkSuQmCC`;
      }
    };
    img.src = url;
  }

  get backgroundType() {
    let backgroundType = 'auto';
    if (this.component.contentStyle['background-attachment'] === 'fixed') {
      backgroundType = 'fixed';
    } else if (this.component.contentStyle['background-size'] === 'cover') {
      backgroundType = 'cover';
    } else if (this.component.contentStyle['background-size'] === 'auto 100%') {
      backgroundType = '100%h';
    } else if (this.component.contentStyle['background-size'] === '100% auto') {
      backgroundType = '100%w';
    } else if (this.component.contentStyle['background-size'] === '100% 100%') {
      backgroundType = '100%';
    }
    return backgroundType;
  }
  set backgroundType(type) {
    switch (type) {
      case 'fixed': {
        this.component.contentStyle['background-size'] = 'cover';
        this.component.contentStyle['background-attachment'] = 'fixed';
        delete this.component.contentStyle['background-origin'];
        break;
      }
      case 'cover': {
        this.component.contentStyle['background-size'] = 'cover';
        delete this.component.contentStyle['background-attachment'];
        delete this.component.contentStyle['background-origin'];
        break;
      }
      case '100%': {
        this.component.contentStyle['background-size'] = '100% 100%';
        this.component.contentStyle['background-attachment'] = 'scroll';
        this.component.contentStyle['background-origin'] = 'content-box';
        break;
      }
      case '100%h': {
        this.component.contentStyle['background-size'] = 'auto 100%';
        this.component.contentStyle['background-attachment'] = 'scroll';
        this.component.contentStyle['background-origin'] = 'content-box';
        break;
      }
      case '100%w': {
        this.component.contentStyle['background-size'] = '100% auto';
        this.component.contentStyle['background-attachment'] = 'scroll';
        this.component.contentStyle['background-origin'] = 'content-box';
        break;
      }
      default: {
        delete this.component.contentStyle['background-size'];
        delete this.component.contentStyle['background-position'];
        delete this.component.contentStyle['background-attachment'];
        delete this.component.contentStyle['background-origin'];
        break;
      }
    }
  }

  hideSectionOnMobile() {
    this.element.section.mobileHide = true;
  }
  orderSection() {
    this.element.section.mobileRect = this.element.section.mobileRect ? this.element.section.mobileRect :
      JSON.parse(JSON.stringify(this.element.section.rect));
    this.sService.order(this.element, this.element.section.mobileRect);
  }
}
