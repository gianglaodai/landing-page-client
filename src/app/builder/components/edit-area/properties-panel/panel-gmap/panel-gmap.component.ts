import { Component, OnInit, Input, NgZone, ViewChild, ElementRef } from '@angular/core';
import { WidgetElementComponent } from '../../widget-element/widget-element.component';
import { MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Gmap } from '../../../../../shared/interfaces/gmap';
declare var google: any;

@Component({
  selector: 'app-panel-gmap',
  templateUrl: './panel-gmap.component.html',
  styleUrls: ['./panel-gmap.component.scss']
})
export class PanelGmapComponent implements OnInit {
  @Input('element') element;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  gmap: Gmap = {
    latitude: 0,
    longitude: 0,
    zoom: 0,
    markerLabel: '',
    locationLabel: '',
    mapTypeId: ''
  };
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private snackBar: MatSnackBar) { }


  ngOnInit() {
    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    // this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ['all']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.gmap.latitude = place.geometry.location.lat();
          this.gmap.longitude = place.geometry.location.lng();
          this.gmap.markerLabel = place.formatted_address;
          this.gmap.locationLabel = place.formatted_address;
        });
      });
    });
  }

  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.gmap.latitude = position.coords.latitude;
  //       this.gmap.longitude = position.coords.longitude;
  //       this.gmap.zoom = 12;
  //     });
  //   }
  // }
  onSubmit(form: FormGroup) {
    if (!form.invalid) {
      // this.element.component.gmap.latitude = this.gmap.latitude || this.element.component.gmap.latitude;
      // this.element.component.gmap.longitude = this.gmap.longitude || this.element.component.gmap.longitude;
      // this.element.component.gmap.locationLabel = this.gmap.locationLabel || this.element.component.gmap.locationLabel;
      // this.element.component.gmap.markerLabel = this.gmap.markerLabel || this.element.component.gmap.markerLabel;
      // this.element.component.gmap.zoom = this.gmap.zoom || this.element.component.gmap.zoom;
      // this.element.component.gmap.mapTypeId = this.gmap.mapTypeId || this.element.component.gmap.mapTypeId;
      Object.keys(this.gmap).forEach(key => {
        const value = this.gmap[key];
        if (value && value.toString().length) {
          this.element.component.gmap[key] = JSON.parse(JSON.stringify(value));
        }
      });
      // this.element.component.gmap = JSON.parse(JSON.stringify(this.gmap));
    } else {
      this.snackBar.open('Vui lòng kiểm tra lại thông tin', 'Đóng', {
        duration: 2000,
        panelClass: 'warn',
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }

}
