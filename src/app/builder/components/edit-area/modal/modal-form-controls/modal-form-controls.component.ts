import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import * as componentType from '../../../../../shared/common/component-type';

@Component({
  selector: 'app-modal-form-controls',
  templateUrl: './modal-form-controls.component.html',
  styleUrls: ['./modal-form-controls.component.scss']
})
export class ModalFormControlsComponent implements OnInit {
  component: WidgetComponent;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {
    this.component = this.data.component;
  }
  get SUPPORTED_FORM_CONTROLS() {
    return componentType.SUPPORTED_FORM_CONTROLS;
  }
  get formControls() {
    if (!this.component.childrens) {
      this.component.childrens = [];
      return this.component.childrens;
    }
    return this.component.childrens.filter(formControl => {
      return componentType.FORM_CONTROL.indexOf(formControl.type) >= 0;
    });
  }
  add(formControl) {
    const newFormControl = JSON.parse(JSON.stringify(formControl));
    const maxPosition = this.getMaxPosition();
    newFormControl.rect.offset.top = maxPosition + 9;
    const btn = this.component.childrens[this.component.childrens.length - 1];
    btn.rect.offset.top += 9 + newFormControl.rect.dimension.height;
    this.component.rect.dimension.height += 9 + newFormControl.rect.dimension.height;
    if (!this.component.childrens) {
      this.component.childrens = [];
      this.component.childrens.push(newFormControl);
    } else {
      this.component.childrens.splice(this.component.childrens.length - 1, 0, newFormControl);
    }
  }
  getMaxPosition() {
    let max = 0;
    this.formControls.forEach(comp => {
      if (comp.rect.dimension.height + comp.rect.offset.top > max) {
        max = comp.rect.dimension.height + comp.rect.offset.top;
      }
    });
    return max;
  }
  clone(formControl) {
    const index = this.component.childrens.indexOf(formControl);
    if (index >= 0) {
      this.component.childrens.splice(index + 1, 0, JSON.parse(JSON.stringify(formControl)));
    }
  }
  delete(formControl) {
    const index = this.component.childrens.indexOf(formControl);
    if (index >= 0) {
      this.component.childrens.splice(index, 1);
    }
  }
}
