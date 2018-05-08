import { Component, OnInit } from '@angular/core';
import { PageActionService } from '../../../shared/services/page-action.service';
import { UserService } from '../../../shared/services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as requestConstant from '../../../shared/services/server-configuration';
import { ModalAddTemplateComponent } from '../modal-add-template/modal-add-template.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private _pages;
  keyword;

  constructor(private pService: PageActionService, private uService: UserService, private snackBar: MatSnackBar,
    private dialog: MatDialog, private sanitizer: DomSanitizer, private http: Http) {
  }

  ngOnInit() {
    this.uService.loadConfig().subscribe(res => {
      this.pService.getPages(this.userName, this.product).subscribe(datas => {
        this._pages = datas;
      });
    });
    // const apiUrl = './assets/json/config.json';
    // this.http.get(apiUrl).map(res => res.json()).subscribe(res => {
    //   this.uService.setServerUrl(res['serverUrl']);
    //   this.pService.getPages(this.userName, this.product).subscribe(datas => {
    //     this._pages = datas;
    //   });
    // });
  }
  encodeCharacter(str) {
    return encodeURIComponent(str);
  }
  get pages() {
    if (this.keyword && this.keyword.trim().length) {
      return this._pages.filter(image => {
        return image.fileName.toLocaleLowerCase().search(this.keyword.toLowerCase()) >= 0;
      });
    }
    return this._pages;
  }
  get userName() {
    return this.uService.getCurrentUser();
  }
  get product() {
    return this.uService.getCurrentProduct();
  }
  get serverHost() {
    return this.uService.serverUrl;
  }
  get isAdmin() {
    return requestConstant.isAdmin;
  }
  saveUrl(url: string) {
    return encodeURIComponent(url);
  }
  addTemplate() {
    this.dialog.open(ModalAddTemplateComponent, {
      width: '650px'
    });
  }
  deletePage(pageName) {
    this.pService.deletePage(this.userName, [pageName], this.product).subscribe(data => {
      if (!data) {
        this.snackBar.open('Xóa trang không thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'warn'
        });
      } else {
        this.snackBar.open('Xóa trang thành công', 'Đóng', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: 'primary'
        });
      }
      this.pService.getPages(this.userName, this.product).subscribe(datas => {
        this.keyword = null;
        this._pages = datas;
      });
    });
  }
}
