import { Rect } from './rect';
import { WidgetComponent } from './widget-component';
export interface WidgetSection {
  'id': string;
  'cateId'?: any;
  'type': string;
  'mobileHide'?: boolean;
  'mobileRect'?: Rect;
  // Phân loại template
  'src'?: string;
  'overlay'?: string;
  // Ảnh đại diện template
  'rect': Rect;
  'mobileStyle'?: {
    'background-color'?: string,
    'background-image'?: string,
    'background-size'?: string,
    'background-repeat'?: string,
    'background-position'?: string,
    'background-position-x'?: string,
    'background-position-y'?: string,
    'background-origin'?: string,
    'background-attachment'?: string
  };
  'popup'?: {
    'isShow'?: boolean
  };
  'contentStyle'?: {
    'background-color'?: string,
    'background-image'?: string,
    'background-size'?: string,
    'background-repeat'?: string,
    'background-position'?: string,
    'background-position-x'?: string,
    'background-position-y'?: string,
    'background-origin'?: string,
    'background-attachment'?: string,
    'display'?: string,
    [key: string]: any
  };
  'childrens'?: Array<WidgetComponent>;
}
