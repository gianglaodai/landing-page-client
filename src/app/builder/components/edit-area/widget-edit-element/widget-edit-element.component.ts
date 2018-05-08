import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetElementComponent } from '../widget-element/widget-element.component';
import * as componentType from '../../../../shared/common/component-type';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { MatDialog } from '@angular/material';
import { ModalChangeHtmlComponent } from '../modal/modal-change-html/modal-change-html.component';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { ModalFormControlsComponent } from '../modal/modal-form-controls/modal-form-controls.component';
import { ModalFormActionComponent } from '../modal/modal-form-action/modal-form-action.component';

@Component({
  selector: 'app-widget-edit-element',
  templateUrl: './widget-edit-element.component.html',
  styleUrls: ['./widget-edit-element.component.scss']
})
export class WidgetEditElementComponent implements OnInit {
  @Input('component') component;
  @Input('parent') parent;
  // TODO - hadgiang: enableEdit không thấy được dùng
  @Output('enableEdit') enableEdit = new EventEmitter();
  // TODO - hadgiang: action này vô nghĩa, nếu muốn tạo biến để template sử dụng thì phải declare nó
  // VD: private componentType = componentType; -> bỏ qua biến ngoài class.
  componentType = componentType;

  constructor(private cService: ComponentActionService, private dialog: MatDialog, private pService: PageActionService) { }
  get isMobile() {
    return this.pService.isMobile;
  }
  ngOnInit() {
  }
  deleteComponent(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // TODO - hadgiang: biến selectedID không được dùng ở đâu cả -> xem xét có xóa được không
    this.cService.deleteComponent(this.component.component, this.parent.section || this.parent.component);
  }

  cloneComponent(event: Event) {
    // TODO - hadgiang: 2 hàm bên dưới được copy từ hàm bên trên
    // -> extract thành 1 hàm để không copy code. VD: stopEventDefaultAction(event:any)
    event.preventDefault();
    event.stopPropagation();
    // TODO - hadgiang: biến selectedID không được dùng ở đâu cả -> xem xét có xóa được không
    this.cService.cloneComponent(this.component, this.parent.section || this.parent.component);
    // const selectedId: string = this.parent.component.id;
    // this.cService.cloneComponentByid(this.parent.elementRef);
  }
  editHTML() {
    const dialogRef = this.dialog.open(ModalChangeHtmlComponent, {
      width: '400px',
      height: '285px',
    });
  }
  manageFormControls() {
    const dialogRef = this.dialog.open(ModalFormControlsComponent, {
      width: '600px',
      data: {
        'component': this.component.component
      }
    });
  }
  manageFormAction() {
    const dialogRef = this.dialog.open(ModalFormActionComponent, {
      width: '800px',
      data: {
        'component': this.component.component
      }
    });
  }
}
