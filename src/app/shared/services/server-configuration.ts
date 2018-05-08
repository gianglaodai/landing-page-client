import { Headers, RequestOptions } from '@angular/http';

export const uploadHeaders = new Headers({ 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' });
export const defaultHeaders = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
export const uploadOption = new RequestOptions({ headers: uploadHeaders });
export const defaultOption = new RequestOptions({ headers: defaultHeaders });
// export const defaultUrl = localStorage.getItem('serverUrl');
// export const publishUrl = localStorage.getItem('publishUrl');
export const isAdmin = false;
