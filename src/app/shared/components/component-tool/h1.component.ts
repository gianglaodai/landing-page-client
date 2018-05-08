import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
  selector: 'h1.widget-content[app-type=h1]',
  template: `<ng-content></ng-content>`
})
export class H1Component implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }
}
