import { Component, ElementRef, ViewChild, HostListener, Output, OnInit } from '@angular/core';
import { PageActionService } from '../../../../shared/services/page-action.service';
declare var $: any;
@Component({
  selector: 'app-widget-vruler',
  templateUrl: './widget-vruler.component.html',
  styleUrls: ['./widget-vruler.component.css']
})
export class WidgetVRulerComponent implements OnInit {
  // @ViewChild('vRuler') vRuler: ElementRef;
  snapLines = [];
  constructor(private pService: PageActionService, private elementRef: ElementRef) {
  }
  ngOnInit() {
    // const elm = this.elementRef.nativeElement as HTMLElement;
    // const vWidth = elm.offsetWidth;
    // this.vNumbers.nativeElement.innerHTML = '';
    // for (let i = 0; i < vWidth - (vWidth % 100); i += 100) {
    //   this.vNumbers.nativeElement.innerHTML += '<div class="number">' + i + '</div>';
    // }
  }
  get numbers() {
    const numbers = [];
    const vWidth = this.elementRef.nativeElement.offsetWidth;
    for (let i = 0; i < vWidth; i += 100) {
      numbers.push(i);
      // this.elementRef.nativeElement.innerHTML += '<div class="number">' + i + '</div>';
    }
    return numbers;
  }

  get gridLines() {
    if (!this.pService.isShowGrid) {
      return null;
    }
    // Check lại
    const elm = this.elementRef.nativeElement as HTMLElement;
    const gridLines = [];
    const grid = this.pService.grid;
    const totalLine = grid.padding ? grid.total * 2 - 2 : grid.total - 1;
    const colWidth = elm.offsetWidth / grid.total;
    let offsetWidth = 0;
    for (let i = 1; i <= totalLine; i++) {
      if (!grid.padding) {
        offsetWidth += colWidth;
        gridLines.push(Math.round(offsetWidth));
      } if (i % 2) {
        offsetWidth += colWidth;
        gridLines.push(Math.round(offsetWidth - grid.padding / 2));
      } else {
        gridLines.push(Math.round(offsetWidth + grid.padding / 2));
      }
    }
    return gridLines;
  }
  @HostListener('click', ['$event'])
  attachResizeElement(event: MouseEvent) {
    if (this.snapLines.indexOf(event.clientX) < 0) {
      this.snapLines.push(event.clientX);
    }
  }
}
