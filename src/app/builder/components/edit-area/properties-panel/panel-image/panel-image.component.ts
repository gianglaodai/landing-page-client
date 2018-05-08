import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-image',
  templateUrl: './panel-image.component.html',
  styleUrls: ['./panel-image.component.scss']
})
export class PanelImageComponent implements OnInit {
  @Input('component') component;
  constructor() { }

  ngOnInit() {
  }

  get backgroundImage() {
    return this.component.contentStyle['background-image'] ?
      this.component.contentStyle['background-image'].slice(4, -1).replace(/"/g, '') : null;
  }

  set backgroundImage(url) {
    const img = new Image();
    const dimension = {
      width: 0,
      height: 0
    };
    const comp = this.component;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      dimension.height = img.naturalWidth > 960 ? img.naturalHeight * 960 / img.naturalWidth : img.naturalHeight,
        dimension.width = img.naturalWidth > 960 ? 960 : img.naturalWidth;

      dimension.width = dimension.height > 500 ? dimension.width * 500 / dimension.height : dimension.width,
        dimension.height = dimension.height > 500 ? 500 : dimension.height;
      const rect = JSON.parse(JSON.stringify(comp.rect));
      rect.offset.top = rect.offset.top - (dimension.height - rect.dimension.height) / 2;
      rect.offset.left = rect.offset.left - (dimension.width - rect.dimension.width) / 2;
      rect['dimension'] = JSON.parse(JSON.stringify(dimension));
      comp.rect = JSON.parse(JSON.stringify(rect));
      comp.contentStyle['background-image'] = 'url(' + url + ')';
      if (!img.complete || typeof img.complete === 'undefined') {
        img.src = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABkBAMAAACWddTDAAAALVBMVEX39/ebm5urq6vv7+/
        Ly8vk5OTDw8Ofn5+/v7+3t7ezs7Onp6fY2NjPz8/c3NwR2HHmAAABd0lEQVRYw+3SsUrDQBzH8R80tNEW4Z/
        eRW01JDoL6VR0SrrUSdo3aBE6t5OT0LyB3Ryb3cEiuAmtTyDFF/BNvJaeYpYrEsTh/x0OkoMPx/0PHMdxHMdxHMdxf1zfBwoOvuv6v7dEjtZ+
        mJ81m+ZntY7XlhU4kbYap6lbmNTUgRNyAbTr7wJY0pnJuqqHKyshOvyyTohaRD6aRHQHW20JWETUM1hRf6ysCkUWzbVVC2Ons
        6giGSOuYnFbSAW6L3iVJqvsKcsWQDzVlkTpCLsSqpISI5QFkjn2DkxWpa6schVoDLU1XBE7yrIGM4kgRFEgJSLHZGFy7aD0w/
        I31gURSYxCWALBVlbT25zrMWtNngclidn6XEEHgNGyHH1fWetGfUp9X71tLAR6jllrNLdGUs0RqzkKnLtmq6vfV9ZSP8mDrVaBolqfzFZRv
        /usZVPtUgBtuj8GluSGyCHbQz4lU8RD5NMHEb0hnyopPYDjOI7jOI7juP/XJ3B1TRmE/KufAAAAAElFTkSuQmCC`;
      }
    };
    img.src = url;
    this.component.contentStyle['background-image'] = 'url(' + url + ')';
  }
}
