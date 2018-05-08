import { WidgetComponent } from '../interfaces/widget-component';

export const IMAGE = 'IMAGE';
export const BUTTON = 'BUTTON';
export const H1 = 'H1';
export const H2 = 'H2';
export const H3 = 'H3';
export const H4 = 'H4';
export const H5 = 'H5';
export const H6 = 'H6';
export const HEADING_COMPONENT = [H1, H2, H3, H4, H5, H6];
export const P = 'P';
export const UL = 'UL';
export const BOX = 'BOX';
export const HLINE = 'HLINE';
export const VLINE = 'VLINE';
export const SHAPE = 'SHAPE';
export const TEXT_COMPONENT = [H1, H2, H3, H4, H5, H6, P, UL];
export const FORM = 'FORM';
export const FORM_INPUT = 'FORM_INPUT';
export const FORM_SELECT = 'FORM_SELECT';
export const FORM_TEXTAREA = 'FORM_TEXTAREA';
export const FORM_CONTROL = [FORM_INPUT, FORM_SELECT, FORM_TEXTAREA];
export const YOUTUBE = 'YOUTUBE';
export const GMAP = 'GMAP';
export const COUNTDOWN = 'COUNTDOWN';
export const GROUP = 'GROUP';
export const HTML = 'HTML';
export const CAROUSEL = 'CAROUSEL';
export const COMMENTS = 'COMMENTS';

export const N_RESIZE = 'n';
export const W_RESIZE = 'w';
export const E_RESIZE = 'e';
export const S_RESIZE = 's';
export const NW_RESIZE = 'nw';
export const NE_RESIZE = 'ne';
export const SE_RESIZE = 'se';
export const SW_RESIZE = 'sw';
export const XY_RESIZE: Array<string> = [N_RESIZE, W_RESIZE, S_RESIZE, E_RESIZE, SE_RESIZE, SW_RESIZE, NW_RESIZE, NE_RESIZE];
export const X_RESIZE: Array<string> = [W_RESIZE, E_RESIZE];
export const Y_RESIZE: Array<string> = [N_RESIZE, S_RESIZE];
export const RESIZE_DIRECTIONS = {
  IMAGE: XY_RESIZE,
  BUTTON: XY_RESIZE,
  H1: X_RESIZE,
  H2: X_RESIZE,
  H3: X_RESIZE,
  H4: X_RESIZE,
  H5: X_RESIZE,
  H6: X_RESIZE,
  P: X_RESIZE,
  BOX: XY_RESIZE,
  HLINE: X_RESIZE,
  VLINE: Y_RESIZE,
  SHAPE: [SE_RESIZE, SW_RESIZE, NW_RESIZE, NE_RESIZE],
  YOUTUBE: XY_RESIZE,
  GROUP: XY_RESIZE,
  HTML: XY_RESIZE,
  GMAP: XY_RESIZE,
  FORM: XY_RESIZE,
  FORM_TEXTAREA: XY_RESIZE,
  CAROUSEL: XY_RESIZE,
  COMMENTS: XY_RESIZE
};

export const INPUT_TYPE_TEXT = 'text';
export const INPUT_TYPE_EMAIL = 'email';
export const INPUT_TYPE_TEL = 'tel';
export const INPUT_TYPE_DATE = 'date';
export const INPUT_TYPE = [INPUT_TYPE_TEXT, INPUT_TYPE_EMAIL, INPUT_TYPE_TEL];

export const EVENT_SUGGESTIONS = [
  {
    name: 'Facedbook AddToCart',
    value: `fbq('track', 'Purchase');`
  },
  {
    name: 'Facedbook Purchase',
    value: `fbq('track', 'Purchase');`
  },
  {
    name: 'Facedbook CompleteRegistration',
    value: `fbq('track', 'CompleteRegistration');`
  },
  {
    name: 'Facedbook Lead',
    value: `fbq('track', 'Lead');`
  },
  {
    name: 'Google Analytics',
    value: `ga('send', 'event', {
      eventCategory: 'General',
      eventAction: 'click',
      eventLabel: 'Lead',
      eventValue: 10});`
  },
];

export const LI_TYPE = {
  'decimal': 'decimal',
  'uperAlpha': 'upper-alpha',
  'lowerAlpha': 'lower-alpha',
  'upperRoman': 'upper-roman',
  'lowerRoman': 'lower-roman',
  'square': 'square',
  'disc': 'disc',
};
export const ASPECT_RATIO = {
  SHAPE: true
};

export const LINK_SECTION = 'section', LINK_POPUP = 'popup', LINK_PHONE = 'phone', LINK_HREF = 'href', LINK_EMAIL = 'email';

