import { Component, OnInit } from '@angular/core';
import { TemplateActionService } from '../../../templates/services/template-action.service';
import { Page } from '../../../shared/interfaces/page';
import { GenerateHTML } from '../../../builder/classes/generate-HTML';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-add-template',
  templateUrl: './modal-add-template.component.html',
  styleUrls: ['./modal-add-template.component.scss']
})
export class ModalAddTemplateComponent implements OnInit {
  templateName;
  catalog;
  jsonContent;
  categories;
  templateImage;
  constructor(private tService: TemplateActionService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  set image(files) {
    this.templateImage = files[0];
  }
  addTemplate() {
    const page: Page = {
      pageConfigs: {
        title: this.templateName
      },
      pageTracking: {},
      sections: JSON.parse(this.jsonContent)
    };
    // console.log(this.image);
    const body = {
      pageName: this.templateName,
      jsonContent: JSON.stringify(page),
      htmlContent: new GenerateHTML(page).html,
      // image: this.templateImage
    };
    this.tService.saveTemplate(this.catalog.value, body).subscribe(data => {
      if (!data) {
        this.snackBar.open('Tạo template không thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'warn'
        });
      } else {
        this.snackBar.open('Tạo template thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'primary'
        });
      }
    });
  }
}
