import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { WidgetElementComponent } from '../widget-element/widget-element.component';
import { WidgetSectionComponent } from '../widget-section/widget-section.component';

@Component({
  selector: 'app-component-context-menu',
  templateUrl: './component-context-menu.component.html',
  styleUrls: ['./component-context-menu.component.scss']
})
export class ComponentContextMenuComponent implements OnInit {
  @ViewChild('menuContext') menuContext: ElementRef;
  menuLeft = 0;
  menuTop = 0;
  element: WidgetElementComponent;
  constructor(private cService: ComponentActionService) { }

  ngOnInit() {
    this.cService.componentContext.subscribe(data => {
      this.menuLeft = data.left;
      this.menuTop = data.top;
      this.element = data.element;
      (this.menuContext.nativeElement as HTMLElement).classList.remove('d-none');
    });
  }
  moveComponent(direction) {
    const parent = this.element.parent;
    // this.cService.moveComponentInSection(this.element.component, parent.section, direction);
    const childrens = parent.section ? parent.section.childrens : parent.component.childrens;
    if (direction === 1) {
      this.cService.moveComponentToLast(this.element.component, childrens);
    } else if (direction === -1) {
      this.cService.moveComponentToFirst(this.element.component, childrens);
    }
    this.closeContext();
  }
  closeContext() {
    (this.menuContext.nativeElement as HTMLElement).classList.add('d-none');
  }
}
