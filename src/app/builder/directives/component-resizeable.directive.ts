import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import * as componentType from '../../shared/common/component-type';
import { WidgetSectionComponent } from '../components/edit-area/widget-section/widget-section.component';
import { ComponentResizeable } from '../classes/component-resizeable';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { SectionActionService } from '../../shared/services/section-action.service';
import { PageActionService } from '../../shared/services/page-action.service';
declare var $: any;


@Directive({
  selector: '[appComponentResizeable]'
})
export class ComponentResizeableDirective implements OnInit {
  private componentType = componentType;
  @Input('component') component;
  public componentResizeable: ComponentResizeable;
  public isAttachEdit = false;
  constructor(private cService: ComponentActionService, private sService: SectionActionService, private elementRef: ElementRef,
    private pService: PageActionService) { }
  ngOnInit() {
    const $this = this;
    const cService = this.cService;
    const sService = this.sService;
    const elm: HTMLElement = this.elementRef.nativeElement;
    this.componentResizeable = new ComponentResizeable($(this.elementRef.nativeElement));
    this.componentResizeable.compType = this.component.type;
    this.componentResizeable.onResizeStop = function (size) {
      let elmDimension, elmOffset;
      if ($this.pService.isMobile && $this.component.mobileRect) {
        elmDimension = $this.component.mobileRect.dimension;
        elmOffset = $this.component.mobileRect.offset;
      } else if ($this.pService.isMobile && !$this.component.mobileRect) {
        $this.component.mobileRect = $.extend(true, {}, $this.component.rect);
        elmDimension = $this.component.mobileRect.dimension;
        elmOffset = $this.component.mobileRect.offset;
      } else {
        elmDimension = $this.component.rect.dimension;
        elmOffset = $this.component.rect.offset;
      }
      if ($this.componentType.TEXT_COMPONENT.indexOf($this.component.type) >= 0) {
        elmDimension.width = $this.elementRef.nativeElement.offsetWidth;
      } else {
        elmDimension.width = $this.elementRef.nativeElement.offsetWidth;
        elmDimension.height = $this.elementRef.nativeElement.offsetHeight;
      }
      elmOffset.top = elm.offsetTop;
      elmOffset.left = elm.offsetLeft;
      if ($this.component.type === $this.componentType.GMAP) {
        $this.cService.componentUpdated.emit({
          key: 'resize-gmap'
        });
      }
    };
    this.componentResizeable.resizeDirection = componentType.RESIZE_DIRECTIONS[this.component.type] || componentType.X_RESIZE;
    const aspectRatio = this.componentType.ASPECT_RATIO[this.component.type];
    this.componentResizeable.aspectRatio = typeof aspectRatio === 'undefined' ? false : aspectRatio;
    this.componentResizeable.initResize();
    if (sService.movedComponent !== this.component) {
      this.componentResizeable.disableResize();
    }
    cService.componentUpdated.subscribe(data => {
      if (data.key === 'disableResize' && data.component === this.component) {
        this.componentResizeable.disableResize();
      }
      if (data.key === 'enableResize' && data.component === this.component) {
        this.componentResizeable.enableResize();
      }
    });
  }
}
