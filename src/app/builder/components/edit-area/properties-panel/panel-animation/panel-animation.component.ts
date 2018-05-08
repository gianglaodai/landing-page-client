import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as animateClass from '../../../../common/animate-class';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { MatSnackBar } from '@angular/material';
declare var $: any;

@Component({
  selector: 'app-panel-animation',
  templateUrl: './panel-animation.component.html',
  styleUrls: ['./panel-animation.component.scss']
})
export class PanelAnimationComponent {
  @Input('component') component: WidgetComponent;
  @ViewChild('previewAnimate') previewAnimate: ElementRef;
  constructor(private snackBar: MatSnackBar) { }

  get animateClass() {
    return animateClass.ANIMATE_CLASS;
  }
  get animate() {
    if (!this.component.animate) {
      this.component.animate = JSON.parse(JSON.stringify({
        'name': null,
        'duration': 0.7,
        'delay': 0
      }));
    }
    return this.component.animate;
  }
  runAnimate() {
    $(this.previewAnimate.nativeElement).removeClass().addClass(this.animate.name + ' animated')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
      });
  }
}
