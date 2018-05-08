import { Injectable } from '@angular/core';
import * as requestConstant from '../../shared/services/server-configuration';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class TemplateActionService {

  constructor(private http: Http, private uService: UserService) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/catalog/template`).map(res => res.json());
  }

  getTemplates(categoryId): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/template/getAll/${categoryId}`).map(res => res.json());
  }

  getTemplate(categoryId, templateName): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/template/load/${categoryId}?fileName=${templateName}`).map(res => res.json());
  }

  saveTemplate(categoryId, body): Observable<any> {
    return this.http.post(`${this.uService.serverUrl}/template/save/${categoryId}`, body).map(res => res.json());
  }

}
