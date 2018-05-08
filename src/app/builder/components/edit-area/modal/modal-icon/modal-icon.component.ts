import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import * as componentType from '../../../../../shared/common/component-type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';
import { MATERIAL_SVG } from '../../../../common/icons/material-svg';
import { AWESOME_SVG } from '../../../../common/icons/awesome-svg';
import { WIN10_SVG } from '../../../../common/icons/win10-svg';
import { STROKE7_SVG } from '../../../../common/icons/stroke7-svg';

@Component({
  selector: 'app-modal-icon',
  templateUrl: './modal-icon.component.html',
  styleUrls: ['./modal-icon.component.css']
})
export class ModalIconComponent implements OnInit {
  componentType = componentType;
  component;
  keyWord = '';
  constructor(private sService: SectionActionService, private cService: ComponentActionService,
    private dialogRef: MatDialogRef<ModalIconComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.component = data['component'];
  }
  get MATERIAL_ICONS() {
    let result = MATERIAL_SVG;
    if (this.keyWord) {
      result = MATERIAL_SVG.filter(el => {
        return el['key'].includes(this.keyWord.toLowerCase());
      });
    }
    return result;
  }
  get AWESOME_ICONS() {
    let result = AWESOME_SVG;
    if (this.keyWord) {
      result = AWESOME_SVG.filter(el => {
        return el['key'].includes(this.keyWord.toLowerCase());
      });
    }
    return result;
  }
  get WIN10_ICONS() {
    let result = WIN10_SVG;
    if (this.keyWord) {
      result = WIN10_SVG.filter(el => {
        return el['key'].includes(this.keyWord.toLowerCase());
      });
    }
    return result;
  }
  get STROKE7_ICONS() {
    let result = STROKE7_SVG;
    if (this.keyWord) {
      result = STROKE7_SVG.filter(el => {
        return el['key'].includes(this.keyWord.toLowerCase());
      });
    }
    return result;
  }

  addIcon(icon: any) {
    if (!this.component) {
      const icon_instance = JSON.parse(JSON.stringify(this.componentType.SHAPE_COMPONENT));
      icon_instance.svg = { 'view-box': icon['viewBox'], 'path': icon['path'] };
      this.cService.addSpecialComponent(icon_instance, this.sService.mostVisible);
    } else if (this.component.type === this.componentType.UL) {
      // const url = `url(\"data:image/svg+xml;utf8, <svg fill='rgba(0,0,0,1)' xmlns='http://www.w3.org/2000/svg'
      // xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='100%'
      // viewBox='0 0 24 24'> <path d='M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,
      // 16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,
      // 14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,
      // 8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,
      // 7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,
      // 13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z'>
      // </path></svg>\")`;
      let url = `url('data:image/svg+xml;utf8,`;
      url += `<svg fill=&quot;${this.component['ulData']['iconStyles']['--color']}&quot; `;
      url += `xmlns=&quot;http://www.w3.org/2000/svg&quot; xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot; `;
      url += `width=&quot;100%&quot; height=&quot;100%&quot; viewBox=&quot;${icon['viewBox']}&quot;>`;
      url += `<path d=&quot;${icon['path']}&quot;></path></svg>')`;
      this.component['ulData']['iconStyles']['--content'] = url;
    } else if (this.component.type === this.componentType.SHAPE) {
      this.component.svg = { 'view-box': icon['viewBox'], 'path': icon['path'] };
    }
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
