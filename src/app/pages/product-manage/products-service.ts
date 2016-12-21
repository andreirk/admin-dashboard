import { Injectable } from '@angular/core'
import { BackendApiService as ApiService } from '../../services/backend-api.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProductService {
    path: string = '/catalog/mgmt/v1/categories'; // no products yet

    constructor(private api: ApiService){
    }

    lang = 'en'

    createProduct(product) {
        let headers = new Headers({ 
        'Content-Type': 'application/json'             
        });
        return this.api.post(this.path, product, {}, this.lang )
    }

    getProducts(){
        return this.api.get(this.path,{}, this.lang)
    }

    deleteProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)
    }
}