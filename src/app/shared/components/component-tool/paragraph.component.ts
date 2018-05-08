import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'p.widget-content[app-type=p]',
  template: `<ng-content></ng-content>`
})
export class ParagraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
