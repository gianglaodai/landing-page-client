import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-default-menu',
  templateUrl: './default-menu.component.html',
  styleUrls: ['./default-menu.component.scss']
})
export class DefaultMenuComponent implements OnInit {
  @Input('isShowExit') isShowExit = true;
  constructor(private uService: UserService) { }

  ngOnInit() {
  }
  get userName() {
    return this.uService.getCurrentUser();
  }
  get product() {
    return this.uService.getCurrentProduct();
  }

}
