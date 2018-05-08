import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as requestConstant from '../shared/services/server-configuration';
import { TemplateActionService } from './services/template-action.service';
import { ModalPageNameComponent } from '../shared/components/modal-page-name/modal-page-name.component';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { PageActionService } from '../shared/services/page-action.service';
import { UserService } from '../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalNewPageComponent } from '../default/components/modal-new-page/modal-new-page.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  categories;
  active;
  templates;
  constructor(private http: Http, private tService: TemplateActionService, private dialog: MatDialog,
    private pService: PageActionService, private uService: UserService, private snackBar: MatSnackBar,
    private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      uService.setCurrentUser(params['userName']);
      uService.setCurrentProduct(params['product']);
    });
  }
  ngOnInit() {
    this.uService.loadConfig().subscribe(res => {
      this.tService.getCategories().subscribe(data => {
        this.categories = data;
        if (this.categories && this.categories.length > 0) {
          this.loadCategory(this.categories[0]);
        }
      });
    });
  }
  get hostUrl() {
    return this.uService.serverUrl;
  }
  loadCategory(category) {
    this.active = category;
    this.tService.getTemplates(category.value).subscribe(data => {
      this.templates = data;
    });
  }

  get userName() {
    return this.uService.getCurrentUser();
  }
  get product() {
    return this.uService.getCurrentProduct();
  }

  selectTemplate(template) {
    const pageNameRef = this.dialog.open(ModalPageNameComponent, {
      width: '250px'
    });
    pageNameRef.afterClosed().subscribe(pageName => {
      if (pageName) {
        this.tService.getTemplate(template.catalog, template.fileName).subscribe(data => {
          const body = {
            pageName: pageName,
            jsonContent: data.jsonContent,
            htmlContent: data.htmlContent
          };
          this.pService.savePage(this.userName, this.product, false, body).subscribe(result => {
            if (!data) {
              this.snackBar.open('Tạo trang không thành công', 'Đóng', {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: 'warn'
              });
            } else {
              this.router.navigate(
                ['/builder'],
                { queryParams: { 'userName': this.userName, 'product': this.product, 'fileName': pageName, 'publish': false } }
              );
              pageNameRef.close();
            }
          });
        });
      }
    });
  }
}
