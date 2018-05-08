import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'a.widget-content[app-type=button]',
  template: '<ng-content></ng-content>'
})
export class ButtonComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {

  }

}
