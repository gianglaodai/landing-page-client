import { Injectable } from '@angular/core';
import { PageActionService } from './page-action.service';
import { PageConfig } from '../interfaces/page-config';

@Injectable()
export class PageConfigActionService {

  constructor(private pService: PageActionService) { }
  get configs(): PageConfig {
    if (!this.pService.page.pageConfigs) {
      this.pService.page.pageConfigs = { title: 'Tiêu đề trang tự động' };
    }
    return this.pService.page.pageConfigs;
  }
  set configs(pageConfigs) {
    this.pService.page.pageConfigs = pageConfigs;
  }
}
