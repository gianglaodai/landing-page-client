import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.scss']
})
export class PanelFormComponent implements OnInit {
  @Input('component') component: WidgetComponent;
  constructor() { }
  get formStyles() {
    // console.log(this.component.formStyles);
    if (!this.component.formStyles) {
      this.component.formStyles = {};
    }
    return this.component.formStyles;
  }
  ngOnInit() {
  }

}
