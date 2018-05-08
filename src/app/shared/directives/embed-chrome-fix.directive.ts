import { Directive, Input, Renderer, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { ComponentActionService } from '../services/component-action.service';

@Directive({
  selector: '[appEmbedChromeFix]'
})
export class EmbedChromeFixDirective implements AfterViewInit {
  @Input('appEmbedChromeFix') appEmbedChromeFix: any;
  constructor(private renderer: Renderer2, private elRef: ElementRef, private cService: ComponentActionService) { }
  ngAfterViewInit() {
    const el = this.elRef.nativeElement;
    this.renderer.setAttribute(el, 'src', this.appEmbedChromeFix);
  }
}
