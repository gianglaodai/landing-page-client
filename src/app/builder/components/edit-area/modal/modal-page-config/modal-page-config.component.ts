import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { PageConfigActionService } from '../../../../../shared/services/page-config-action.service';
import { MatChipInputEvent, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { PageConfig } from '../../../../../shared/interfaces/page-config';
import { ModalImageComponent } from '../modal-image/modal-image.component';

@Component({
  selector: 'app-modal-page-config',
  templateUrl: './modal-page-config.component.html',
  styleUrls: ['./modal-page-config.component.scss']
})
export class ModalPageConfigComponent implements OnInit {
  configs: PageConfig;
  separatorKeysCodes = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  constructor(private pcService: PageConfigActionService, private dialog: MatDialog, private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalPageConfigComponent>) {
  }

  ngOnInit() {
    this.configs = JSON.parse(JSON.stringify(this.pcService.configs));
  }
  addKeyword(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.configs.metaKeyword = this.configs.metaKeyword ? this.configs.metaKeyword : [];
      this.configs.metaKeyword.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeKeyword(keyword: any): void {
    const index = this.configs.metaKeyword.indexOf(keyword);
    if (index >= 0) {
      this.configs.metaKeyword.splice(index, 1);
    }
  }
  changeMetaImage() {
    const dialogRef = this.dialog.open(ModalImageComponent, {
      height: '90%',
      width: '90%',
      autoFocus: false,
      data: { isMultiple: false }
    });
    dialogRef.afterClosed().subscribe(images => {
      images.forEach(image => {
        this.configs.metaImage = image.url;
      });
    });
  }
  changeFavicon() {
    const dialogRef = this.dialog.open(ModalImageComponent, {
      height: '90%',
      width: '90%',
      autoFocus: false,
      data: { isMultiple: false }
    });
    dialogRef.afterClosed().subscribe(images => {
      images.forEach(image => {
        this.configs.favicon = image.url;
      });
    });
  }

  saveConfigs() {
    try {
      this.pcService.configs = this.configs;
      this.dialogRef.close();
      this.snackBar.open('Cập nhật cài đặt thành công', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'primary'
      });
    } catch (error) {
      this.snackBar.open('Cập nhật cài đặt thất bại', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'warn'
      });
    }
  }
}
