import { Component, OnInit, Inject } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as componentType from '../../../../../shared/common/component-type';
declare const gapi: any;
@Component({
  selector: 'app-modal-form-action',
  templateUrl: './modal-form-action.component.html',
  styleUrls: ['./modal-form-action.component.scss']
})
export class ModalFormActionComponent implements OnInit {
  component: WidgetComponent;
  componentType = componentType;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.component = this.data.component;
    if (!this.component.formAction) {
      this.component.formAction = JSON.parse(JSON.stringify({
        email: {}
      }));
    }
  }

  ngOnInit() {
  }

  get formAction() {
    return this.component.formAction;
  }
  get formActionAPIInfoCompleted() {
    if (this.formAction.type === 'email') {
      return this.formAction.email.emailAddress && this.formAction.email.subject;
    } else {
      return this.component.childrens.filter(child => {
        return child.type !== componentType.BUTTON && !child.formControl.apiName;
      }).length > 0 ? true : false;
    }
  }

  get formControlChilds() {
    return this.component.childrens.filter(child => {
      return child.type !== componentType.BUTTON;
    });
  }
}
