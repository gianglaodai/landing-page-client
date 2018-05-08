import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ComponentActionService } from '../shared/services/component-action.service';
import { SectionActionService } from '../shared/services/section-action.service';
import { PageActionService } from '../shared/services/page-action.service';
import { MatSidenavContent } from '@angular/material';
import { Http } from '@angular/http';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {
  @ViewChild('content') content;
  constructor(private cService: ComponentActionService, private sService: SectionActionService, private pService: PageActionService,
    private uService: UserService, private route: ActivatedRoute, private http: Http) {
    this.route.queryParams.subscribe(params => {
      this.uService.setCurrentUser(params['userName']);
      this.uService.setCurrentProduct(params['product']);
      this.pService.setCurrentPage(params['fileName']);
      this.pService.setCurrentPublish(params['publish']);
    });
  }
  ngOnInit() {
    this.sService.selectedSection = null;
    this.cService.selectedComponent = null;
    this.uService.loadConfig().subscribe(res => {
      this.pService.loadPage(this.uService.getCurrentUser(), this.uService.getCurrentProduct(),
      this.pService.getCurrentPage(), this.pService.getCurrentPublish())
        .subscribe(data => {
          this.pService.page = JSON.parse(data['jsonContent']);
        });
    });
    const contentHeight = document.querySelector('body').offsetHeight - 121 + 'px';
    (document.querySelector('#edit-content') as HTMLElement).style.minHeight =
      this.content.nativeElement.style.height = contentHeight;
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  get isShowSettingBar() {
    return this.pService.isShowSettingBar;
  }
  get isShowRuler() {
    return this.pService.isShowRuler;
  }
}
