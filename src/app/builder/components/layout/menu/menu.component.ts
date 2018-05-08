import { Component, OnInit } from '@angular/core';
import { GenerateHTML } from '../../../classes/generate-HTML';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { UserService } from '../../../../shared/services/user.service';
import { WidgetElementComponent } from '../../edit-area/widget-element/widget-element.component';
import * as requestConstant from '../../../../shared/services/server-configuration';
import { ComponentActionService } from '../../../../shared/services/component-action.service';
import { Router } from '@angular/router';
import { ModalPageNameComponent } from '../../../../shared/components/modal-page-name/modal-page-name.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public sService: SectionActionService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog,
    private uService: UserService, private pService: PageActionService, private cService: ComponentActionService) { }

  ngOnInit() {
  }
  get userName() {
    return this.uService.getCurrentUser();
  }
  get curentPublish() {
    return this.pService.getCurrentPublish();
  }
  get product() {
    return this.uService.getCurrentProduct();
  }
  get pageName() {
    return this.pService.getCurrentPage();
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  set isMobile(isMobile) {
    this.pService.isMobile = isMobile;
  }
  get serverHost() {
    return this.uService.serverUrl;
  }
  publish() {
    if (!this.uService.publishUrl) {
      this.snackBar.open('Vui lòng cung cấp đường dẫn Publish trong file config', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'warn'
      });
    } else {
      this.pService.loadPage(this.userName, this.product, this.pService.getCurrentPage(), this.pService.getCurrentPublish())
        .subscribe(data => {
          const body = {
            'userName': this.userName,
            'product': this.product,
            'htmlContent': data['htmlContent'],
          };
          this.pService.publishToIshopGo(body)
            .subscribe(res => {
              if (!res) {
                this.snackBar.open('Publish trang không thành công', 'Đóng', {
                  duration: 2000,
                  verticalPosition: 'top',
                  panelClass: 'warn'
                });
              } else {
                this.pService.publishFile(this.userName, this.product, this.pService.getCurrentPage()).subscribe(res1 => {
                  if (res1) {
                    this.snackBar.open('Publish trang thành công', 'Đóng', {
                      duration: 2000,
                      verticalPosition: 'top',
                      panelClass: 'primary'
                    });
                    this.router.navigate(
                      ['/builder'],
                      {
                        queryParams: {
                          'userName': this.userName, 'product': this.product, 'fileName': this.pService.getCurrentPage()
                          , 'publish': true
                        }
                      }
                    );
                  } else {
                    this.snackBar.open('Publish trang không thành công', 'Đóng', {
                      duration: 2000,
                      verticalPosition: 'top',
                      panelClass: 'warn'
                    });
                  }
                });
              }
            }, err => {
              this.snackBar.open('Publish trang không thành công', 'Đóng', {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: 'warn'
              });
            });
        });
    }
  }
  saveUrl(url: string) {
    return encodeURIComponent(url);
  }
  orderInterface() {
    this.sService.orderInterface();
  }

  preview() {
    const html = new GenerateHTML(this.pService.page);
    const wnd = window.open('preview:builder', '_blank');
    wnd.document.write(html.html);
  }

  savePage() {
    this.cService.unAttachComponent();
    const body = {
      pageName: this.pageName,
      jsonContent: JSON.stringify(this.pService.page),
      htmlContent: new GenerateHTML(this.pService.page).html
    };
    this.pService.savePage(this.userName, this.product, this.pService.getCurrentPublish(), body).subscribe(data => {
      if (!data) {
        this.snackBar.open('Lưu trang không thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'warn'
        });
      } else {
        this.snackBar.open('Lưu trang thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'primary'
        });
        if (this.pService.getCurrentPublish()) {
          this.router.navigate(
            ['/builder'],
            {
              queryParams: {
                'userName': this.userName, 'product': this.product, 'fileName': this.pService.getCurrentPage()
                , 'publish': false
              }
            }
          );
        }
      }
    });
  }
  get isShowUndo() {
    return this.pService.isShowUndo;
  }
  undo() {
    if (this.pService.undo()) {
      this.sService.reset();
      this.cService.reset();
    }
  }

  get isShowRedo() {
    return this.pService.isShowRedo;
  }

  redo() {
    if (this.pService.redo()) {
      this.sService.reset();
      this.cService.reset();
    }
  }

  resetSelected() {
    this.sService.selectedSection = null;
    this.cService.selectedComponent = null;
  }

  openRenameDialog() {
    const pageNameRef = this.dialog.open(ModalPageNameComponent, {
      width: '250px',
      data: {
        pageName: this.pageName
      }
    });
    pageNameRef.afterClosed().subscribe(pageName => {
      if (pageName) {
        // Rename
      }
    });
  }
}
