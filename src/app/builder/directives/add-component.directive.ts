import { Directive, Inject, HostListener, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Rect } from '../../shared/interfaces/rect';
import { Dimension } from '../../shared/interfaces/dimension';
import { Offset } from '../../shared/interfaces/offset';
import { WidgetComponent } from '../../shared/interfaces/widget-component';
import { SectionActionService } from '../../shared/services/section-action.service';
import { ComponentActionService } from '../../shared/services/component-action.service';

@Directive({
  selector: '[appAddComponent]'
})
export class AddComponentDirective {
  @Input('appAddComponent') appAddComponent;
  constructor(private cService: ComponentActionService,
    private sService: SectionActionService) {
  }

  @HostListener('click')
  onClick() {
    const mostVisible = this.sService.mostVisible;
    const componentId: string = this.cService.addComponent(this.appAddComponent, mostVisible);
  }
}
