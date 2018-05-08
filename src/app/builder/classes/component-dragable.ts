import * as componentType from '../../shared/common/component-type';
import { WidgetElementComponent } from '../components/edit-area/widget-element/widget-element.component';
import { OnInit, Inject } from '@angular/core';
import { Offset } from '../../shared/interfaces/offset';
import { Dimension } from '../../shared/interfaces/dimension';
declare var $: any;
export class ComponentDragable {
  private $elm;
  private diverX;
  private diverY;
  private editContent;
  private drag;
  private dragPosition;
  public onDragStop;
  private componentType = componentType;
  public autoHide = false;
  public compType;
  constructor($elm) {
    this.$elm = $elm;
    this.diverX = document.getElementById('diver-line-x');
    this.diverY = document.getElementById('diver-line-y');
    this.editContent = document.getElementById('appEditConent').querySelector('.mCSB_dragger');
  }
  disableDrag() {
    this.$elm.draggable('disable');
  }
  enableDrag() {
    this.$elm.draggable('enable');
  }
  changeDragOption(option, value) {
    this.$elm.draggable('option', option, value);
  }
  private getOffset(elem) {
    const offset: Offset = { top: 0, left: 0 };
    do {
      if (!isNaN(elem.offsetLeft)) {
        offset.left += elem.offsetLeft;
      }
      if (!isNaN(elem.offsetTop)) {
        offset.top += elem.offsetTop;
      }
    } while (elem = elem.offsetParent);
    return offset;
  }
  initDrag() {
    const $this = this;
    const scroll = $this.editContent.style.top;
    const $drag = $this.drag = $this.$elm.draggable({
      snap: '.ui-snap',
      snapTolerance: 5,
      drag: function (event, ui) {
        $this.diverX.removeAttribute('style');
        $this.diverY.removeAttribute('style');
        const snapped = $drag.data('ui-draggable').snapElements;
        $.each(snapped, function (i, $snap) {
          const snapOffset: Offset = { top: $snap.top, left: $snap.left };
          const snapDimension: Dimension = { width: $snap.width, height: $snap.height };
          const offset = ui.offset;
          const dimension = { height: ui.helper[0].offsetHeight, width: ui.helper[0].offsetWidth };
          if (offset.left === snapOffset.left || offset.left === snapOffset.left + snapDimension.width
            || offset.left + dimension.width === snapOffset.left + snapDimension.width
            || offset.left + dimension.width === snapOffset.left) {
            if (offset.left === snapOffset.left || offset.left === snapOffset.left + snapDimension.width) {
              $this.diverY.style.left = offset.left - 1 + 'px';
            } else {
              $this.diverY.style.left = offset.left + dimension.width + 'px';
            }
            $this.diverY.style.display = 'block';
          }
          if (offset.top === snapOffset.top || offset.top === snapOffset.top + snapDimension.height
            || offset.top + dimension.height === snapOffset.top + snapDimension.height
            || offset.top + dimension.height === snapOffset.top) {
            if (offset.top === snapOffset.top || snapOffset.top + snapDimension.height === offset.top) {
              $this.diverX.style.top = $this.$elm.offset().top + 'px';
            } else {
              $this.diverX.style.top = ($this.$elm.offset().top + dimension.height) + 'px';
            }
            $this.diverX.style.display = 'block';
          }
        });
      },
      stop: function (event, ui) {
        $this.diverX.removeAttribute('style');
        $this.diverY.removeAttribute('style');
        const position = ui.position;
        if (typeof $this.onDragStop === 'function') {
          $this.onDragStop(ui.position, ui.offset);
        }
        $this.initDrag();
      }
    });
  }
}
