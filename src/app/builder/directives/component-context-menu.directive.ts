import { Directive, HostListener, Input } from '@angular/core';
import { WidgetElementComponent } from '../components/edit-area/widget-element/widget-element.component';
import { ComponentActionService } from '../../shared/services/component-action.service';

@Directive({
  selector: '[appComponentContextMenu]'
})
export class ComponentContextMenuDirective {
  @Input('element') element: WidgetElementComponent;
  constructor(private cService: ComponentActionService) { }
  @HostListener('contextmenu', ['$event'])
  contextmenu(event) {
    if (this.cService.selectedComponent !== this.element) {
      this.element.attachResizeElement(event);
    }
    this.cService.componentContext.emit({
      left: event.x,
      top: event.y,
      element: this.element
    });
    event.preventDefault();
  }
}
