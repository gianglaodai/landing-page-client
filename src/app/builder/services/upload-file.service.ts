import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as requestConstant from '../../shared/services/server-configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UploadFileService {

  constructor(private http: Http, private uService: UserService) { }

  public uploadFiles(formData: FormData): Observable<any> {
    return this.http.post(`${this.uService.serverUrl}/uploadImages?user=${this.uService.getCurrentUser()}`,
      formData).map(res => res.json());
  }
}
