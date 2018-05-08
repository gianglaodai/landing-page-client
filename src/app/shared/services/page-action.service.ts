import { Injectable, OnDestroy, EventEmitter, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as requestConstant from './server-configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { SectionActionService } from './section-action.service';
import { Grid } from '../../builder/classes/grid';
import { Page } from '../interfaces/page';
import { GenerateHTML } from '../../builder/classes/generate-HTML';
import { UserService } from './user.service';
declare var $: any;

@Injectable()
export class PageActionService implements OnDestroy {
  public isShowRuler;
  public grid;
  public isShowGrid;
  public isShowSettingBar;
  public isShowSpinner;
  public pageEmitter;
  private _page: Page;
  private _pageHistories;
  private _currentPageIndex;
  public isMobile;
  constructor(private http: Http, private uService: UserService) {
    this.reset();
  }
  reset() {
    this.isShowRuler = true;
    this.grid = new Grid(3, 30);
    this.isShowGrid = false;
    this.isShowSettingBar = true;
    this.isShowSpinner = true;
    this.pageEmitter = new EventEmitter();
    this.page = null;
    this._pageHistories = [];
    this._currentPageIndex = null;
    this.isMobile = false;
  }

  get page() {
    return this._page;
  }
  set page(page) {
    this._page = page;
    if (page) {
      this._pageHistories.push(JSON.stringify(page));
      this._currentPageIndex = this._pageHistories.length - 1;
    }
  }
  makeRedo(jsonString, step) {
    if (jsonString.localeCompare(this._pageHistories[this._currentPageIndex]) !== 0) {
      this._pageHistories.splice(this._currentPageIndex + 1);
      this._pageHistories.push(jsonString);
      if (this._pageHistories.length >= 10) {
        this._pageHistories.splice(0, 1);
      }
    }
    this._currentPageIndex += step;
  }
  get isShowUndo() {
    const jsonString = JSON.stringify(this.page);
    return !(jsonString.localeCompare(this._pageHistories[this._currentPageIndex]) === 0 && this._currentPageIndex <= 0);
  }
  undo(): boolean {
    const jsonString = JSON.stringify(this.page);
    if (jsonString.localeCompare(this._pageHistories[this._currentPageIndex]) === 0) {
      if (this._currentPageIndex > 0) {
        this._currentPageIndex -= 1;
        this._page = JSON.parse(this._pageHistories[this._currentPageIndex]);
        return true;
      }
    } else if (this._currentPageIndex === this._pageHistories.length - 1) {
      this._pageHistories.push(jsonString);
      if (this._pageHistories.length >= 10) {
        this._pageHistories.splice(0, 1);
        this._currentPageIndex -= 1;
      }
      this._page = JSON.parse(this._pageHistories[this._currentPageIndex]);
      return true;
    } else if (this._currentPageIndex < this._pageHistories.length - 1) {
      this._pageHistories.splice(this._currentPageIndex + 1);
      this._pageHistories.push(jsonString);
      if (this._pageHistories.length >= 10) {
        this._pageHistories.splice(0, 1);
        this._currentPageIndex -= 1;
      }
      this._page = JSON.parse(this._pageHistories[this._currentPageIndex]);
      return true;
    }
    return false;
  }
  get isShowRedo() {
    return !(this._currentPageIndex >= this._pageHistories.length - 1);
  }
  redo(): boolean {
    if (this._currentPageIndex >= this._pageHistories.length - 1) {
      return false;
    }
    this._currentPageIndex += 1;
    this._page = JSON.parse(this._pageHistories[this._currentPageIndex]);
    return true;
  }
  savePage(userName, product, publish, data): Observable<any> {
    const jsonString = JSON.stringify(this.page);
    if (jsonString.localeCompare(this._pageHistories[this._currentPageIndex]) !== 0) {
      if (this._currentPageIndex === this._pageHistories.length - 1) {
        this._pageHistories.push(jsonString);
        this._currentPageIndex += 1;
      } else if (this._currentPageIndex < this._pageHistories.length - 1) {
        this._pageHistories.splice(this._currentPageIndex + 1);
        this._pageHistories.push(jsonString);
        this._currentPageIndex += 1;
      }
    }
    return this.http.post(`${this.uService.serverUrl}/page/save?user=${userName}&product=${product}&publish=${publish}`,
      data).map(res => res.json());
  }
  publishFile(userName, product, pageName): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/page/publish?user=${userName}&product=${product}&pageName=${pageName}`)
      .map(res => res.json());
  }
  publishToIshopGo(body): Observable<any> {
    return this.http.post(`${this.uService.publishUrl}`, body)
      .map(res => {
        if (res.status < 200 || res.status >= 300) {
          return false;
        } else {
          return res.json();
        }
      });
  }
  set currentPageIndex(index) {
    this._pageHistories = index;
  }
  set pageHistories(index) {
    this._currentPageIndex = index;
  }
  getPages(username, product) {
    return this.http.get(`${this.uService.serverUrl}/page/getAll?user=${username}&product=${product}`).map(res => res.json());
  }
  loadPage(username, product, pageName, publish) {
    const url =
    `${this.uService.serverUrl}/page/load?user=${username}&product=${product}&pageName=${encodeURIComponent(pageName)}&publish=${publish}`;
    return this.http.get(url).map(res => res.json());
  }
  // createPage(userName, pageName, catalog, templateName): Observable<any> {
  //   const url = `${this.uService.serverUrl}/page/create?user=${userName}
  //   &pageName=${encodeURIComponent(pageName)}&templateName=${encodeURIComponent(templateName)}&catalog=${encodeURIComponent(catalog)}`;
  //   return this.http.post(url, null).map(res => res.json());
  // }

  deletePage(userName: string, files: any[], product): Observable<any> {
    const fileNamesParam = `&fileNames=${encodeURIComponent(files[0])}`;
    return this.http.delete(`${this.uService.serverUrl}/page/delete?user=${encodeURIComponent(userName)}${fileNamesParam}
    &product=${product}`)
      .map(res => res.json());
  }

  getCurrentPage() {
    return localStorage.getItem('pageName');
  }
  setCurrentPage(pageName) {
    return localStorage.setItem('pageName', pageName);
  }
  getCurrentPublish() {
    return localStorage.getItem('publish');
  }
  setCurrentPublish(publish) {
    return localStorage.setItem('publish', publish);
  }
  ngOnDestroy() {
    localStorage.removeItem('pageName');
    localStorage.removeItem('publish');
  }
}
