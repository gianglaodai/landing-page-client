import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent implements OnInit {
  @Input('component') component;
  constructor() { }

  get ulType() {
    return this.component.ulData.type;
  }
  set ulType(type) {
    if (!this.component.ulData) {
      this.component.ulData = { type: type };
    } else {
      this.component.ulData['type'] = type;
    }
    if (type === 'list') {
      this.component.ulData['iconStyles']['--content'] = 'counter(linum,decimal)';
    }
    if (type !== 'image') {
      this.component.ulData['iconStyles']['--background-image'] = null;
    }
    if (type === 'image') {
      this.component.ulData['iconStyles']['--content'] = `\' \'`;
    }
  }

  get iconContent() {
    return this.component.ulData.iconStyles['--content'];
  }
  set beforeCounter(content) {
    if (!this.component.ulData) {
      this.component.ulData = { type: 'list' };
    }
    if (!this.component.ulData.iconStyles) {
      this.component.ulData.iconStyles = {};
    }
    this.component.ulData.iconStyles['--content'] = content;
  }
  changeColor($event) {
    if (this.component.ulData['type'] === 'icon') {
      const color = this.component['ulData']['iconStyles']['--color'] ? `${this.component['ulData']['iconStyles']['--color']}` :
        'rgba(0,0,0,1)';
      console.log($event);
      this.component['ulData']['iconStyles']['--content'] = this.component['ulData']['iconStyles']['--content'].replace(color, `${$event}`);
      // this.component['ulData']['iconStyles']['--content'].replace(color, `${$event}`);
    }
    this.component['ulData']['iconStyles']['--color'] = $event;
  }

  ngOnInit() {
  }

}
