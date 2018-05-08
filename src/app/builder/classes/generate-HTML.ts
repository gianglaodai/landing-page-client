import * as componentType from '../../shared/common/component-type';
import { Inject } from '@angular/core';
import { SectionActionService } from '../../shared/services/section-action.service';
import { WidgetSection } from '../../shared/interfaces/widget-section';
import { WidgetComponent } from '../../shared/interfaces/widget-component';
import { Page } from '../../shared/interfaces/page';
import { PageConfig } from '../../shared/interfaces/page-config';
import { PageTracking } from '../../shared/interfaces/page-tracking';
import { Rect } from '../../shared/interfaces/rect';
import { BOX, FORM_SELECT } from '../../shared/common/component-type';
export class GenerateHTML {
  private page: Page;
  private sectionCss;
  private sections: WidgetSection[];
  private pageConfigs: PageConfig;
  private pageTracking: PageTracking;
  private desktopElementCss = '';
  private generalElementCss = '';
  private mobileElementCss = '';
  private elementUI;
  private gmaps = [];
  private usingFacebook = false;
  private content = '';
  private usedFonts: { name?: string; fontWeights?: string[] }[] = [{
    name: 'Roboto',
    fontWeights: []
  }];
  constructor(page: Page) {
    this.page = page;
    this.pageConfigs = page.pageConfigs;
    this.pageTracking = page.pageTracking;
    this.sections = page.sections;
  }
  get head() {
    let head = `<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="Cache-control" content="no-cache"/>
    <meta http-equiv="Expires" content="-1"/>
    <meta name="description" content="${this.pageConfigs.metaDescription}"/>
    <meta name="keywords" content="${this.pageConfigs.metaKeyword}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="${this.pageConfigs.title}"/>
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:image" content="${this.pageConfigs.metaImage}">
    <meta property="og:description" content="${this.pageConfigs.metaDescription}">
    <meta name="format-detection" content="telephone=no">
    <title>${this.pageConfigs.title}</title>
    <link rel="shortcut icon" type="image/png" href="${this.pageConfigs.favicon}"/>
    <link rel="shortcut icon" type="image/png" href="${this.pageConfigs.favicon}"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />`;
    if (this.usedFonts.length) {
      head += `<link rel="stylesheet" href="${this.fontUrl}" />`;
    }
    if (this.pageTracking.googleTagId) {
      head += `
      <script>(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })
      (window, document, 'script', 'dataLayer', '${this.pageTracking.googleTagId}');</script>`;
    }
    if (this.pageTracking.googleAnalyticId) {
      head += `<script>(function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] ||
      function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date();
      a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g;
      m.parentNode.insertBefore(a, m) })(window, document, 'script',
      'https://www.google-analytics.com/analytics.js', 'ga');
      ga('create', '${this.pageTracking.googleAnalyticId}', 'auto'); ga('send', 'pageview');`;
    }

    if (this.pageTracking.pixelId) {
      head += `<!-- Facebook Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${this.pageTracking.pixelId}');
      fbq('track', "PageView");
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${this.pageTracking.pixelId}&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Facebook Pixel Code -->  `;
    }
    if (this.pageTracking.headEvent) {
      head += this.pageTracking.headEvent;
    }
    head += `${this.resetCss}${this.pageCss}
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script>
     function pad(num, size) {
        let s = num.toString();
        while (s.length < size) {
          s = '0' + s;
        }
        return s;
      }
      </script>
      <script>
        if($(window).width()<=320){
          $('meta[name="viewport"]').remove();
          $('head').append('<meta name="viewport" content="width=320, initial-scale=0.7146666666666667">');
        };
      </script>`;
    head += '</head>';
    return head;
  }
  // Lấy base CSS của page, gồm các css reset
  get fontUrl() {
    let fontUrl;
    try {
      fontUrl = 'https://fonts.googleapis.com/css?family=';
      this.usedFonts.forEach((font, index) => {
        fontUrl += index ? '|' + font.name : font.name;
        if (font.fontWeights && font.fontWeights.length) {
          fontUrl += `:${font.fontWeights.join(',')}`;
        }
      });
      fontUrl += '&amp;subset=vietnamese';
    } catch (error) {
    }
    return fontUrl;
  }
  get pageCss() {
    let cssPage = '';
    cssPage += this.generalElementCss;
    cssPage += this.desktopElementCss;
    cssPage += this.mobileElementCss;
    return cssPage;
  }
  get resetCss() {
    const resetCss = `<style>
    body{font-family: Roboto,sans-serif;}
    body.overflow{overflow:hidden}
    *{
      -webkit-box-sizing:border-box;margin:0;padding:0;border:0;outline:0;vertical-align:baseline;
      background:0 0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;
      background-size:cover
    }
    #container{width:100%;overflow-x:hidden}
    .widget-element{display:flex;position:absolute;z-index:99}
    .overlay{position:absolute;top:0;left:0;width:100%;height:100%}
    .widget-element[app-type=image] .widget-content{background-size:cover;background-position:center}
    .widget-element[app-type=ul] ul{
      list-style: none;
      padding-left: 0;
      margin-bottom: 0;
    }
    .widget-element[app-type=youtube]{
      display:block
    }
    .widget-element[app-type=youtube] .widget-content{
      display:block !important;
      -webkit-box-orient:unset;
      -webkit-box-direction:unset;
      flex-direction:unset;
      justify-content:unset;
    }
    .widget-element[app-type=ul] ul li{
      margin-bottom: var(--margin-bottom);
      counter-increment: linum;
    }
    .widget-element[app-type=ul] ul li:before {
      float: left;
      clear: left;
      contain: content;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      padding: 0 !important;
      background-image: var(--background-image);
      width: var(--width);
      height: var(--height);
      font-size: var(--font-size);
      margin-top: var(--margin-top);
      margin-right: var(--margin-right);
      color: var(--color);
      content: var(--content);
    }
    .widget-content{
      display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;height:100%;
      justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;
      -ms-flex-direction:column;flex-direction:column;position:relative;
      word-break: break-word;
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    .widget-content.form-input{
      display:block;
      flex-direction: unset;
      background-color: var(--controlBackground);
      color: var(--color);
      font-size: var(--fontSize);
    }
    .widget-content.form-input.is-invalid{border-color: #dc3545 !important;
      box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);}
    .widget-content.form-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: var(--placeholderColor);
    }
    .widget-content.form-input::-moz-placeholder { /* Firefox 19+ */
      color: var(--placeholderColor);
    }
    .widget-content.form-input:-ms-input-placeholder { /* IE 10+ */
      color: var(--placeholderColor);
    }
    .widget-content.form-input:-moz-placeholder { /* Firefox 18- */
      color: var(--placeholderColor);
    }
    .widget-element[app-type=html] .widget-content,.widget-element[app-type=comments] .widget-content{
      display:block;overflow: auto;-webkit-overflow-scrolling: touch;
    }
    .widget-element[app-type=hline]{align-items:center}
    .widget-element[app-type=hline] .widget-content{height: 0;}
    .widget-element[app-type=button] button.widget-content{flex-direction:row;cursor:pointer}
    .widget-element[app-type=vline]{justify-content:center}
    .widget-element[app-type=vline] .widget-content{height: 100%;width: 0;}
    .widget-element[app-type=countdown] .countdown span{
      width: 25%;
      white-space: nowrap;
    }
    .widget-element[app-type=countdown] .countdown span.two-dots{
      width: auto;
      padding: 0 5px;
    }
    .widget-element[app-type=carousel] .carousel-inner,.widget-element[app-type=carousel] .carousel-item{height:100%;}
    .widget-section{display:block;position:relative}
    .widget-container{height: 100%;width: 960px;margin: 0 auto;max-width: 100%;position:relative}
    .widget-section[app-type=popup]{
      position:fixed;z-index:998;width:100%;height:100vh;top:0;left:0;align-items:center;justify-items:center;
      display:none;
    }
    .widget-section[app-type=popup] .widget-container{overflow:auto}
    .widget-section[app-type=popup] .popup-overlay{
      z-index:0;
      width:100%;
      height:100%;
      position: absolute;
      top:0;left:0;
      background-color: rgba(0,0,0,.5);
    }
    .widget-section[app-type=popup] .close-popup{
      position: absolute;
      bottom: 100%;
      right: 0;
      background-color: rgba(255,255,255,.8);
      color: #666;
      font-size: 10px;
      padding: 1px 6px;
    }
    .widget-popup{
      margin: 0 auto;
      position: relative;
      z-index: 1;
      max-height: calc(100% - 34px);
    }
    @media(max-width:767px){
      .widget-container {
        width: 300px;
      }
      .widget-element{
        max-width:100%;
      }
    }
    </style>`;
    return resetCss;
  }
  // Lấy css của các element
  renderCss() {
    this.generalElementCss = '<style>';
    this.desktopElementCss = '<style class="desktop-css">@media(min-width:768px){';
    this.mobileElementCss = '<style class="mobile-css">@media(max-width:767px){';
    this.sections.forEach(section => {
      this.renderElementCss(section);
    });
    this.generalElementCss += '</style>';
    this.desktopElementCss += '}</style>'; // Đóng media Rule
    this.mobileElementCss += '}</style>'; // Đóng media Rule
  }
  // Lấy vị trí absolute của section
  renderElementCss(element: WidgetSection | WidgetComponent) {
    const desktopRect = {};
    try {
      desktopRect['width'] = element['rect']['dimension']['width'];
    } catch (error) {
    }
    try {
      desktopRect['height'] = element['rect']['dimension']['height'];
    } catch (error) {
    }
    try {
      desktopRect['top'] = element['rect']['offset']['top'];
    } catch (error) {
    }
    try {
      desktopRect['left'] = element['rect']['offset']['left'];
    } catch (error) {
    }
    const styles = element['contentStyle'];
    if (desktopRect) {
      if (element.type === 'popup') {
        this.desktopElementCss += `#${element.id}>.widget-popup{`;
      } else {
        this.desktopElementCss += `#${element.id}{`;
      }
      Object.keys(desktopRect).forEach(styleKey => {
        const styleValue = desktopRect[styleKey];
        if (typeof styleValue !== 'undefined') {
          this.desktopElementCss += `${styleKey}:${styleValue}px;`;
        }
      });
      this.desktopElementCss += '}';
    }

    if (styles) {
      if (element.type === 'popup') {
        this.generalElementCss += `#${element.id}>.widget-popup{`;
      } else if (element.type === 'section') {
        this.generalElementCss += `#${element.id}{`;
      } else {
        this.generalElementCss += `#${element.id}>.widget-content{`;
      }
      Object.keys(styles).forEach(styleKey => {
        const styleValue = styles[styleKey];
        this.generalElementCss += `${styleKey}:${styleValue};`;
      });
      this.generalElementCss += '}';
      if (styles['font-family']) {
        const fontName = styles['font-family'].split(/, */g)[0].replace(/ +/g, '+').replace(/['"]/g, '').toString();
        const checkedArr = this.usedFonts.filter(font => {
          return font.name === fontName;
        });
        if (!checkedArr.length) {
          const font = {};
          font['name'] = fontName;
          font['fontWeights'] = ['400'];
          this.usedFonts.push(font);
        }
        if (styles['font-weight']) {
          const fontWeight = styles['font-weight'];
          this.usedFonts.forEach(font => {
            if (font.name === fontName) {
              if (font.fontWeights.indexOf(fontWeight) < 0) {
                font.fontWeights.push(fontWeight);
              }
              if (styles['font-style'] === 'italic' && fontWeight && font.fontWeights.indexOf(`${fontWeight}i`) < 0) {
                font.fontWeights.push(`${fontWeight}i`);
              } else if (!fontWeight) {
                font.fontWeights.push('400i');
              }
            }
          });
        }
      }
    }
    if (element.mobileHide) {
      this.mobileElementCss += `#${element.id}{display:none}`;
    } else {
      const mobileRect = {};
      try {
        mobileRect['width'] = element['mobileRect']['dimension']['width'];
      } catch (error) {
      }
      try {
        mobileRect['height'] = element['mobileRect']['dimension']['height'];
      } catch (error) {
      }
      try {
        mobileRect['top'] = element['mobileRect']['offset']['top'];
      } catch (error) {
      }
      try {
        mobileRect['left'] = element['mobileRect']['offset']['left'];
      } catch (error) {
      }
      const mobileStyles = element['mobileStyle'];
      if (mobileRect) {
        if (element.type === 'popup') {
          this.mobileElementCss += `#${element.id}>.widget-popup{`;
        } else {
          this.mobileElementCss += `#${element.id}{`;
        }
        Object.keys(mobileRect).forEach(styleKey => {
          const styleValue = mobileRect[styleKey];
          if (styleValue) {
            this.mobileElementCss += `${styleKey}:${styleValue}px;`;
          }
        });
        this.mobileElementCss += '}';
      }
      if (mobileStyles && Object.keys(mobileStyles).length) {
        this.mobileElementCss += `#${element.id}>.widget-content{`;
        Object.keys(mobileStyles).forEach(styleKey => {
          const styleValue = mobileStyles[styleKey];
          if (styleValue) {
            this.mobileElementCss += `${styleKey}:${styleValue};`;
          }
        });
        this.mobileElementCss += '}';
      }
    }
    if (element.childrens) {
      element.childrens.forEach(child => {
        this.renderElementCss(child);
      });
    }
  }
  get body() {
    let body = '<body>';
    if (this.pageTracking.googleTagId) {
      body += `<!-- Google Tag Manager (noscript) -->
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${this.pageTracking.googleTagId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
      <!-- End Google Tag Manager (noscript) -->`;
    }
    if (this.pageTracking.bodyEvent) {
      body += this.pageTracking.bodyEvent;
    }
    if (this.usingFacebook) {
      body += `<div id="fb-root"></div>
      <script>(function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.12';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>`;
    }
    body += this.content;
    if (this.gmaps.length) {
      body += `<script>
      function initMap(id,latitude,longitude,zoom,markerLabel){
        var myLatlng = new google.maps.LatLng(latitude,longitude);
        var mapOptions = {
          zoom: zoom,
          center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById(id).querySelector('.gmap'), mapOptions);
        var infowindow = new google.maps.InfoWindow({
          content: markerLabel,
          maxWidth: 200
        });
        var marker = new google.maps.Marker({
            position: myLatlng,
            map:map,
            title: markerLabel
        });
        infowindow.open(map, marker);
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
      function init() {`;
      this.gmaps.forEach(comp => {
        body += `
        initMap('${comp.id}',${comp['gmap']['latitude']},${comp['gmap']['longitude']},
        ${comp['gmap']['zoom']},'${comp['gmap']['markerLabel']}');
        `;
      });
      body += `}</script>
      <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=${this.pageTracking.googleApiKey}&callback=init">
    </script>`;
      // $.ajax({
      //   url:'http://61.14.235.28:8888/page/load',
      //   type:'GET',
      //   timeout:'10000',
      //   data:{
      //     user:'giang',
      //     pageName:'Landing_Test'
      //   },
      //   dataType:'json',
      //   success:function(data){
      //     swal("Thành công!", "Bạn đã gửi yêu cầu thành công", "success");
      //   },error:function(jqXHR, textStatus, errorThrown){
      //     swal("Thất bại!", errorThrown.toString(), "error");
      //   }
      // });
    }
    body += `
    <script>
      $('form.widget-content').submit(function(event){
        event.preventDefault();
        var valid=true;
        $(this).find('.form-input').each(function(i,input){
          $(input).removeClass('is-invalid');
          if($(input).attr('required')&&(typeof $(input).val() === 'undefined' ||!$(input).val().trim().length)){
            $(input).addClass('is-invalid');
            valid=false;
          }
        });
        if(!valid){
          swal("Thất bại!", "Vui lòng nhập các trường được báo đỏ", "error");
          return;
        }
        var actionType=$(this).data('action');
        if(actionType==='email'){
          var formData = $(this).serializeArray();
          var emailAddress=$(this).data('email');
          var emailSubject=$(this).data('subject');
          var body='';
          $.each(formData,function(i,input){
            if(input.name&&input.value){
              body+=input.name.toUpperCase()+': '+input.value+'%0D%0A';
            }
          });
          window.location.href='mailto:'+emailAddress+'?subject='+emailSubject+'&body='+body;
        } else if(actionType==='api'){
          var apiUrl=$(this).data('api');
          var data={};
          $(this).find('.form-input').each(function(i,input){
            var apiName=$(input).attr('apiName')?$(input).attr('apiName'):$(input).attr('name');
            data[apiName]=$(input).val();
          });
          debugger;
          $.ajax({
            url:apiUrl,
            type:'GET',
            timeout:'10000',
            data:data,
            dataType:'json',
            success:function(data){
              swal("Thành công!", "Bạn đã gửi yêu cầu thành công", "success");
            },error:function(jqXHR, textStatus, errorThrown){
              swal("Thất bại!", errorThrown.toString(), "error");
            }
          });
        }
      });
      </script>`;
    body += '</body>';
    return body;
  }
  renderContent() {
    this.content += '<div id="container">';
    this.sections.forEach(section => {
      this.content += this.renderSection(section);
    });
    this.content += '</div>'; // Đóng #container
  }

  renderSection(section: WidgetSection) {
    let sectionStr = `<div class="widget-section" id="${section.id}" app-type="${section.type}">`;
    if (section.type === 'section') {
      sectionStr += `<div class="overlay" style="background-color:${section.overlay ? section.overlay : ''}"></div>
      <div class="widget-container">`;
      section.childrens.forEach(comp => {
        sectionStr += this.renderElement(comp);
      });
      sectionStr += '</div>'; // Đóng .widget-container
    } else if (section.type === 'popup') {
      sectionStr += `<div class="popup-overlay" onclick="$('#${section.id}').hide(0);$('body').removeClass('overflow');"></div>
      <div class="widget-popup">
      <a href="javascript:void(0)" class="close-popup" onclick="$('#${section.id}').hide(0);$('body').removeClass('overflow');">X</a>
      <div class="overlay" style="background-color:${section.overlay ? section.overlay : ''}"></div>
      <div class="widget-container">`;
      section.childrens.forEach(comp => {
        sectionStr += this.renderElement(comp);
      });
      sectionStr += '</div></div>'; // Đóng .widget-container
    }
    sectionStr += '</div>'; // Đóng widget-section
    return sectionStr;
  }

  renderElement(comp: WidgetComponent): any {
    let compStr = `<div class="widget-element" id="${comp.id}" app-type="${comp.type.toLocaleLowerCase()}">`;
    comp.content = comp.content || '';
    switch (comp.type) {
      case componentType.IMAGE: {
        compStr += `<div class="widget-content">
          <div class="overlay" style="background-color:${comp.overlay ? comp.overlay : ''}"></div>
        </div>`;
        if (comp.childrens) {
          comp.childrens.forEach(child => {
            compStr += this.renderElement(child);
          });
        }
        break;
      }
      case componentType.H1 || componentType.H2 || componentType.H3
        || componentType.H4 || componentType.H5 || componentType.H6: {
          compStr += `<${comp.type.toLowerCase()} class="widget-content">
          ${comp.content}</${comp.type.toLowerCase()}>`;
          break;
        }
      case componentType.BUTTON: {
        compStr += `<button class="widget-content">${comp.content}</button>`;
        break;
      }
      case componentType.UL: {
        let styleStr = '';
        const liStyles = comp.ulData.liStyles;
        const iconStyles = comp.ulData.iconStyles;
        Object.keys(liStyles).forEach(k => {
          styleStr += `${k}:${liStyles[k]};`;
        });
        Object.keys(iconStyles).forEach(k => {
          styleStr += `${k}:${iconStyles[k]};`;
        });
        compStr += `<div class="widget-content"><ul style="${styleStr}">${comp.content}</ul></div>`;
        break;
      }
      case componentType.SHAPE: {
        compStr += `<svg class="widget-content" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="100%" height="100%" viewBox="${comp.svg['view-box']}">
          <path d="${comp.svg['path']}"></path>
        </svg>`;
        break;
      }
      case componentType.YOUTUBE: {
        compStr += `<div class="widget-content"><iframe width="100%" height="100%"
        src="${comp.youtube['src']}?autoplay=${comp.youtube['autoplay']}" frameborder="0" allow="autoplay; encrypted-media"
        allowfullscreen></iframe></div>`;
        break;
      }
      case componentType.GMAP: {
        compStr += this.generateGMAP(comp);
        break;
      }
      case componentType.COUNTDOWN: {
        compStr += this.generateCountdown(comp);
        break;
      }
      case componentType.COMMENTS: {
        this.usingFacebook = true;
        compStr += `<div class="fb-comments widget-content"
        data-href="${comp['comments']['href']}"
        data-numposts="${comp['comments']['posts']}" data-width="100%"></div>`;
        break;
      }
      case componentType.CAROUSEL: {
        compStr += this.generateCarousel(comp);
        break;
      }
      case componentType.FORM_INPUT: {
        compStr += '<input class="widget-content form-input"';
        if (comp.formControl.type) {
          compStr += `type="${comp.formControl.type}"`;
        }
        if (comp.formControl.name) {
          compStr += `name="${comp.formControl.name}"`;
        }
        if (comp.formControl.apiName) {
          compStr += `apiName="${comp.formControl.apiName}"`;
        } else {
          compStr += `apiName="${comp.formControl.name}"`;
        }
        if (comp.formControl.placeholder) {
          compStr += `placeholder="${comp.formControl.placeholder}"`;
        }
        if (comp.formControl.required) {
          compStr += `required="true"`;
        } else {
          compStr += `required="false"`;
        }
        compStr += '/>';
        break;
      }
      case componentType.FORM_TEXTAREA: {
        compStr += '<textarea class="widget-content form-input"';
        if (comp.formControl.name) {
          compStr += `name="${comp.formControl.name}"`;
        }
        if (comp.formControl.apiName) {
          compStr += `apiName="${comp.formControl.apiName}"`;
        } else {
          compStr += `apiName="${comp.formControl.name}"`;
        }
        if (comp.formControl.placeholder) {
          compStr += `placeholder="${comp.formControl.placeholder}"`;
        }
        if (comp.formControl.required) {
          compStr += `required="true"`;
        } else {
          compStr += `required="false"`;
        }
        compStr += '></textarea>';
        break;
      }
      case componentType.FORM_SELECT: {
        compStr += '<select class="widget-content form-input"';
        if (comp.formControl.name) {
          compStr += `name="${comp.formControl.name}"`;
        }
        if (comp.formControl.apiName) {
          compStr += `apiName="${comp.formControl.apiName}"`;
        } else {
          compStr += `apiName="${comp.formControl.name}"`;
        }
        if (comp.formControl.required) {
          compStr += `required="true"`;
        } else {
          compStr += `required="false"`;
        }
        compStr += '>';
        if (comp.formControl.options) {
          comp.formControl.options.forEach(option => {
            compStr += `<option value="${option.value}">${option.text}</option>`;
          });
        }
        compStr += '</select>';
        break;
      }
      case componentType.FORM: {
        compStr += this.generateForm(comp);
        break;
      }
      default: {
        compStr += `<div class="widget-content">${comp.content}</div>`;
        if (comp.childrens) {
          comp.childrens.forEach(child => {
            compStr += this.renderElement(child);
          });
        }
        break;
      }
    }
    let extScript = '';
    if (comp.link && comp.link.type) {
      extScript += `<script>$('#${comp.id}').click(function(){`;
      switch (comp.link.type) {
        case componentType.LINK_HREF: {
          if (comp.link.target === '_blank') {
            extScript += `window.open('${comp.link.value}', '_blank').focus();`;
          } else {
            extScript += `window.location.href = '${comp.link.value}'`;
          }
          break;
        }
        case componentType.LINK_SECTION: {
          extScript += `$('html,body').animate({
            scrollTop: $('${comp.link.value}').offset().top
          }, 700);`;
          break;
        }
        case componentType.LINK_POPUP: {
          extScript += `$('${comp.link.value}').css("display", "flex")
          .hide().fadeIn(300,function(){
            $('body').addClass('overflow');
          })`;
          break;
        }
        case componentType.LINK_PHONE: {
          extScript += `window.location.href = 'tel:${comp.link.value}'`;
          break;
        }
        case componentType.LINK_EMAIL: {
          extScript += `window.location.href = 'mailto:${comp.link.value}'`;
          break;
        }
      }
      extScript += '});</script>';
    }
    if (comp.tracking) {
      extScript += `<script>$('#${comp.id}').click(function(){
          ${comp.tracking}
        });</script>`;
    }
    if (comp.animate && comp.animate.name) {
      extScript += '<script>';
      extScript += `$('#${comp.id}').css({ '-webkit-animation-duration': ${comp.animate.duration},
      'animation-duration':${comp.animate.duration},'-webkit-animation-delay':${comp.animate.delay},
      'animation-delay':${comp.animate.delay}});
      $('#${comp.id}').removeClass('${comp.animate.name} animated').addClass('${comp.animate.name} animated')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('${comp.animate.name} animated');
      });`;
      extScript += '</script>';
    }
    if (comp.extClass) {
      extScript += `<script>$('#${comp.id}').addClass('${comp.extClass}')</script>`;
    }
    if (comp.extStyle) {
      extScript += `<script>$('#${comp.id}>.widget-content').attr('style','${comp.extStyle};')</script>`;
    }
    if (comp.sticky && comp.sticky.using) {
      extScript += `
        <script>
        $(document).ready(function(){
          var position${comp.id}=$('#${comp.id}').position();
          var positionTop${comp.id}=position${comp.id}.top;
          var positionLeft${comp.id}=position${comp.id}.left;
          var offsetTop${comp.id}=$('#${comp.id}').offset().top;
          var offsetLeft${comp.id}=$('#${comp.id}').offset().left;
          $(window).scroll(function(){
            if($(window).scrollTop()>=offsetTop${comp.id}){
              $('#${comp.id}').css({'position':'fixed'});
              `;
      extScript += `$('#${comp.id}').css({'left':offsetLeft${comp.id}+'px','z-index':102});`;
      if (comp.sticky.position === 'top') {
        extScript += `$('#${comp.id}').css({'top':'${comp.sticky.padding}'});`;
      } else if (comp.sticky.position === 'bottom') {
        extScript += `$('#${comp.id}').css({'bottom':'${comp.sticky.padding}','top':'auto'});`;
      }
      extScript += `
            }else{
              $('#${comp.id}').css({'position':'','z-index':'','top':positionTop${comp.id}+'px',
              'bottom':'','left':positionLeft${comp.id}+'px'});
            }
          });
        });
        </script>`;
    }
    compStr += extScript + '</div>';
    return compStr;
  }
  generateForm(comp: WidgetComponent) {
    let compStr = '';
    let styleStr = '';
    const formStyles = comp.formStyles;
    if (formStyles) {
      Object.keys(formStyles).forEach(k => {
        styleStr += `--${k}:${formStyles[k]};`;
      });
    }
    compStr += `<form class="widget-content" novalidate`;
    if (comp.formAction) {
      switch (comp.formAction.type) {
        case 'email': {
          compStr += ` data-action="email" data-email="${comp.formAction.email.emailAddress}"
          data-subject="${comp.formAction.email.subject}"`;
          break;
        }
        case 'api': {
          compStr += ` data-action="api" data-api="${comp.formAction.apiUrl}"`;
          break;
        }
      }
    }
    compStr += ` style='${styleStr}'>`;
    if (comp.childrens) {
      comp.childrens.forEach(child => {
        compStr += this.renderElement(child);
      });
    }
    compStr += '</form>';
    return compStr;
  }
  generateCarousel(comp: WidgetComponent) {
    let compStr = '';
    try {
      compStr = `<div id="carousel-${comp.id}" class="widget-content carousel slide"
      data-ride="${comp['carousel']['auto'] ? 'carousel' : 'false'}" data-interval="${comp['carousel']['interval']}">
      <div class="carousel-inner">`;
      comp.carousel.slides.forEach((slide, index) => {
        const slideStyles = slide.contentStyle || {};
        let styleStr = '';
        Object.keys(slideStyles).forEach(styleKey => {
          const styleValue = slideStyles[styleKey];
          styleStr += `${styleKey}:${styleValue};`;
        });
        compStr += `<div class="carousel-item${index ? '' : ' active'}" style="${styleStr}">
        <div class="overlay" style="background-color:${slide.overlay}"></div>
        </div>`;
      });
      compStr += `</div>
        <a class="carousel-control-prev" href="#carousel-${comp.id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel-${comp.id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>`;
    } catch (error) {

    }
    return compStr;
  }
  generateGMAP(comp: WidgetComponent) {
    this.gmaps.push(comp);
    const compStr = `<div class="gmap widget-content"></div>`;
    return compStr;
  }
  generateCountdown(comp) {
    const compStr =
      `<div class="widget-content">
      <div class="countdown d-flex text-center align-items-center">
        <span>00</span>
        <span class="two-dots">:</span>
        <span>00</span>
        <span class="two-dots">:</span>
        <span>00</span>
        <span class="two-dots">:</span>
        <span>00</span>
      </div>
      </div>
      <script>
        var intv${comp.id}=setInterval(function() {
          var countDownDate = ${comp.countdown['endTime']};
          var elmCountdown=document.getElementById('${comp.id}').querySelector('.countdown');
          var now = new Date().getTime();
          var distance = countDownDate - now;
          var days, hours, minutes, seconds;
          if (distance > 0) {
            days = Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              seconds = Math.floor((distance % (1000 * 60)) / 1000);
              elmCountdown.innerHTML =
              '<span>' + this.pad(days, 2) + '</span><span class="two-dots">:</span><span>'
              + this.pad(hours, 2) + '</span><span class="two-dots">:</span><span>'
              + this.pad(minutes, 2) + '</span><span class="two-dots">:</span><span>'
              + this.pad(seconds, 2) + '</span>';
          } else {
            elmCountdown.innerHTML =
              '<span>00</span><span class="two-dots">:</span><span>00</span><span class="two-dots">:</span><span>'
              + '00</span><span class="two-dots">:</span><span>'
              + '00</span>';
            clearInterval(intv${comp.id});
          }
        }, 1000);
      </script>`;
    return compStr;
  }

  get html() {
    this.renderCss();
    this.renderContent();
    const head = this.head;
    const body = this.body;
    let html = '<!DOCTYPE html>';
    html += '<html>';
    html += head;
    html += body;
    html += '</html>';
    // console.log(html);
    return html;
  }
}
