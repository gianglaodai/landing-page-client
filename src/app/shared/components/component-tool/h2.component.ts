import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h2.widget-content[app-type=h2]',
  template: `<ng-content></ng-content>`
})
export class H2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
