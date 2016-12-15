import { Injectable } from '@angular/core'
import { ApiService } from '../../services/api'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProductService {
    path: string = '/merchants'; // no products yet

    constructor(private api: ApiService){
    }

    createProduct(product) {
        let headers = new Headers({ 
        'Content-Type': 'application/json'             
        });
        return this.api.post(this.path, product, headers )
    }

    getProducts(){
        return this.api.get(this.path)
    }

    deleteProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)
    }
}