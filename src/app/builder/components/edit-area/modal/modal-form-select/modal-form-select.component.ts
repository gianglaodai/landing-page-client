import { Component, OnInit, Input, Inject } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-form-select',
  templateUrl: './modal-form-select.component.html',
  styleUrls: ['./modal-form-select.component.scss']
})
export class ModalFormSelectComponent implements OnInit {
  component: WidgetComponent;
  newOption = {
    'text': null,
    'value': null
  };
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.component = this.data.component;
  }

  get options() {
    if (!this.component.formControl.options) {
      this.component.formControl.options = [];
    }
    return this.component.formControl.options;
  }
  add() {
    if (!this.newOption || !this.newOption['text'] || !this.newOption['text'].trim().length) {
      return;
    }
    this.options.push(JSON.parse(JSON.stringify(this.newOption)));
    this.newOption = {
      'text': null,
      'value': null
    };
  }
  delete(option) {
    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.component.childrens.splice(index, 1);
    }
  }
}
