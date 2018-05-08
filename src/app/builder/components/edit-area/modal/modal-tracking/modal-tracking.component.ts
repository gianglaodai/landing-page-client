import { Component, OnInit } from '@angular/core';
import { PageTracking } from '../../../../../shared/interfaces/page-tracking';
import { TrackingActionService } from '../../../../../shared/services/tracking-action.service';
import * as componentType from '../../../../../shared/common/component-type';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-tracking',
  templateUrl: './modal-tracking.component.html',
  styleUrls: ['./modal-tracking.component.scss']
})
export class ModalTrackingComponent implements OnInit {
  tracking: PageTracking;
  constructor(private tService: TrackingActionService, private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalTrackingComponent>) { }

  ngOnInit() {
    this.tracking = JSON.parse(JSON.stringify(this.tService.tracking));
  }
  get options() {
    return componentType.EVENT_SUGGESTIONS;
  }
  saveTracking() {
    try {
      this.tService.tracking = this.tracking;
      this.dialogRef.close();
      this.snackBar.open('Cập nhật sự kiện thành công', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'primary'
      });
    } catch (error) {
      this.snackBar.open('Cập nhật sự kiện thất bại', 'Đóng', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'warn'
      });
    }
  }
  selectEventSuggest(value) {
    this.tracking.headEvent = `<script>${value}</script>\n${this.tracking.headEvent}`;
  }
}