export const IMG_COMPONENT: WidgetComponent = {
  'id': IMAGE + new Date().getTime().toString(),
  'type': IMAGE,
  'content': '',
  'rect': {
    'dimension': {
      'width': 0,
      'height': 0
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'background-color': 'rgba(255,255,255,1)',
    'background-size': 'cover',
    'background-position': 'center center',
    'background-origin': 'content-box',
    'background-repeat': 'no-repeat'
  }
};

export const SHAPE_COMPONENT: WidgetComponent = {
  'id': SHAPE + new Date().getTime().toString(),
  'type': SHAPE,
  'content': '',
  'rect': {
    'dimension': {
      'width': 32,
      'height': 32
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'fill': 'rgb(0,0,0)'
  }
};
export const BUTTON_COMPONENT: WidgetComponent = {
  'id': BUTTON + new Date().getTime().toString(),
  'type': BUTTON,
  'content': 'NHẤN NÚT',
  'rect': {
    'dimension': {
      'width': 160,
      'height': 40
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'background-color': 'rgb(61, 155, 233)',
    'border-radius': '5px',
    'font-size': '14px',
    'line-height': '18px',
    'padding': '11px',
    'color': 'rgba(255,255,255,1)',
    'text-align': 'center'
  }
};
export const H1_COMPONENT: WidgetComponent = {
  'id': H1 + new Date().getTime().toString(),
  'type': H1,
  'content': 'Tiêu đề H1',
  'rect': {
    'dimension': {
      'width': 174
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '36px',
    'line-height': '42px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};
export const H2_COMPONENT: WidgetComponent = {
  'id': H2 + new Date().getTime().toString(),
  'type': H2,
  'content': 'Tiêu đề H2',
  'rect': {
    'dimension': {
      'width': 145
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '30px',
    'line-height': '36px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};

export const H3_COMPONENT: WidgetComponent = {
  'id': H3 + new Date().getTime().toString(),
  'type': H3,
  'content': 'Tiêu đề H3',
  'rect': {
    'dimension': {
      'width': 116
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '24px',
    'line-height': '30px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};

export const H4_COMPONENT: WidgetComponent = {
  'id': H4 + new Date().getTime().toString(),
  'type': H4,
  'content': 'Tiêu đề H4',
  'rect': {
    'dimension': {
      'width': 116
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '21px',
    'line-height': '27px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};

export const H5_COMPONENT: WidgetComponent = {
  'id': H5 + new Date().getTime().toString(),
  'type': H5,
  'content': 'Tiêu đề H5',
  'rect': {
    'dimension': {
      'width': 87
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '18px',
    'line-height': '24px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};
export const H6_COMPONENT: WidgetComponent = {
  'id': H6 + new Date().getTime().toString(),
  'type': H6,
  'content': 'Tiêu đề H6',
  'rect': {
    'dimension': {
      'width': 78
    },
    'offset': {
      'top': 0,
      'left': 0
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '16px',
    'line-height': '22px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};

export const P_COMPONENT: WidgetComponent = {
  'id': P + new Date().getTime().toString(),
  'type': P,
  'content': `Trong các chiến dịch quảng cáo phục vụ marketing,
  Landing Page là một trang web đơn độc lập khác với website chính của bạn,
  với nội dung được thiết kế để phục vụ một mục tiêu duy nhất!`,
  'rect': {
    'dimension': {
      'width': 223
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-radius': '5px',
    'font-size': '14px',
    'line-height': '19px',
    'font-weight': 400,
    'color': 'rgb(0, 0, 0)'
  }
};
export const UL_COMPONENT: WidgetComponent = {
  'id': UL + new Date().getTime().toString(),
  'type': UL,
  'rect': {
    'dimension': {
      'width': 200
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'content': `
  <li>Danh sách 1</li>
  <li>Danh sách 2</li>
  <li>Danh sách 3</li>
  <li>Danh sách 4</li>
  `,
  'contentStyle': {
    'counter-reset': 'linum',
    'font-size': '14px',
    'line-height': '20px',
    'color': 'rgb(0,0,0)'
  },
  'ulData': {
    'type': 'list',
    'liStyles': {
      '--margin-bottom': '10px'
    },
    'iconStyles': {
      '--width': '30px',
      '--height': '30px',
      '--font-size': '15px',
      '--margin-top': '0px',
      '--margin-right': '0px',
      '--color': 'rgba(0,0,0,1)',
      '--content': 'counter(linum,decimal)'
    }
  }
};
export const BOX_COMPONENT: WidgetComponent = {
  'id': BOX + new Date().getTime().toString(),
  'type': BOX,
  'rect': {
    'dimension': {
      'width': 270,
      'height': 270
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'overlay': 'rgba(0,0,0,0)',
  'contentStyle': {
    'background-color': 'rgb(189, 189, 189)',
    'background-position-x': 'center',
    'background-position-y': 'center',
    'background-repeat': 'no-repeat',
    'object-fit': 'cover'
  },
};
export const HLINE_COMPONENT: WidgetComponent = {
  'id': HLINE + new Date().getTime().toString(),
  'type': HLINE,
  'rect': {
    'dimension': {
      'width': 400,
      'height': 25
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-style': 'solid',
    'border-color': 'rgb(0, 0, 0)',
    'border-top-width': '1px'
  },
};

export const VLINE_COMPONENT: WidgetComponent = {
  'id': VLINE + new Date().getTime().toString(),
  'type': VLINE,
  'rect': {
    'dimension': {
      'width': 25,
      'height': 150
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'border-style': 'solid',
    'border-color': 'rgb(0, 0, 0)',
    'border-left-width': '1px'
  },
};

export const YOUTUBE_COMPONENT: WidgetComponent = {
  'id': YOUTUBE + new Date().getTime().toString(),
  'type': YOUTUBE,
  'content': '',
  'youtube': {
    'src': 'https://www.youtube.com/embed/rV58BKAWGi0',
    'autoplay': false
  },
  'rect': {
    'dimension': {
      'width': 356,
      'height': 200
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'background-color': 'rgba(255,255,255,1)',
    'background-size': 'cover',
    'background-position': 'center center'
  }
};

export const GMAP_COMPONENT: WidgetComponent = {
  'id': GMAP + new Date().getTime().toString(),
  'type': GMAP,
  'content': '',
  'gmap': {
    'latitude': 21.0209852,
    'longitude': 105.7835799,
    'zoom': 14,
    'markerLabel': 'Tầng 8, tòa nhà báo Nông Thôn Ngày Nay, Dương Đình Nghệ, Cầu Giấy, Hà Nội',
    'locationLabel': 'Tầng 8, tòa nhà báo Nông Thôn Ngày Nay, Dương Đình Nghệ, Cầu Giấy, Hà Nội',
    'mapTypeId': 'roadmap'
  },
  'rect': {
    'dimension': {
      'width': 500,
      'height': 300
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'background-color': 'rgba(255,255,255,1)',
    'background-size': 'cover',
    'background-position': 'center center'
  }
};
export const COUNTDOWN_COMPONENT: WidgetComponent = {
  'id': COUNTDOWN + new Date().getTime().toString(),
  'type': COUNTDOWN,
  'countdown': {
    'endTime': new Date().getTime()
  },
  'rect': {
    'dimension': {
      'width': 247,
      'height': 57
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'contentStyle': {
    'font-family': '"Open Sans", sans-serif',
    'color': 'rgbA(0,0,0,1)',
    'font-size': '40px',
    'font-weight': '700'
  }
};
export const CAROUSEL_COMPONENT: WidgetComponent = {
  'id': CAROUSEL + new Date().getTime().toString(),
  'type': CAROUSEL,
  'rect': {
    'dimension': {
      'width': 375,
      'height': 375
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'carousel': {
    'auto': true,
    'interval': 4000,
    'slides': [
      {
        'overlay': 'rgba(0,0,0,0)',
        'contentStyle': {
          'background-color': 'rgba(255,255,255,.5)',
          'background-position': 'center center',
          'background-repeat': 'no-repeat'
        }
      },
      {
        'overlay': 'rgba(0,0,0,0)',
        'contentStyle': {
          'background-color': 'rgba(255,255,255,.5)',
          'background-position': 'center center',
          'background-repeat': 'no-repeat'
        }
      },
      {
        'overlay': 'rgba(0,0,0,0)',
        'contentStyle': {
          'background-color': 'rgba(255,255,255,.5)',
          'background-position': 'center center',
          'background-repeat': 'no-repeat'
        }
      }
    ]
  }
};
export const HTML_COMPONENT: WidgetComponent = {
  'id': HTML + new Date().getTime().toString(),
  'type': HTML,
  'content': '<h4>MÃ HTML, CSS, JAVASCRIPT, IFRAME</h4>\n<p>(Xem Trước hoặc Xuất bản để hiển thị)</p>',
  'rect': {
    'dimension': {
      'width': 450,
      'height': 280
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  }
};
export const GROUP_COMPONENT: WidgetComponent = {
  'id': GROUP + new Date().getTime().toString(),
  'type': GROUP,
  'rect': {
    'dimension': {
      'width': 0,
      'height': 0
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  }
};
export const PRODUCT_COMPONENT: WidgetComponent = {
  'id': GROUP + new Date().getTime().toString(),
  'type': GROUP,
  'rect': {
    'dimension': {
      'width': 200,
      'height': 304
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  },
  'childrens': [{
    'id': IMAGE + new Date().getTime().toString(),
    'type': IMAGE,
    'content': '',
    'rect': {
      'dimension': {
        'width': 200,
        'height': 240
      },
      'offset': {
        'top': 0,
        'left': 0,
      }
    },
    'contentStyle': {
      'background-color': 'rgba(255,255,255,1)',
      'background-size': 'cover',
      'background-position': 'center center',
      'background-origin': 'content-box',
      'background-repeat': 'no-repeat'
    }
  }, {
    'id': H3 + new Date().getTime().toString(),
    'type': H3,
    'content': 'Sản phẩm',
    'rect': {
      'dimension': {
        'width': 200
      },
      'offset': {
        'top': 255,
        'left': 0,
      }
    },
    'contentStyle': {
      'font-size': '14px',
      'line-height': '17px',
      'letter-spacing': '1.12px',
      'font-weight': 700,
      'font-family': 'Roboto',
      'color': 'rgba(85,85,85,1)',
      'text-transform': 'uppercase',
      'text-align': 'center',
    }
  }, {
    'id': P + new Date().getTime().toString(),
    'type': P,
    'content': `0 VND`,
    'rect': {
      'dimension': {
        'width': 200
      },
      'offset': {
        'top': 289,
        'left': 0,
      }
    },
    'contentStyle': {
      'font-size': '15px',
      'line-height': '15px',
      'font-weight': 400,
      'text-align': 'center',
      'color': 'rgba(152,56,55,1)'
    }
  }]
};
export const FORM_COMPONENT: WidgetComponent = {
  'id': FORM + new Date().getTime().toString(),
  'type': FORM,
  'content': null,
  'rect': {
    'dimension': {
      'width': 300, 'height': 285
    }, 'offset': {
      'top': 108, 'left': 304
    }
  },
  'contentStyle': {
    'background-repeat': 'no-repeat',
    'object-fit': 'cover'
  },
  'formStyles': {
    'controlBackground': 'rgba(255,255,255,1)',
    'color': 'rgba(0,0,0,1)',
    'placeholderColor': 'rgba(199,199,205,1)',
    'fontSize': '14px'
  },
  'childrens': [
    {
      'id': INPUT_TYPE_TEXT + new Date().getTime().toString(),
      'type': FORM_INPUT,
      'content': null,
      'formControl': {
        'type': INPUT_TYPE_TEXT,
        'placeholder': 'Họ và tên',
        'name': 'fullName1',
        'required': true
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }, {
      'id': INPUT_TYPE_EMAIL + new Date().getTime().toString(),
      'type': FORM_INPUT,
      'content': null,
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 45, 'left': 0
        }
      },
      'formControl': {
        'type': INPUT_TYPE_EMAIL,
        'name': 'email1',
        'placeholder': 'Email của bạn',
        'required': true
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      },
    }, {
      'id': INPUT_TYPE_TEL + new Date().getTime().toString(),
      'type': FORM_INPUT,
      'content': null,
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 90, 'left': 0
        }
      },
      'formControl': {
        'type': INPUT_TYPE_TEL,
        'placeholder': 'Số điện thoại của bạn',
        'name': 'phone1',
        'pattern': /((\+[1-9]{1,4}[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9 \-]{6,15}?$/,
        'required': true
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }, {
      'id': FORM_TEXTAREA + new Date().getTime().toString(),
      'type': FORM_TEXTAREA,
      'content': null,
      'rect': {
        'dimension': {
          'width': 300, 'height': 100
        },
        'offset': {
          'top': 135,
          'left': 0
        }
      },
      'formControl': {
        'placeholder': 'Để lại lời nhắn cho chúng tôi',
        'name': 'content1',
        'required': true
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
        'text-align': ''
      },
    }, {
      'id': BUTTON + new Date().getTime().toString(),
      'type': BUTTON,
      'content': 'NHẤN NÚT',
      'rect': {
        'dimension': {
          'width': 160,
          'height': 40
        },
        'offset': {
          'top': 245,
          'left': 0,
        }
      },
      'contentStyle': {
        'background-color': 'rgb(61, 155, 233)',
        'border-radius': '5px',
        'font-size': '14px',
        'line-height': '18px',
        'padding': '11px',
        'color': 'rgba(255,255,255,1)',
        'text-align': 'center'
      }
    }
  ]
};
export const COMMENTS_COMPONENT: WidgetComponent = {
  'id': COMMENTS + new Date().getTime().toString(),
  'type': COMMENTS,
  'content': null,
  'comments': {
    'href': 'https://developers.facebook.com/docs/plugins/comments#configurator',
    'posts': 5
  },
  'rect': {
    'dimension': {
      'width': 500,
      'height': 200
    },
    'offset': {
      'top': 0,
      'left': 0,
    }
  }
};

export const SUPPORTED_FORM_CONTROLS: { text: string, formControl: WidgetComponent }[] = [
  {
    text: 'Mặc định (<input type="text">)',
    formControl: {
      'id': FORM_INPUT + (new Date().getTime() + 1).toString(),
      'type': FORM_INPUT,
      'content': null,
      'formControl': {
        'type': INPUT_TYPE_TEXT,
        'placeholder': 'Dữ liệu text',
        'name': 'text' + new Date().getTime(),
        'required': true
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  },
  {
    text: 'Email  (<input type="email">)',
    formControl: {
      'id': FORM_INPUT + (new Date().getTime() + 1).toString(),
      'type': FORM_INPUT,
      'content': null,
      'formControl': {
        'type': INPUT_TYPE_EMAIL,
        'placeholder': 'Email của bạn',
        'name': 'email' + new Date().getTime(),
        'required': true
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  },
  {
    text: 'Số điện thoại (<input type="tel">)',
    formControl: {
      'id': FORM_INPUT + (new Date().getTime() + 1).toString(),
      'type': FORM_INPUT,
      'content': null,
      'formControl': {
        'type': INPUT_TYPE_TEL,
        'placeholder': 'Số điện thoại của bạn',
        'name': 'phone' + new Date().getTime(),
        'required': true,
        'pattern': /((\+[1-9]{1,4}[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9 \-]{6,15}?$/
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  },
  {
    text: 'Ngày tháng (<input type="date">)',
    formControl: {
      'id': FORM_INPUT + (new Date().getTime() + 1).toString(),
      'type': FORM_INPUT,
      'content': null,
      'formControl': {
        'type': INPUT_TYPE_DATE,
        'placeholder': 'Nhập thời gian',
        'name': 'date' + new Date().getTime(),
        'required': true,
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  },
  {
    text: 'Nội dung (<textarea>)',
    formControl: {
      'id': FORM_TEXTAREA + (new Date().getTime() + 1).toString(),
      'type': FORM_TEXTAREA,
      'content': null,
      'formControl': {
        'placeholder': 'Nội dung',
        'name': 'phone' + new Date().getTime(),
        'required': true
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 100
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  },
  {
    text: 'Menu thả xuống (<select>)',
    formControl: {
      'id': FORM_SELECT + (new Date().getTime() + 1).toString(),
      'type': FORM_SELECT,
      'content': null,
      'formControl': {
        'name': 'select' + new Date().getTime(),
        'value': '',
        'placeholder': 'Vui lòng chọn',
        'options': [
          {
            'text': 'Vui lòng chọn',
            'value': ''
          }
        ],
        'required': true
      },
      'rect': {
        'dimension': {
          'width': 300, 'height': 36
        }, 'offset': {
          'top': 0, 'left': 0
        }
      },
      'contentStyle': {
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': 'rgb(238,238,238)',
      }
    }
  }
];

export const COMPONENTS = {
  IMG: IMG_COMPONENT,
  BUTTON: BUTTON_COMPONENT,
  H1: H1_COMPONENT,
  H2: H2_COMPONENT,
  H3: H3_COMPONENT,
  H4: H4_COMPONENT,
  H5: H5_COMPONENT,
  H6: H6_COMPONENT,
  P: P_COMPONENT,
  UL: UL_COMPONENT,
  BOX: BOX_COMPONENT,
  HLINE: HLINE_COMPONENT,
  VLINE: VLINE_COMPONENT,
  SHAPE: SHAPE_COMPONENT,
  YOUTUBE: YOUTUBE_COMPONENT,
  GMAP: GMAP_COMPONENT,
  COUNTDOWN: COUNTDOWN_COMPONENT,
  FORM: FORM_COMPONENT,
  HTML: HTML_COMPONENT,
  CAROUSEL: CAROUSEL_COMPONENT,
  COMMENTS: COMMENTS_COMPONENT
};
