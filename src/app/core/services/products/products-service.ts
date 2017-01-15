import { Injectable } from '@angular/core';
import { BackendApiService as ApiService } from '../backend-api.service';
import { Headers } from '@angular/http';

@Injectable()
export class ProductService {
    path: string = '/catalog/mgmt/v1/products'; // no products yet

    constructor(private api: ApiService){
    }

    lang = 'en';

    createProduct(product) {

        return this.api.post(this.path, product, {}, this.lang )
    }

    getProducts(currency, options = {}){

        return this.api.get(this.path, options, this.lang, currency)
    }

    deleteProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)

    }
}
