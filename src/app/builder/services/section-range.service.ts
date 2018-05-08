import { Injectable } from '@angular/core';
import { Offset } from '../../shared/interfaces/offset';

@Injectable()
export class SectionRangeService {
  sectionRange = {
    offset: {
      top: 0, left: 0
    },
    dimension: {
      width: 0,
      height: 0
    }
  };
  startOffset: Offset;
  constructor() { }

}
