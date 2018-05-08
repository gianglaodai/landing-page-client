import { Component, ElementRef, OnInit } from '@angular/core';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { UserService } from '../../../../shared/services/user.service';
declare var $: any;

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {
  constructor(public sService: SectionActionService, private pService: PageActionService,
    private uService: UserService, public elementRef: ElementRef) {
  }
  get isShowRuler() {
    return this.pService.isShowRuler;
  }
  get sections() {
    return this.sService.sections;
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  ngOnInit() {
    // this.sections = this.sService.sections;
  }
}
