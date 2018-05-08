import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as componentType from '../../../../shared/common/component-type';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  @Input('component') component;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (document.getElementById('reinitFb')) {
      document.getElementById('reinitFb').remove();
    }
    const s = document.createElement('script');
    s.id = 'reinitFb';
    s.type = 'text/javascript';
    // console.log(`FB.XFBML.parse(document.getElementById('${this.component.id}'))`);
    s.innerHTML = `
    $(document).ready(function(){
      FB.XFBML.parse(document.getElementById('${this.component.id}'))
    });`;
    setTimeout(() => {
      document.querySelector('body').appendChild(s);
    }, 200);
  }

}
