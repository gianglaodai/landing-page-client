import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import * as requestConstant from '../../../../../shared/services/server-configuration';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
  selector: 'app-modal-section-template',
  templateUrl: './modal-section-template.component.html',
  styleUrls: ['./modal-section-template.component.scss']
})
export class ModalSectionTemplateComponent implements OnInit {
  categories;
  active;
  sectionTemplates;
  newSection = {
    pageName: null,
    catalog: null,
    jsonContent: null
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sService: SectionActionService, private uService: UserService,
   private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalSectionTemplateComponent>) {
  }

  ngOnInit() {
    this.sService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.categories && this.categories.length > 0) {
        this.loadCategory(this.categories[0]);
      }
    });
  }
  get hostUrl() {
    return this.uService.serverUrl;
  }
  get isAdmin() {
    return requestConstant.isAdmin;
  }
  loadCategory(category) {
    this.active = category;
    this.sService.getSectionTemplates(category.value).subscribe(data => {
      this.sectionTemplates = data;
    });
  }

  addSection(template) {
    let sectionId;
    const mostVisible = this.sService.mostVisible;
    if (this.data.sectionId) {
      sectionId = this.data.sectionId;
    } else if (mostVisible) {
      sectionId = mostVisible.section.id;
    }
    if (template) {
      this.sService.getTemplate(template.catalog, template.fileName).subscribe(data => {
        // console.log(JSON.parse(JSON.stringify(data.jsonContent)));
        // console.log(data.jsonContent);
        this.sService.addSection(sectionId, JSON.parse(data.jsonContent));
        this.dialogRef.close();
      });
    } else {
      const emptySection = {
        'id': 'SECTION1',
        'rect': {
          'dimension': {
            'height': 500
          }
        },
        'overlay': 'rgba(0,0,0,0)',
        'src': 'assets/img/noimage.png',
        'cateId': 1,
        'type': 'section',
        'contentStyle': {
          'background-color': 'rgba(255,255,255,1)'
        },
        'childrens': []
      };
      this.sService.addSection(sectionId, emptySection);
      this.dialogRef.close();
    }
  }
  addNewSection() {
    const body = {
      pageName: this.newSection.pageName,
      jsonContent: this.newSection.jsonContent,
      htmlContent: ''
    };
    // console.log(JSON.stringify(body));
    this.sService.addSectionTemplate(this.newSection.catalog, body).subscribe(data => {
      if (!data) {
        this.snackBar.open('Tạo section mẫu không thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'warn'
        });
      } else {
        this.snackBar.open('Tạo section mẫu thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'primary'
        });
      }
    });
  }
}
