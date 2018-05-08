import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';

@Component({
  selector: 'app-panel-youtube',
  templateUrl: './panel-youtube.component.html',
  styleUrls: ['./panel-youtube.component.scss']
})
export class PanelYoutubeComponent implements OnInit {
  @Input('element') element;
  constructor(private cService: ComponentActionService, private renderer: Renderer2) {
  }
  get component() {
    return this.element.component;
  }
  ngOnInit() {
  }
  get src() {
    return this.component.youtube.src;
  }
  set src(src) {
    this.component.youtube.src = src;
    this.changeUrl();
  }
  get autoplay() {
    return this.component.youtube.autoplay;
  }
  set autoplay(autoplay) {
    this.component.youtube.autoplay = autoplay;
    this.changeUrl();
  }
  changeUrl() {
    const el = (this.element.elementRef.nativeElement as HTMLElement).querySelector('iframe')
      .setAttribute('src', this.component.youtube.src + '?autoplay=' + this.component.youtube.autoplay);
  }
}
