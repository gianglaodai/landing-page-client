import { Component, OnInit } from '@angular/core';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { PopupActionService } from '../../../../services/popup-action.service';
import * as requestConstant from '../../../../../shared/services/server-configuration';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
  selector: 'app-modal-popup-template',
  templateUrl: './modal-popup-template.component.html',
  styleUrls: ['./modal-popup-template.component.scss']
})
export class ModalPopupTemplateComponent implements OnInit {
  categories;
  active;
  sectionTemplates;
  newSection = {
    pageName: null,
    catalog: null,
    jsonContent: null
  };
  constructor(private sService: SectionActionService, private pService: PopupActionService, private snackBar: MatSnackBar,
    private uService: UserService, private dialogRef: MatDialogRef<ModalPopupTemplateComponent>) {
  }
  get hostUrl() {
    return this.uService.serverUrl;
  }
  get isAdmin() {
    return requestConstant.isAdmin;
  }

  ngOnInit() {
    this.pService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.categories && this.categories.length > 0) {
        this.loadCategory(this.categories[0]);
      }
    });
  }
  loadCategory(category) {
    this.active = category;
    this.pService.getSectionTemplates(category.value).subscribe(data => {
      this.sectionTemplates = data;
    });
  }

  addSection(template) {
    if (this.sService.selectedSection && this.sService.selectedSection.section.type === 'popup') {
      this.sService.selectedSection.section.popup.isShow = false;
    }
    const sectionId = this.sService.mostVisible.section.id;
    this.pService.getTemplate(template.catalog, template.fileName).subscribe(data => {
      // console.log(JSON.parse(JSON.stringify(data.jsonContent)));
      // console.log(data.jsonContent);
      this.sService.addSection(sectionId, JSON.parse(data.jsonContent));
      this.dialogRef.close();
    });
  }

  addNewSection() {
    const body = {
      pageName: this.newSection.pageName,
      jsonContent: this.newSection.jsonContent,
      htmlContent: ''
    };
    this.pService.addSectionTemplate(this.newSection.catalog, body).subscribe(data => {
      if (!data) {
        this.snackBar.open('Tạo popup mẫu không thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'warn'
        });
      } else {
        this.snackBar.open('Tạo popup mẫu thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'primary'
        });
      }
    });
  }
}
