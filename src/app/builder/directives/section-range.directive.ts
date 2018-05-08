import { Directive, HostListener, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SectionRangeService } from '../services/section-range.service';
import { WidgetSectionComponent } from '../components/edit-area/widget-section/widget-section.component';
import { SectionRangeComponent } from '../components/edit-area/section-range/section-range.component';
import * as componentType from '../../shared/common/component-type';
import { Rect } from '../../shared/interfaces/rect';

@Directive({
  selector: '[appSectionRange]'
})
export class SectionRangeDirective implements OnInit {
  @Input('parent') parent: WidgetSectionComponent;
  @Input('sectionRange') sectionRange: SectionRangeComponent;
  overlappedElm;
  sectionRangeRect;
  private isdown = false;
  moveListener;
  constructor(private srService: SectionRangeService, private elementRef: ElementRef, private renderer: Renderer2) {
  }
  ngOnInit() {
    this.overlappedElm = [];
    this.sectionRangeRect = {
      offset: {
        top: 0,
        left: 0
      },
      dimension: {
        width: 0,
        height: 0
      }
    };
  }
  resetAll() {
    this.ngOnInit();
    if (this.sectionRange) {
      this.sectionRange.ngOnInit();
    }
  }
  get differenceOffset() {
    const containerWidth = (this.elementRef.nativeElement as HTMLElement).offsetWidth;
    let differenceOffset = 0;
    if (containerWidth > 960) {
      differenceOffset = (containerWidth - 960) / 2;
    } else {
      differenceOffset = 0;
    }
    return differenceOffset;
  }
  @HostListener('mousedown', ['$event'])
  mouseDown(event: MouseEvent) {
    if (this.sectionRange) {
      this.resetAll();
      (this.parent.elementRef.nativeElement as HTMLElement).classList.add('active-range');
      this.isdown = true;
      this.sectionRange.component.rect.offset = {
        top: event.layerY,
        left: event.layerX - this.differenceOffset
      };
      this.parent.childrensElm['_results'].filter(elmComponent => {
        const elm = elmComponent.elementRef.nativeElement as HTMLElement;
        const rect2 = elm.getBoundingClientRect();
      });
      this.moveListener = this.renderer.listen(this.elementRef.nativeElement, 'mousemove', evt => {
        this.mouseMove(evt);
      });
    }
  }
  mouseMove(event: MouseEvent) {
    const startOffset = this.sectionRange.component.rect.offset;
    this.sectionRange.component.rect.dimension = {
      height: event.layerY - startOffset.top,
      width: event.layerX - startOffset.left - this.differenceOffset
    };
    this.overlappedElm = this.getOverlappedElm();
  }
  @HostListener('mouseup', ['$event'])
  mouseUp(event: MouseEvent) {
    if (this.moveListener) {
      this.moveListener();
    }
    this.parent.elementRef.nativeElement.classList.remove('active-range');
    this.isdown = false;
    this.overlappedElm.forEach(elmComponent => {
      elmComponent.inSectionRange = false;
      const elm = elmComponent.elementRef.nativeElement as HTMLElement;
      if (elm.offsetLeft < this.sectionRangeRect.offset.left || !this.sectionRangeRect.offset.left) {
        this.sectionRangeRect.offset.left = elm.offsetLeft;
      }
      if (elm.offsetTop < this.sectionRangeRect.offset.top || !this.sectionRangeRect.offset.top) {
        this.sectionRangeRect.offset.top = elm.offsetTop;
      }
    });
    this.overlappedElm.forEach(elmComponent => {
      const elm = elmComponent.elementRef.nativeElement as HTMLElement;
      if (elm.offsetLeft + elm.offsetWidth > this.sectionRangeRect.offset.left + this.sectionRangeRect.dimension.width
        || !this.sectionRangeRect.dimension.width) {
        this.sectionRangeRect.dimension.width = elm.offsetLeft + elm.offsetWidth - this.sectionRangeRect.offset.left;
      }
      if (elm.offsetTop + elm.offsetHeight > this.sectionRangeRect.offset.top + this.sectionRangeRect.dimension.height
        || !this.sectionRangeRect.dimension.height) {
        this.sectionRangeRect.dimension.height = elm.offsetTop + elm.offsetHeight - this.sectionRangeRect.offset.top;
      }
    });
    const sectionRangeComp = JSON.parse(JSON.stringify(componentType.GROUP_COMPONENT));
    sectionRangeComp.rect = this.sectionRangeRect;
    this.sectionRange.component = JSON.parse(JSON.stringify(sectionRangeComp));
  }
  getOverlappedElm() {
    let results = null;
    const rect1 = (this.sectionRange.range.nativeElement as HTMLElement).getBoundingClientRect();
    results = this.parent.childrensElm['_results'].filter(elmComponent => {
      const elm = elmComponent.elementRef.nativeElement as HTMLElement;
      const rect2 = elm.getBoundingClientRect();
      const overlapped = !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
      const index = this.overlappedElm.indexOf(elmComponent);
      if (overlapped) {
        elmComponent.inSectionRange = true;
        if (index < 0) {
          this.overlappedElm.push(elmComponent);
        }
      } else {
        elmComponent.inSectionRange = false;
        if (index >= 0) {
          this.overlappedElm.splice(index, 1);
        }
      }
      return overlapped;
    });
    return results;
  }
}
