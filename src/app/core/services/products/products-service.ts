import { Injectable } from '@angular/core';
import { BackendApiService as ApiService } from '../backend-api.service';
import { Headers } from '@angular/http';
import { Currency } from '../../../shared/types';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { Product } from '../../../commons/model/product';

@Injectable()
export class ProductService {
    path: string = '/catalog/mgmt/v1/products'; // no products yet

    constructor(private api: ApiService){
    }

    lang = 'en'

    createProduct(product) {
        let headers = new Headers({
        'Content-Type': 'application/json'
        });
        return this.api.post(this.path, product, {}, this.lang )
    }

    getPage(page: number, size: number, lang: string, currency: Currency, filterParams: any): Observable<Page<Product>> {
        return this.api.get(this.path, Object.assign({ currency: currency }, filterParams) , this.lang)
    }

    deleteProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)
    }
}
