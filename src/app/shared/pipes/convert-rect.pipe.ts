import { Pipe, PipeTransform } from '@angular/core';
import { Rect } from '../interfaces/rect';

@Pipe({
  name: 'convertRect'
})
export class ConvertRectPipe implements PipeTransform {

  transform(rect: Rect): any {
    if (!rect) {
      return null;
    }
    const rectStyle = {};
    Object.entries(rect).forEach(entry => {
      Object.entries(entry[1]).forEach(property => {
        rectStyle[property[0]] = property[1].toString() + 'px';
      });
    });
    return rectStyle;
  }

}
