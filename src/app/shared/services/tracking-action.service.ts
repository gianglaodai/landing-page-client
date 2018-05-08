import { Injectable } from '@angular/core';
import { PageActionService } from './page-action.service';
import { PageTracking } from '../interfaces/page-tracking';

@Injectable()
export class TrackingActionService {

  constructor(private pService: PageActionService) { }
  get tracking(): PageTracking {
    if (!this.pService.page.pageTracking) {
      this.pService.page.pageTracking = { };
    }
    return this.pService.page.pageTracking;
  }
  set tracking(pageTracking) {
    this.pService.page.pageTracking = pageTracking;
  }
}
