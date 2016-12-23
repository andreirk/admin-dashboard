import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class BackendApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic YWRtaW46MDAwMA=='
  });

  constructor(private http: Http) {
  }

  get(path: string, params: Object, lang: string): Observable<any> {
    this.headers.set('Accept-Language', lang);

    return this.http.get(path, this.getRequestOptions(params, lang))
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  post(path: string, body: Object, params: Object, lang?: string): Observable<any> {
    return this.http.post(path, body, this.getRequestOptions(params, lang))
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  put(path: string, body: Object, params: Object, lang: string): Observable<any> {
    return this.http.put(path, body, this.getRequestOptions(params, lang))
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  private getJson(resp: Response){
    return resp.json();
  }

  private checkForError(resp: Response): Response{
    if(resp.status >= 200 && resp.status < 300){
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.log(error);
      throw error;
    }
  }

  private getRequestOptions(params: Object, lang?: string): RequestOptions {
    if (lang) {
      this.headers.set('Accept-Language', lang);
    }

    let urlparams = new URLSearchParams();
    Object.keys(params).forEach(key => urlparams.set(key, params[key]));
    return new RequestOptions({
      headers: this.headers,
      search: urlparams
    });
  }
}

