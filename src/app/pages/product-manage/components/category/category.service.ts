import { Injectable } from '@angular/core'
import { ApiService } from '../../../../services/api'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Category }    from './model/category';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CategoryService {
    path: string = '/categories'; // no products yet

    constructor(private api: ApiService, private http: Http){
    }

    private categorysUrl = '/categories'; 

    // createCategory(category) {
    //     return this.api.post(this.path, category)
    // }

    // deleteCategory(category) {
    //     return this.api.delete(`${this.path}/${category.id}`)
    // }    

    getCategories(){
        let headers  = new Headers({ 
            'Authorization':  'Basic ' + btoa('admin:0000'),
            'Accept': 'application/json', 
            'Accept-Language': 'en'            
        });  
        return this.api.get(this.path, headers);
    }

    // getCategories() : Observable<Category[]> {
    //     // ...using get request
    //     return this.http.get(this.categorysUrl)
    //                 // ...and calling .json() on the response to return data
    //                     .map((res:Response) => res.contents
    //                     //...errors if any
    //                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    //  }

    addCategory (body: Object): Observable<Category[]> {
        // let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 
            'Content-Type': 'application/json' 
                    
    }); // ... Set content type to JSON
        headers.append('Authorization', 'Basic ' + btoa('admin:0000'));   
        headers.append('Accept','application/json' );   
        headers.append('Accept-Language', 'en');   
        //let options       = new RequestOptions({ headers: headers }); // Create a request option

        // return this.http.post(this.categorysUrl, body, options) // ...using post request
        //                  .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
            return this.api.post(this.path, body, headers);
    }   

    // Update a category
    updateCategory (body: Object): Observable<Category[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept','application/json' );   
        headers.append('Accept-Language', 'en');  
        //let options  = new RequestOptions({ headers: headers }); // Create a request option

        // return this.http.put(`${this.categorysUrl}/${body['id']}`, body, options) // ...using put request
        //                  .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
            console.log('body and path is', {
                body : body,
                path: this.path
            })
            return this.api.put(`${this.path}/${body['id']}`, body, headers);
    }   

    // Delete a category
    removeCategory (id:string): Observable<Category[]> {
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        headers.append('Accept','application/json' );   
        headers.append('Accept-Language', 'en');  
        //let options  = new RequestOptions({ headers: headers }); // Create a request option
        // return this.http.delete(`${this.categorysUrl}/${id}`) // ...using put request
        //                  .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        //                  .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
            return this.api.delete(`${this.path}/${id}`, headers);
    }       


}


