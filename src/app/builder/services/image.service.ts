import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import * as requestConstant from '../../shared/services/server-configuration';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class ImageService {

  constructor(private http: Http, private uService: UserService) { }

  public getImages(): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/image/getAll?user=${this.uService.getCurrentUser()}`).map(res => res.json());
  }

  public uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.uService.serverUrl}/image/save?user=${this.uService.getCurrentUser()}`,
      formData).map(res => res.json());
  }

  public deleteImages(imageNames: any[]): Observable<any> {
    let fileNamesParam = '';
    imageNames.forEach(fileName => fileNamesParam += `&fileNames=${fileName.fileFullName}`);
    return this.http.delete(`${this.uService.serverUrl}/image/delete?user=${this.uService.getCurrentUser()}${fileNamesParam}`)
      .map(res => res.json());
  }
}
