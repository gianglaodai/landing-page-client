import * as componentType from '../../shared/common/component-type';
import { WidgetElementComponent } from '../components/edit-area/widget-element/widget-element.component';
import { OnInit, Inject } from '@angular/core';
import { Offset } from '../../shared/interfaces/offset';
import { Dimension } from '../../shared/interfaces/dimension';
declare var $: any;
export class ComponentResizeable {
  private $elm;
  private diverX: HTMLElement;
  private diverY: HTMLElement;
  private editContent;
  private resize;
  private resizePosition;
  public onResize;
  public onResizeStop;
  public resizeDirection: Array<any>;
  private componentType = componentType;
  public autoHide = false;
  public compType;
  public aspectRatio = false;
  public snapable = true;
  constructor($elm) {
    this.$elm = $elm;
    this.diverX = document.getElementById('diver-line-x');
    this.diverY = document.getElementById('diver-line-y');
    this.editContent = document.getElementById('edit-content');
  }
  disableResize() {
    this.$elm.resizable('disable');
  }
  enableResize() {
    this.$elm.resizable('enable');
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
  private getResizeDirection() {
    let directionStr = '';
    this.resizeDirection.forEach((dir, index) => {
      directionStr += index ? ',' + dir : dir;
    });
    return directionStr;
  }
  initResize() {
    const $this = this;
    const editContentOffset = $this.getOffset($this.editContent);
    const $resize = $this.resize = $this.$elm.resizable({
      snap: $this.snapable ? '.ui-snap' : false,
      snapTolerance: 10,
      handles: $this.getResizeDirection(),
      autoHide: $this.autoHide,
      aspectRatio: $this.aspectRatio,
      start: function (event, ui) {
      },
      resize: function (event, ui) {
        $this.diverX.removeAttribute('style');
        $this.diverY.removeAttribute('style');
        const offset: Offset = ui.position;
        const originalSize: Dimension = ui.originalSize;
        const dimension = { height: ui.helper[0].offsetHeight, width: ui.helper[0].offsetWidth };
        const offsetUpTop: Offset = $this.getOffset(ui.helper[0]);
        if (ui.originalSize.width !== ui.size.width && ui.originalSize.height === ui.size.height
          && $this.compType === $this.componentType.BUTTON) {
          ($this.$elm[0].querySelector('.widget-content') as HTMLElement).style.minHeight = ui.originalSize.height + 'px';
          ($this.$elm[0] as HTMLElement).style.removeProperty('height');
        }
        const snapCoords = $resize.data('ui-resizable').coords;
        $.each(snapCoords, function (i, coord) {
          if (offset.left === coord.l || offset.left === coord.r) {
            $this.diverY.style.left = $this.$elm.offset().left + 'px';
            $this.diverY.style.display = 'block';
          } else if (offset.left + dimension.width === coord.l || offset.left + dimension.width === coord.r) {
            $this.diverY.style.left = $this.$elm.offset().left + dimension.width + 'px';
            $this.diverY.style.display = 'block';
          }
          if (offset.top === coord.t || offset.top === coord.b) {
            $this.diverX.style.top = $this.$elm.offset().top + 'px';
            $this.diverX.style.display = 'block';
          } else if (offset.top + dimension.height === coord.t || offset.top + dimension.width === coord.b) {
            $this.diverX.style.top = $this.$elm.offset().top + dimension.height + 'px';
            $this.diverX.style.display = 'block';
          }
        });

        if (typeof $this.onResize === 'function') {
          $this.onResize();
        }
      },
      stop: function (event, ui) {
        $this.diverX.removeAttribute('style');
        $this.diverY.removeAttribute('style');
        if (ui.originalSize.width !== ui.size.width
          && $this.compType === $this.componentType.BUTTON) {
          ($this.$elm[0] as HTMLElement).style.height = ($this.$elm[0] as HTMLElement).offsetHeight + 'px';
          ($this.$elm[0].querySelector('.widget-content') as HTMLElement).style.removeProperty('min-height');
        }
        if (typeof $this.onResizeStop === 'function') {
          $this.onResizeStop(ui.size);
        }
      }
    });
  }
}
