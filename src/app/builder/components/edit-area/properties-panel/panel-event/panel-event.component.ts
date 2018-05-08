import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import * as componentType from '../../../../../shared/common/component-type';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-panel-event',
  templateUrl: './panel-event.component.html',
  styleUrls: ['./panel-event.component.scss']
})
export class PanelEventComponent {
  @Input('component') component: WidgetComponent;
  constructor(private snackBar: MatSnackBar) { }
  get tracking() {
    return this.component.tracking;
  }
  set tracking(value) {
    this.component.tracking = value;
  }
  get options() {
    return componentType.EVENT_SUGGESTIONS;
  }

  selectEventSuggest(value) {
    this.component.tracking = `${value}\n${this.component.tracking}`;
  }
}
