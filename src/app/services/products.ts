import { Injectable } from '@angular/core'
import { ApiService } from './api'

@Injectable()
export class ProductService {
    path: string = '/merchants'; // no products yet

    constructor(private api: ApiService){
          
    }

    createProduct(product) {
        return this.api.post(this.path, product)
    }

    getProducts(){
        return this.api.get(this.path)
    }

    completeProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)
    }
}