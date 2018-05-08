import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-panel-css',
  templateUrl: './panel-css.component.html',
  styleUrls: ['./panel-css.component.scss']
})
export class PanelCssComponent {
  @Input('component') component;
  constructor(private snackBar: MatSnackBar) { }

  get extClass() {
    return this.component.extClass;
  }
  get extStyle() {
    return this.component.extStyle;
  }
  set extClass(value) {
    this.component.extClass = value;
  }
  set extStyle(value) {
    this.component.extStyle = value;
  }
}
