import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ul',
  templateUrl: './ul.component.html',
  styleUrls: ['./ul.component.scss']
})
export class ULComponent implements OnInit {
  @Input('component') component;
  constructor(private sanitizer: DomSanitizer) { }

  get ulVariableStyles() {
    let styleStr = '';
    const liStyles = this.component.ulData.liStyles;
    const iconStyles = this.component.ulData.iconStyles;
    Object.keys(liStyles).forEach(k => {
      styleStr += k + ':' + liStyles[k] + ';';
    });
    Object.keys(iconStyles).forEach(k => {
      if (typeof iconStyles[k] !== 'undefined' && iconStyles[k] !== null) {
        styleStr += k + ':' + iconStyles[k].replace(/&quot;/g, '"') + ';';
      }
    });
    return this.sanitizer.bypassSecurityTrustStyle(styleStr);
  }
  ngOnInit() {
  }

}
