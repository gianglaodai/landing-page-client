import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SectionRangeService } from '../../../services/section-range.service';
import { WidgetComponent } from '../../../../shared/interfaces/widget-component';
import * as componentType from '../../../../shared/common/component-type';

@Component({
  selector: 'app-section-range',
  templateUrl: './section-range.component.html',
  styleUrls: ['./section-range.component.scss']
})
export class SectionRangeComponent implements OnInit {
  component: WidgetComponent;
  @ViewChild('range') range: ElementRef;
  constructor(private srService: SectionRangeService, public elementRef: ElementRef) { }

  ngOnInit() {
    this.component = JSON.parse(JSON.stringify(componentType.GROUP_COMPONENT));
  }
  get offset() {
    return this.component.rect.offset;
  }
  get dimension() {
    return this.component.rect.dimension;
  }
}
