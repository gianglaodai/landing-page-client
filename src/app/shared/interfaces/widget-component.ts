import { Rect } from './rect';
import { Gmap } from './gmap';
export interface WidgetComponent {
  'id': string;
  'type': string;
  'content'?: string;
  'rect': Rect;
  'mobileRect'?: Rect;
  'mobileHide'?: boolean;
  'mobileStyle'?: {
    'font-size'?: string,
    'text-align'?: string,
    'line-height'?: string
  };
  'src'?: string;
  'extClass'?: string;
  'comments'?: {
    'href'?: string,
    'posts'?: number
  };
  'animate'?: {
    'name'?: string,
    'duration'?: number,
    'delay'?: number
  };
  'formStyles'?: {
    'color'?: string,
    'controlBackground'?: string,
    'placeholderColor'?: string,
    'fontSize'?: string
  };
  'formAction'?: {
    type: 'email' | 'api',
    email?: {
      subject?: string,
      emailAddress?: string
    },
    apiUrl?: string
  };
  'sticky'?: {
    using?: boolean,
    position?: 'top' | 'bottom',
    padding?: string
  };
  'link'?: {
    type: string,
    target?: string,
    value: string
  };
  'tracking'?: string;
  'countdown'?: {
    'endTime': number
  };
  'carousel'?: {
    'auto'?: boolean,
    'interval'?: number,
    'slides'?: {
      'overlay'?: string,
      'contentStyle'?: {
        'background-color'?: string,
        'background-image'?: string,
        'background-size'?: string,
        'background-repeat'?: string,
        'background-position'?: string,
        'background-position-x'?: string,
        'background-position-y'?: string,
        'background-origin'?: string,
        'background-attachment'?: string
      }
    }[]
  };
  'formControl'?: {
    'type'?: string,
    'name'?: string,
    'apiName'?: string,
    'pattern'?: RegExp,
    'placeholder'?: string,
    'required'?: boolean,
    'value'?: any,
    'options'?: {
      'text': string,
      'value': string
    }[]
  };
  'youtube'?: {
    'src': string,
    'autoplay': boolean
  };
  'gmap'?: Gmap;
  'svg'?: {
    'view-box': string,
    'path': string
  };
  'overlay'?: string;
  'childrens'?: WidgetComponent[];
  'extStyle'?: string;
  'contentStyle'?: {
    'fill'?: string,
    'font-family'?: string,
    'background-color'?: string,
    'background-image'?: string,
    'background-size'?: string,
    'background-repeat'?: string,
    'background-position'?: string,
    'background-position-x'?: string,
    'background-position-y'?: string,
    'background-origin'?: string,
    'background-attachment'?: string,
    'object-fit'?: string,
    'padding'?: string,
    'font-weight'?: any,
    'font-style'?: string,
    'text-decoration'?: string,
    'text-transform'?: string,
    'letter-spacing'?: string,
    'padding-left'?: string,
    'padding-right'?: string,
    'color'?: string,
    'font-size'?: string,
    'text-align'?: string,
    'line-height'?: string,
    'counter-reset'?: string,
    'border-width'?: string,
    'border-top-width'?: string,
    'border-left-width'?: string,
    'border-style'?: string,
    'border-color'?: string,
    'border-radius'?: string,
    'box-shadow'?: string,
    'text-shadow'?: string
  };
  'ulData'?: {
    'type': 'list' | 'image' | 'icon',
    'liStyles'?: {
      '--margin-bottom'?: string;
    },
    'svg'?: {
      'view-box': string
      'path': string
    },
    'iconStyles'?: {
      '--width'?: string,
      '--height'?: string,
      '--font-size'?: string
      '--margin-top'?: string,
      '--color'?: string,
      '--margin-right'?: string,
      '--content'?: string,
      '--background-image'?: string
    }
  };
}
