import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageActionService } from '../shared/services/page-action.service';
import { UserService } from '../shared/services/user.service';
import { SectionActionService } from '../shared/services/section-action.service';
import { ComponentActionService } from '../shared/services/component-action.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  constructor(private route: ActivatedRoute, private pService: PageActionService, private uService: UserService,
    private sService: SectionActionService, private cService: ComponentActionService, private http: Http) {
    this.route.queryParams.subscribe(params => {
      this.sService.reset();
      this.pService.reset();
      this.cService.reset();
      uService.setCurrentUser(params['userName']);
      uService.setCurrentProduct(params['product']);
    });
  }

  ngOnInit() {
  }
}
