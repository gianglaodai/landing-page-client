import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import * as requestConstant from '../../shared/services/server-configuration';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class PopupActionService {

  constructor(private http: Http, private uService: UserService) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/catalog/popup`).map(res => res.json());
  }

  getSectionTemplates(categoryId): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/popup/getAll/${categoryId}`).map(res => res.json());
  }

  getTemplate(categoryId, templateName): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/popup/load/${categoryId}?fileName=${templateName}`).map(res => res.json());
  }

  addSectionTemplate(categoryId, body): Observable<any> {
    return this.http.post(`${this.uService.serverUrl}/popup/save/${categoryId}`, body).map(res => res.json());
  }
}
