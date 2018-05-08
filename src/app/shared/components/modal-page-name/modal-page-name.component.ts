import { Component, OnInit, Inject } from '@angular/core';
import { PageActionService } from '../../services/page-action.service';
import { UserService } from '../../services/user.service';
import { SectionActionService } from '../../services/section-action.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-page-name',
  templateUrl: './modal-page-name.component.html',
  styleUrls: ['./modal-page-name.component.scss']
})
export class ModalPageNameComponent implements OnInit {
  private _pageName: string;
  constructor(private pService: PageActionService, private uService: UserService, private sService: SectionActionService,
    private snackBar: MatSnackBar, private router: Router, private dialogRef: MatDialogRef<ModalPageNameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.pageName) {
      this._pageName = data.pageName;
    }
  }

  ngOnInit() {
  }
  get pageName() {
    return this._pageName;
  }
  set pageName(pageName) {
    this._pageName = pageName.trim().replace(/[\/\\]/g, '');
  }
  get validPageName() {
    return this._pageName && this.pageName.length > 0;
  }
  createPage() {
    if (this.validPageName) {
      this.dialogRef.close(this.pageName.replace(/[\/\\<>:"'|?*]/g, ''));
    }
  }
}
