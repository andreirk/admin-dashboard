
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
    defautHeaders: Headers = new Headers({
        'Authorization':'Basic ' + btoa('admin:0000'),
        'Content-Type': 'application',
        'Accept': 'application/json', 
        'Accept-Language':'en'  
    });

    apiUrl: string = '/catalog/mgmt/v1';

    constructor(private http: Http){

    }

    get(path: string, headers: Headers = this.defautHeaders): Observable<any>{
        return this.http.get(`${this.apiUrl}${path}`, {headers})
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)
    }

    post(path: string, body, headers: Headers = this.defautHeaders): Observable<any> {
        return this.http.post(
            `${this.apiUrl}${path}`,
            JSON.stringify(body),
            {headers: headers} )
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)        
    }

    put(path: string, body, headers: Headers = this.defautHeaders): Observable<any> {
        return this.http.put(
            `${this.apiUrl}${path}`,
            JSON.stringify(body),
            {headers: headers} )
            .map(this.checkForError)
            .catch(err => Observable.throw(err))
            .map(this.getJson)        
    }

    delete(path: string, headers: Headers = this.defautHeaders): Observable<any>{
        return this.http.delete(`${this.apiUrl}${path}`, headers)
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
   
}

