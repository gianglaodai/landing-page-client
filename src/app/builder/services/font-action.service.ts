import { Injectable } from '@angular/core';
import { FontWeight } from '../../shared/interfaces/font-weight';
import { Font } from '../../shared/interfaces/font';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FontActionService {
  private FONT_API_KEY = 'AIzaSyDUpJPGeyW6gqhRnwpH6-KF80pONuLrztw';
  public fonts: Font[] = [
    {
      'name': 'Arima Madurai',
      'href': 'Arima+Madurai:300,400,600,700,800',
      'family': '\'Arima Madurai\', cursive',
      'weight': '400'
    },
    {
      'name': 'Athiti',
      'href': 'Athiti:400,600,700,800',
      'family': '\'Athiti\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Baloo Bhaina',
      'href': 'Baloo+Bhaina:400,600,700',
      'family': '\'Baloo Bhaina\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Bungee',
      'href': 'Bungee:400,600,700',
      'family': '\'Bungee\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Chonburi',
      'href': 'Chonburi:400,600,700',
      'family': '\'Chonburi\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Cormorant Upright',
      'href': 'Cormorant+Upright:400,600,700',
      'family': '\'Cormorant Upright\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Itim',
      'href': 'Itim:300,400,600,700,800',
      'family': '\'Itim\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Lobster',
      'href': 'Lobster:300,400,600,700,800',
      'family': '\'Lobster\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Montserrat',
      'href': 'Montserrat:300,400,600,700',
      'family': '\'Montserrat\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Open Sans',
      'href': 'Open+Sans:400,600,700',
      'family': '\'Open Sans\',sans-serif,open-sans',
      'weight': '400'
    },
    {
      'name': 'Pattaya',
      'href': 'Pattaya:300,400,700',
      'family': '\'Pattaya\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Prata',
      'href': 'Prata:300,400,700',
      'family': '\'Prata\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Quicksand',
      'href': 'Prata:300,400,700',
      'family': '\'Quicksand\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Roboto Slab',
      'href': 'Roboto+Slab:300,400,700',
      'family': '\'Roboto Slab\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Roboto',
      'href': 'Roboto:100,300,300i,400,400i,500,500i,700,700i',
      'family': '\'Roboto\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Source Sans Pro',
      'href': 'Source+Sans+Pro:300,400,600,700',
      'family': '\'Source Sans Pro\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Taviraj',
      'href': 'Taviraj:300,400,600,700',
      'family': '\'Taviraj\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Tinos',
      'href': 'Tinos:400,700',
      'family': '\'Tinos\', sans-serif',
      'weight': '400'
    },
    {
      'name': 'Trirong',
      'href': 'Trirong:300,400,600,700',
      'family': '\'Trirong\', sans-serif',
      'weight': '400'
    },
  ];
  public fontWeights: FontWeight[] = [
    {
      'name': '300 - light',
      'weight': '300'
    },
    {
      'name': '400 - normal',
      'weight': '400'
    },
    {
      'name': '600 - semi bold',
      'weight': '600'
    },
    {
      'name': '700 - bold',
      'weight': '700'
    },
    {
      'name': '800 - extra bold',
      'weight': '800'
    }
  ];
  googleFonts;
  constructor(private http: Http) { }
  getGoogleFonts(): Observable<any> {
    return this.http.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${this.FONT_API_KEY}&sort=alpha`)
      .map(res => {
        this.googleFonts = res.json()['items']
          .filter(font => {
            return font['subsets'].indexOf('vietnamese') >= 0;
          });
      });
  }

}
