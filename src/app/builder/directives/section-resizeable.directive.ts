import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import * as componentType from '../../shared/common/component-type';
import { WidgetSectionComponent } from '../components/edit-area/widget-section/widget-section.component';
import { ComponentResizeable } from '../classes/component-resizeable';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { SectionActionService } from '../../shared/services/section-action.service';
import { PageActionService } from '../../shared/services/page-action.service';
declare var $: any;

@Directive({
  selector: '[appSectionResizeable]'
})
export class SectionResizeableDirective implements OnInit {
  private componentType = componentType;
  @Input('section') section;
  public componentResizeable;
  public isAttachEdit = false;
  constructor(private cService: ComponentActionService, private sService: SectionActionService, private elementRef: ElementRef,
    private pService: PageActionService) { }
  ngOnInit() {
    this.componentResizeable = new ComponentResizeable($(this.elementRef.nativeElement));
    this.componentResizeable.resizeDirection = [this.componentType.S_RESIZE];
    const $this = this;
    const sService = this.sService;
    this.componentResizeable.onResizeStop = function (size) {
      let elmDimension;
      if ($this.pService.isMobile && $this.section.mobileRect) {
        elmDimension = $this.section.mobileRect.dimension;
      } else if (!$this.section.mobileRect) {
        $this.section.mobileRect = JSON.parse(JSON.stringify($this.section.rect));
        elmDimension = $this.section.mobileRect.dimension;
      } else {
        elmDimension = $this.section.rect.dimension;
      }
      elmDimension.height = size['height'];
    };
    this.componentResizeable.initResize();
    this.componentResizeable.disableResize();
    this.cService.componentUpdated.subscribe(data => {
      if (data.key === 'disableResize' && data.section === this.section) {
        this.componentResizeable.disableResize();
      }
      if (data.key === 'enableResize' && data.section === this.section) {
        this.componentResizeable.enableResize();
      }
    });
  }
}
