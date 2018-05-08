import { Directive, Input, HostListener, Inject } from '@angular/core';
import { ModalImageComponent } from '../components/edit-area/modal/modal-image/modal-image.component';
import { MatDialog } from '@angular/material';
import * as componentType from '../../shared/common/component-type';
import { SectionActionService } from '../../shared/services/section-action.service';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { Rect } from '../../shared/interfaces/rect';
declare var $: any;
@Directive({
  selector: '[appOpenModalImage]'
})
export class OpenModalImageDirective {
  @Input('component') component;
  @Input('isMultiple') isMultiple;
  constructor(private dialog: MatDialog, private sService: SectionActionService, private cService: ComponentActionService) { }

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(ModalImageComponent, {
      height: '90%',
      width: '90%',
      autoFocus: false,
      data: { isMultiple: this.isMultiple }
    });
    dialogRef.afterClosed().subscribe(images => {
      images.forEach(image => {
        let comp = this.component; const $this = this;
        if (typeof comp !== 'undefined') {
          if (comp.type === componentType.IMAGE) {
            comp.contentStyle['background-image'] = 'url(' + image.url + ')';
          } else if (comp.type === componentType.UL) {
            comp['ulData']['iconStyles']['--background-image'] = 'url(' + image.url + ')';
          } else if (comp.type === 'section' || comp.type === 'popup') {
            comp.contentStyle['background-image'] = 'url(' + image.url + ')';
          } else {
            comp.contentStyle['background-image'] = 'url(' + image.url + ')';
          }
        } else {
          const mostVisible = this.sService.mostVisible;
          comp = $.extend(true, {}, componentType.IMG_COMPONENT);
          const cService = this.cService;
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function () {
            comp.rect.dimension.height = img.naturalWidth > 960 ? img.naturalHeight * 960 / img.naturalWidth : img.naturalHeight,
              comp.rect.dimension.width = img.naturalWidth > 960 ? 960 : img.naturalWidth;
            comp.rect.dimension.width = comp.rect.dimension.height > 500 ? comp.rect.dimension.width * 500 / comp.rect.dimension.height :
              comp.rect.dimension.width, comp.rect.dimension.height = comp.rect.dimension.height > 500 ? 500 : comp.rect.dimension.height;
            comp.rect.offset.top = comp.rect.offset.top - (comp.rect.dimension.height - comp.rect.dimension.height) / 2;
            comp.rect.offset.left = comp.rect.offset.left - (comp.rect.dimension.width - comp.rect.dimension.width) / 2;
            comp.contentStyle['background-image'] = 'url(' + image.url + ')';
            cService.addSpecialComponent($.extend(true, {}, comp), mostVisible);
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
          img.src = image.url;
        }
      });
    });
  }
}
