import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-panel-sticky',
  templateUrl: './panel-sticky.component.html',
  styleUrls: ['./panel-sticky.component.scss']
})
export class PanelStickyComponent {
  @Input('component') component;
  constructor(private snackBar: MatSnackBar) { }

  get sticky() {
    if (!this.component.sticky) {
      this.component.sticky = JSON.parse(JSON.stringify({
        using: false,
        position: 'top',
        padding: '0px'
      }));
    }
    return this.component.sticky;
  }
}
