import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, HostListener, Input, AfterViewInit } from '@angular/core';
import { EditContentComponent } from '../edit-content/edit-content.component';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { SectionActionService } from '../../../../shared/services/section-action.service';
declare var $: any;
@Component({
  selector: 'app-widget-hruler',
  templateUrl: './widget-hruler.component.html',
  styleUrls: ['./widget-hruler.component.css']
})
export class WidgetHRulerComponent implements OnInit {
  @ViewChild('hNumbers') hNumbers: ElementRef;
  @Input('parent') parent;
  snapLines = [];

  constructor(private elementRef: ElementRef, private pService: PageActionService, private sService: SectionActionService) { }
  ngOnInit() {
  }
  get numbers() {
    const numbers = [];
    if (this.sService.sections) {
      const sections = this.sService.sections.filter(section => {
        return section['type'] === 'section';
      });
      let hHeight = 0;
      if (sections) {
        if (this.pService.isMobile) {
          sections.forEach(section => {
            try {
              hHeight += section.mobileRect.dimension.height;
            } catch (error) { }
          });
        } else {
          sections.forEach(section => {
            try {
              hHeight += section.rect.dimension.height;
            } catch (error) { }
          });
        }
      }
      // this.hNumbers.nativeElement.innerHTML = '';
      for (let i = 0; i <= hHeight - (hHeight % 100); i += 100) {
        numbers.push(i);
      }
    }
    return numbers;
  }
  addSnapLine(event: MouseEvent) {
    this.snapLines.push(JSON.parse(JSON.stringify(event.clientY - (document.querySelector('#header') as HTMLElement).offsetHeight
      - $('#appEditConent .mCSB_container').position().top)));
  }
}
