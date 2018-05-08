import { Component, OnInit } from '@angular/core';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-change-html',
  templateUrl: './modal-change-html.component.html',
  styleUrls: ['./modal-change-html.component.scss']
})
export class ModalChangeHtmlComponent implements OnInit {
  content;
  constructor(private cService: ComponentActionService, private dialogRef: MatDialogRef<ModalChangeHtmlComponent>,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.content = JSON.parse(JSON.stringify(this.cService.selectedComponent.component.content));
  }
  save() {
    try {
      this.cService.selectedComponent.component.content = JSON.parse(JSON.stringify(this.content));
      this.dialogRef.close();
      this.snackBar.open('Cập nhật HTML thành công', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'primary'
      });
    } catch (error) {
      this.snackBar.open('Cập nhật HTML thất bại', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'warn'
      });
    }
  }
}
