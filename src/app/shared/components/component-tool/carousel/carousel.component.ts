import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { WidgetComponent } from '../../../interfaces/widget-component';
declare var $: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input('component') component: WidgetComponent;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.init();
  }
  init() {
    $(this.elementRef.nativeElement).carousel({
      interval: this.component.carousel.auto ? this.component.carousel.interval : false
    });
  }
  goto(number) {
    $(this.elementRef.nativeElement).carousel(number);
  }
  prev() {
    $(this.elementRef.nativeElement).carousel('prev');
  }
  next() {
    $(this.elementRef.nativeElement).carousel('next');
  }
  dispose() {
    $(this.elementRef.nativeElement).carousel('dispose');
  }
}
