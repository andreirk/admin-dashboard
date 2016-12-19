import { Injectable } from '@angular/core'
import { BackendApiService as ApiService } from '../../../../services/backend-api.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Category }    from './model/category';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CategoryService {
    path: string = '/catalog/mgmt/v1/categories'; // no products yet
    constructor(private api: ApiService, private http: Http){
    }

    private categorysUrl = '/categories'; 

    getCategories(lang){
        // let headers  = new Headers({ 
        //     'Authorization':  'Basic ' + btoa('admin:0000'),
        //     'Accept': 'application/json', 
        //     'Accept-Language': lang            
        // });  
        console.log('in category service get lang', lang)
        return this.api.get(this.path, {}, lang);
    }


    addCategory (body: Object, lang): Observable<Category[]> {
        // let headers      = new Headers({ 
        //     'Content-Type': 'application/json'            
        // }); 
        // headers.append('Authorization', 'Basic ' + btoa('admin:0000'));   
        // headers.append('Accept','application/json' );   
        // headers.append('Accept-Language', lang);   
            console.log('in category service lang', lang)
            return this.api.post(this.path, body, {}, lang);
    }   

    // Update a category
    updateCategory (body: Object, lang): Observable<Category[]> {
        debugger;
        // let bodyString = JSON.stringify(body); // Stringify payload
        // let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        // headers.append('Accept','application/json' );   
        // headers.append('Accept-Language', lang);  

        // console.log('body and path is', {
        //     body : body,
        //     path: this.path
        // })
        return this.api.put(`${this.path}/${body['id']}`, body, {}, lang);
    }   

    // Delete a category
    removeCategory (id:string, ): Observable<Category[]> {
        // let headers      = new Headers({ 'Content-Type': 'application/json' }); 
        // headers.append('Accept','application/json' );   
        // headers.append('Accept-Language', 'en');  

        return this.api.delete(`${this.path}/${id}`);
    }       


}


