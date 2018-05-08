import { Component, AfterContentInit, OnInit } from '@angular/core';
import { FontActionService } from './builder/services/font-action.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PageActionService } from './shared/services/page-action.service';
import { UserService } from './shared/services/user.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  fontUrl;
  constructor(private pService: PageActionService, private fService: FontActionService, private sanitizer: DomSanitizer, private http: Http,
    private uService: UserService) {
  }
  get isShowSpinner() {
    return this.pService.isShowSpinner;
  }
  ngOnInit() {
    let googleFonts;
    if (this.fService.googleFonts) {
      googleFonts = this.fService.googleFonts;
    } else {
      this.fService.getGoogleFonts().subscribe(data => {
        googleFonts = this.fService.googleFonts;
        let fontUrl = 'https://fonts.googleapis.com/css?family=';
        googleFonts.forEach((font, index) => {
          fontUrl += index ? '|' + font.family.replace(/ /g, '+') : font.family.replace(/ /g, '+');
          if (font.variants) {
            fontUrl += ':';
            font.variants.forEach((fontWeight, fontWeightIndex) => {
              fontUrl += fontWeightIndex ? ',' + fontWeight : fontWeight;
            });
          }
        });
        fontUrl += '&amp;subset=vietnamese';
        this.fontUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fontUrl);
        // console.log(googleFonts);
      });
    }
  }
  ngAfterContentInit() {
    document.getElementById('spinner').classList.remove('d-flex');
  }
}
