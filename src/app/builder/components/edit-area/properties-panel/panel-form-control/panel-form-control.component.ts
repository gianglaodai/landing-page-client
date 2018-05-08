import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import * as componenType from '../../../../../shared/common/component-type';
import { MatDialog } from '@angular/material';
import { ModalFormSelectComponent } from '../../modal/modal-form-select/modal-form-select.component';

@Component({
  selector: 'app-panel-form-control',
  templateUrl: './panel-form-control.component.html',
  styleUrls: ['./panel-form-control.component.scss']
})
export class PanelFormControlComponent implements OnInit {
  @Input('component') component: WidgetComponent;
  componenType = componenType;
  constructor(private dialog: MatDialog) { }
  get formControl() {
    // console.log(this.component.formStyles);
    if (!this.component.formControl) {
      this.component.formControl = {};
    }
    return this.component.formControl;
  }
  ngOnInit() {
  }
  manageOptions() {
    const dialogRef = this.dialog.open(ModalFormSelectComponent, {
      width: '600px',
      data: {
        'component': this.component
      }
    });
  }

}
