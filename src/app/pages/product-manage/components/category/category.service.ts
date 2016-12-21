import { Injectable } from '@angular/core'
import { BackendApiService as ApiService } from '../../../../services/backend-api.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Category }    from './model/category';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CategoryService {
  
    constructor(private api: ApiService){
    }

    private path: string = '/catalog/mgmt/v1/categories';

    getCategories(lang){
        return this.api.get(this.path, {}, lang);
    }

    addCategory (body: Object, lang): Observable<Category[]> {  
        return this.api.post(this.path, body, {}, lang);
    }   


    updateCategory (body: Object, lang): Observable<Category[]> {
        return this.api.put(`${this.path}/${body['id']}`, body, {}, lang);
    }   

    removeCategory (id:string, ): Observable<Category[]> {
        return this.api.delete(`${this.path}/${id}`);
    }       

}


