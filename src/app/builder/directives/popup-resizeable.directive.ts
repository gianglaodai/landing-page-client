import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import * as componentType from '../../shared/common/component-type';
import { WidgetSectionComponent } from '../components/edit-area/widget-section/widget-section.component';
import { ComponentResizeable } from '../classes/component-resizeable';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { SectionActionService } from '../../shared/services/section-action.service';
declare var $: any;

@Directive({
  selector: '[appPopupResizeable]'
})
export class PopupResizeableDirective implements OnInit {
  @Input('component') component;
  public componentResizeable;
  public isAttachEdit = false;
  constructor(private elementRef: ElementRef, private cService: ComponentActionService, private sService: SectionActionService) { }
  ngOnInit() {
    const elm = this.elementRef.nativeElement;
    this.componentResizeable = new ComponentResizeable($(elm));
    this.componentResizeable.resizeDirection = componentType.XY_RESIZE;
    const $this = this;
    this.componentResizeable.onResizeStop = function (size) {
      $this.component.section.rect.dimension = size;
    };
    this.componentResizeable.onResize = function () {
      (elm as HTMLElement).style.removeProperty('top');
      (elm as HTMLElement).style.removeProperty('left');
    };
    this.componentResizeable.snapable = false;
    this.componentResizeable.initResize();
    if (this.sService.newComponent && this.component.section.id === this.sService.newComponent.id) {
      this.component.section.popup.isShow = true;
      this.sService.selectedSection = this.component;
      this.sService.newComponent = null;
    } else {
      this.componentResizeable.disableResize();
    }
    this.cService.componentUpdated.subscribe(data => {
      if (data.key === 'disableResize' && data.section === this.component.section) {
        this.componentResizeable.disableResize();
      }
      if (data.key === 'enableResize' && data.section === this.component.section) {
        this.componentResizeable.enableResize();
      }
    });
  }
}
