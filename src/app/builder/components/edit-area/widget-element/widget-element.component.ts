import { Component, OnInit, ElementRef, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import * as componentType from '../../../../shared/common/component-type';
import { element } from 'protractor';
import { WidgetSectionComponent } from '../widget-section/widget-section.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { WidgetComponent } from '../../../../shared/interfaces/widget-component';
import { PageActionService } from '../../../../shared/services/page-action.service';
declare var $: any;
// declare var FB: any;

@Component({
  selector: 'app-element',
  templateUrl: `./widget-element.component.html`,
  styleUrls: ['./widget-element.component.scss']
})
export class WidgetElementComponent implements OnInit {
  private componentType = componentType;
  @Input('component') component: WidgetComponent;
  @Input('parent') parent;
  @ViewChild('carousel') carousel;
  @ViewChildren('childrensElm') childrensElm: QueryList<WidgetElementComponent>;
  inSectionRange = false;
  public isAttachEdit = false;
  constructor(public elementRef: ElementRef, private cService: ComponentActionService,
    private sService: SectionActionService, private sanitized: DomSanitizer, private pService: PageActionService) {
  }
  ngOnInit() {
    if (!this.component.mobileRect) {
      this.component.mobileRect = JSON.parse(JSON.stringify(this.component.rect));
    }
  }
  trustHTML(content) {
    return this.sanitized.bypassSecurityTrustHtml(content);
  }
  trustStyle(content) {
    return this.sanitized.bypassSecurityTrustStyle(content);
  }
  get formVariableStyles() {
    let styleStr = '';
    const formStyles = this.component.formStyles;
    if (formStyles) {
      Object.keys(formStyles).forEach(k => {
        styleStr += `--${k}:${formStyles[k]};`;
      });
    }
    return this.sanitized.bypassSecurityTrustStyle(styleStr);
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  get contentStyle() {
    const styles = this.component.contentStyle ? JSON.parse(JSON.stringify(this.component.contentStyle)) : {};
    if (this.isMobile && this.component.mobileStyle) {
      const mobileStyle = this.component.mobileStyle;
      styles['text-align'] = mobileStyle['text-align'] || styles['text-align'];
      styles['font-size'] = mobileStyle['font-size'] || styles['font-size'];
      styles['line-height'] = mobileStyle['line-height'] || styles['line-height'];
    }
    return styles;
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

  attachResizeElement(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.sService.selectedSection) {
      this.cService.componentUpdated.emit({
        key: 'disableResize',
        section: this.sService.selectedSection.section
      });
      this.sService.selectedSection = null;
    }
    const selectedCom = this.cService.selectedComponent;
    if (!selectedCom) {
      this.cService.componentUpdated.emit({
        key: 'enableDrag',
        component: this.component
      });
      // this.cService.selectedComponent = this;
    } else if (!(selectedCom.elementRef.nativeElement as HTMLElement).querySelector('.widget-edit').contains(event.target)) {
      this.cService.componentUpdated.emit({
        key: 'disableDrag',
        component: selectedCom.component
      });
      this.cService.componentUpdated.emit({
        key: 'disableResize',
        component: selectedCom.component
      });
      if (selectedCom.isAttachEdit) {
        const conentElm = selectedCom.elementRef.nativeElement.querySelector('.widget-content') as HTMLElement;
        conentElm.removeAttribute('contenteditable');
        selectedCom.isAttachEdit = false;
        selectedCom.component.content = conentElm.innerHTML;
      }
      if (selectedCom !== this && selectedCom.component.type === componentType.BUTTON) {
        const beforeHeight = selectedCom.elementRef.nativeElement.offsetHeight;
        selectedCom.elementRef.nativeElement.style.height = 'auto';
        const afterHeight = selectedCom.elementRef.nativeElement.offsetHeight;
        if (afterHeight > beforeHeight) {
          this.cService.updateComponentDimention(selectedCom.component.id, { height: afterHeight });
        } else {
          selectedCom.elementRef.nativeElement.style.height = beforeHeight + 'px';
        }
        (selectedCom.elementRef.nativeElement.querySelector('.widget-content') as HTMLElement).style.removeProperty('min-height');
      }
    }
    this.cService.componentUpdated.emit({
      key: 'enableDrag',
      component: this.component
    });
    this.cService.componentUpdated.emit({
      key: 'enableResize',
      component: this.component
    });
    this.cService.selectedComponent = this;
  }

  enableEdit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!(this.component.type === componentType.BUTTON || componentType.TEXT_COMPONENT.indexOf(this.component.type) >= 0)) {
      return;
    }
    const elm: HTMLElement = this.elementRef.nativeElement;
    if (this.component.type === componentType.BUTTON) {
      (elm.querySelector('.widget-content') as HTMLElement).style.minHeight = elm.offsetHeight + 'px';
      elm.style.height = 'auto';
    }
    this.cService.componentUpdated.emit({
      key: 'disableDrag',
      component: this.component
    });
    const contentElm = (elm.querySelector('.widget-content') as HTMLElement);
    this.isAttachEdit = true;
    contentElm.setAttribute('contenteditable', 'true');
    if (contentElm) {
      const textNode = contentElm.childNodes[0];
      const startIndex = 0;
      const endIndex = contentElm.innerHTML.length;
      const range = document.createRange();
      range.selectNodeContents(contentElm);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
