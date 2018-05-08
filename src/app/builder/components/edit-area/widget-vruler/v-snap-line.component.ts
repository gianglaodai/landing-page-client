import { Component, OnInit, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-vsnap-line',
  templateUrl: './v-snap-line.component.html',
  styleUrls: ['./v-snap-line.component.css']
})
export class VSnapLineComponent implements OnInit {
  @Input('left') left: number;
  private timeout;
  @Input('snapLines') snapLines: Array<any>;
  @ViewChild('tooltip') tooltip: ElementRef;
  constructor(private elementRef: ElementRef) {
  }
  ngOnInit() {
    const $this = this;
    $(this.elementRef.nativeElement).draggable({
      axis: 'x', snap: '.ui-snap', snapTolerance: 5,
      stop: function (event, ui) {
        $this.snapLines[$this.snapLines.indexOf(this.left)] = ui.position.left;
      }
    });
  }
  @HostListener('mouseover', ['$event'])
  show(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.tooltip.nativeElement.style.visibility = 'visible';
  }
  @HostListener('mouseleave', ['$event'])
  hide() {
    this.timeout = setTimeout(() => {
      this.tooltip.nativeElement.style.removeProperty('visibility');
    }, 500);
  }
  remove(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.snapLines.splice(this.snapLines.indexOf(this.left), 1);
  }
}
