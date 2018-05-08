import { WidgetComponent } from '../interfaces/widget-component';
import { element } from 'protractor';
declare var $: any
var $iframe = $('.iframe-content');
var $sections = $iframe.children('.widget-section');
var sections = [];
var text_component = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'UL'];

var sectionStyleKeys = ['background-color',
  'background-image',
  'background-size',
  'background-repeat',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-origin',
  'background-attachment'];
var elementStyleKeys = [
  'fill',
  'font-family',
  'background-color',
  'background-image',
  'background-size',
  'background-repeat',
  'background-position',
  'background-position-x',
  'background-position-y',
  'background-origin',
  'background-attachment',
  'object-fit',
  'line-height',
  'padding',
  'font-weight',
  'font-size',
  'font-style',
  'text-decoration',
  'text-transform',
  'letter-spacing',
  'padding-left',
  'padding-right',
  'color',
  'text-align',
  'border-width',
  'border-style',
  'border-color',
  'border-radius',
  'box-shadow',
  'text-shadow'];

function getSectionStyles(element, section) {
  var styles = element.style;
  var ret = {};
  $.each(sectionStyleKeys, function (index, v) {
    var style = styles[v];
    if (!style) {
      return;
    }
    if (style.indexOf('rgb') >= 0) {
      style = style.replace(/, /g, ',');
    }
    if (v === 'background-image') {
      if (style) {
        var overlay = style.match(/rgb[a]{0,1}\(.+\),r/);
        if (overlay) {
          section['overlay'] = overlay[0].replace(',r', '');
        }
        style = style.replace(/-webkit-linear-gradient\(.+url/g, 'url');
      }
    }
    ret[v] = style;
  });
  return ret;
}
function getElementStyles(element, section) {
  var styles = element.style;
  var ret = {};
  $.each(elementStyleKeys, function (index, v) {
    var style = styles[v];
    if (!style) {
      return;
    }
    if (style.indexOf('rgb') >= 0) {
      style = style.replace(/, /g, ',');
    }
    if (v === 'background-image') {
      if (style) {
        var overlay = style.match(/rgb[a]{0,1}\(.+\),r/);
        if (overlay) {
          section['overlay'] = overlay[0].replace(',r', '');
        }
        style = style.replace(/-webkit-linear-gradient\(.+url/g, 'url');
      }
    }
    ret[v] = style;
  });
  return ret;
}
function getElements($elements) {
  var childrens = [];
  $elements.each(function (i, v) {
    var $element = $(v);
    var $content = $element.children('.widget-content');
    var lang = $element.attr('lp-lang');
    var type;
    var $line;
    if (lang === 'HEADLINE') {
      type = $content.attr('lp-node').toUpperCase();
    } else if (lang === 'LINE' || lang === 'LINEHORIZONTAL' || lang === 'LINEVERTICAL') {
      $line = $content.children('.line');
      if (parseInt($line.css('border-top-width').replace('px', ''), 10) > 0 || lang === 'LINEHORIZONTAL') {
        type = 'HLINE';
      } else if (parseInt($line.css('border-left-width').replace('px', ''), 10) > 0 || lang === 'LINEVERTICAL') {
        type = 'VLINE';
      }
    }  else if (lang === 'LISTOP') {
      type = 'UL';
    } else if (lang === 'PARAGRAPH') {
      type = 'P';
    } else {
      type = lang;
    }
    var element: WidgetComponent = {
      'id': null,
      'type': null,
      'content': null,
      'rect': {
        'dimension': {
        },
        'offset': {
          'top': null,
          'left': null
        }
      },
      'contentStyle': {}
    };
    element.id = $element.attr('id');
    element.rect.dimension = {};
    element.rect.offset['top'] = $(v).css('top') ? Math.round(parseInt($(v).css('top').replace('px', ''), 10)) : 0;
    element.rect.offset['left'] = $(v).css('left') ? Math.round(parseInt($(v).css('left').replace('px', ''), 10)) : 0;
    element.rect.dimension['width'] = $(v).css('width') ? Math.round(parseInt($(v).css('width').replace('px', ''), 10)) : 0;
    if (text_component.indexOf(type) < 0) {
      element.rect.dimension['height'] = $(v).css('height') ? Math.round(parseInt($(v).css('height').replace('px', ''), 10)) : 0;
    }
    if (text_component.indexOf(type) >= 0 || type === 'BUTTON') {
      element.content = $content.html();
    }
    element.type = type;
    element.contentStyle = getElementStyles($content.get(0), element);
    if (!element['overlay']) {
      element['overlay'] = 'rgba(0,0,0,0)';
    }
    if (type === 'IMAGE') {
      element.contentStyle['background-image'] = $content.children('.lp-show-image').css('background-image');
    } else if (type === 'HLINE' || type === 'VLINE') {
    element.contentStyle['border-style'] = $line.css('border-style');
    element.contentStyle['border-color'] = $line.css('border-color').replace(/, /g, ',');
    if (type === 'HLINE') {
      element.contentStyle['border-top-width'] = $line.css('border-top-width');
    } else {
      element.contentStyle['border-left-width'] = $line.css('border-left-width');
    }
  } else if (type === 'SHAPE') {
    var $svg = $content.children('svg');
    element['svg'] = {
      'view-box': null,
      path: null
    };
    element['svg']['view-box'] = $svg.attr('viewBox');
    element['svg']['path'] = $svg.children('path').attr('d');
    element.contentStyle['fill'] = $svg.attr('fill').replace(/, /g, ',');
  } else if (type === 'UL') {
    element['ulData'] = {
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
    };
    if ($content.children('li').length) {
      const li = $content.children('li')[0];
      const iconImage = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('background-image');
      const iconContent = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('content');
      const iconSize = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('width');
      const iconFSize = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('font-size');
      const iconMRight = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('margin-right');
      const iconMTop = window.getComputedStyle(
        $content.children('li')[0], ':before'
      ).getPropertyValue('margin-top');

      if (iconImage !== 'none') {
        element.ulData.type = 'image';
      } else if (iconContent.indexOf('counter') >= 0) {
        element.ulData.type = 'list';
        element.ulData.iconStyles['--content'] = iconContent.replace(', ', ',');
      } else if (iconContent) {
        element.ulData.type = 'icon';
        element.ulData.iconStyles['--content'] = iconContent.replace(', ', ',');
      }
      element.ulData.liStyles['--margin-bottom'] = $content.children('li').css('margin-bottom');
      element.ulData.iconStyles['--margin-top'] = iconMTop;
      element.ulData.iconStyles['--margin-right'] = iconMRight;
      element.ulData.iconStyles['--height'] = iconSize;
      element.ulData.iconStyles['--width'] = iconSize;
      element.ulData.iconStyles['--font-size'] = iconFSize;
    }
  } else if (type === 'YOUTUBE') {
    element['youtube'] = {
      'src': $content.attr('src').split('?')[0],
      'autoplay': false
    };
  }
  element.contentStyle['text-align'] = $element.get(0).style.textAlign;
  var $elements = $content.children('.widget-element');
  if ($elements.length) {
    element['childrens'] = getElements($elements);
  }
  childrens.push(element);
});
return childrens;
}
$sections.each(function (i, v) {
  var section = {
    'id': '',
    'rect': {
      'dimension': {
        'height': null,
        'width': null
      }
    },
    'type': 'section',
    'contentStyle': null
  };
  section.id = $(v).attr('id');
  if ($(v).attr('lp-popup')) {
    section.type = 'popup';
    var $container = $(v).children('.container');
    section.rect.dimension.height = $container.height();
    section.rect.dimension.width = $container.width();
    section.contentStyle = getSectionStyles($container.get(0), section);
    section['popup'] = {
      isShow: true
    };
  } else {
    section.rect.dimension.height = $(v).css('height') ? Math.round(parseInt($(v).css('height').replace('px', ''), 10)) : 0;
    section.contentStyle = getSectionStyles(v, section);
  }
  if (!section['overlay']) {
    section['overlay'] = 'rgba(0,0,0,0)';
    section['popup'] = { isShow: false };
  }
  var $container = $(v).children('.container');
  var $elements = $container.children('.widget-element');
  section['childrens'] = getElements($elements);
  console.log(JSON.stringify(section));
  // sections.push(section);
})
// console.log(sections);
// console.log(JSON.stringify(sections).replace(/\\"/g, "\\'").replace(/"/g, "'"));
// console.log(JSON.stringify(sections));
