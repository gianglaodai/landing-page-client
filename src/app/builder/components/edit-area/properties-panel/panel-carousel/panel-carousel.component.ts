import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';

@Component({
  selector: 'app-panel-carousel',
  templateUrl: './panel-carousel.component.html',
  styleUrls: ['./panel-carousel.component.scss']
})
export class PanelCarouselComponent {
  @Input('element') element: WidgetElementComponent;
  active;
  constructor() { }
  get carousel() {
    if (!this.element.component.carousel) {
      this.element.component.carousel = JSON.parse(JSON.stringify({
        'interval': 4000,
        'slides': []
      }));
    }
    return this.element.component.carousel;
  }
  clone(event: MouseEvent, slide) {
    event.preventDefault();
    event.stopPropagation();
    const index = this.carousel.slides.indexOf(slide);
    if (index >= 0) {
      this.carousel.slides.splice(index + 1, 0, JSON.parse(JSON.stringify(slide)));
    }
  }
  delete(event: MouseEvent, slide) {
    event.preventDefault();
    event.stopPropagation();
    const index = this.carousel.slides.indexOf(slide);
    if (index >= 0) {
      this.carousel.slides.splice(index, 1);
    }
  }
  reInitSlide() {
    this.element.carousel.dispose(); this.element.carousel.init();
  }
}
