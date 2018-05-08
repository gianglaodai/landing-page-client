import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgmMap } from '@agm/core';
import { ComponentActionService } from '../../../services/component-action.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  @ViewChild(AgmMap) appGmap: AgmMap;
  @Input('component') component;
  constructor(private cService: ComponentActionService) { }

  ngOnInit() {
    this.cService.componentUpdated.subscribe(key => {
      this.appGmap.triggerResize()
        .then(() => (this.appGmap as any)._mapsWrapper.setCenter({
          lat: this.component.gmap.latitude,
          lng: this.component.gmap.longitude
        }));
    });
  }

}
