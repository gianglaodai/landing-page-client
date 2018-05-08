import { PageConfig } from './page-config';
import { PageTracking } from './page-tracking';
import { WidgetSection } from './widget-section';
export interface Page {
  isPublish?: boolean;
  pageConfigs: PageConfig;
  pageTracking: PageTracking;
  sections: WidgetSection[];
}
