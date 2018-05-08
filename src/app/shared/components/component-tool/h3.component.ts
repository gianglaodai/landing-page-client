import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h3.widget-content[app-type=h3]',
  template: `<ng-content></ng-content>`
})
export class H3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
