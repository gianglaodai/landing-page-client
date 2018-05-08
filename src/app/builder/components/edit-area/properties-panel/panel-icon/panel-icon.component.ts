import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-icon',
  templateUrl: './panel-icon.component.html',
  styleUrls: ['./panel-icon.component.scss']
})
export class PanelIconComponent implements OnInit {
  @Input('component') component;
  constructor() { }

  ngOnInit() {
  }

}
