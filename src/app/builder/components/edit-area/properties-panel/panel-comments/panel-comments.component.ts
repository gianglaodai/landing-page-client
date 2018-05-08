import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponent } from '../../../../../shared/interfaces/widget-component';

@Component({
  selector: 'app-panel-comments',
  templateUrl: './panel-comments.component.html',
  styleUrls: ['./panel-comments.component.scss']
})
export class PanelCommentsComponent implements OnInit {
  @Input('component') component: WidgetComponent;
  constructor() { }
  get comments() {
    if (!this.component.comments) {
      this.component.comments = {};
    }
    return this.component.comments;
  }
  ngOnInit() {
  }

}
