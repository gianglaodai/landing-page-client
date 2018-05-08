import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from '../../../shared/services/user.service';
import { PageActionService } from '../../../shared/services/page-action.service';
import { Router } from '@angular/router';
import { ModalPageNameComponent } from '../../../shared/components/modal-page-name/modal-page-name.component';
import { GenerateHTML } from '../../../builder/classes/generate-HTML';

@Component({
  selector: 'app-modal-new-page',
  templateUrl: './modal-new-page.component.html',
  styleUrls: ['./modal-new-page.component.scss']
})
export class ModalNewPageComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ModalNewPageComponent>, private uService: UserService,
    private pService: PageActionService, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }
  get userName() {
    return this.uService.getCurrentUser();
  }
  get product() {
    return this.uService.getCurrentProduct();
  }
  closeDialog() {
    this.dialogRef.close();
  }

  createBlankPage() {
    const pageNameRef = this.dialog.open(ModalPageNameComponent, {
      width: '250px'
    });
    pageNameRef.afterClosed().subscribe(pageName => {
      if (pageName) {
        const page = {
          pageConfigs: {
            title: 'Trang trắng'
          },
          pageTracking: {},
          sections: []
        };
        const body = {
          pageName: pageName,
          jsonContent: JSON.stringify(page),
          htmlContent: new GenerateHTML(page).html
        };
        this.pService.savePage(this.userName, this.product, false, body).subscribe(data => {
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
            this.closeDialog();
          }
        });
      }
    });
  }

}
