import { Injectable } from '@angular/core';
import { BackendApiService as ApiService } from '../backend-api.service';
import { Headers } from '@angular/http';
import { Currency } from '../../../shared/types';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { Product } from '../../../commons/model/product';
import { MerchantBackendService } from "../merchants/merchant-backend.service";

@Injectable()
export class ProductService {
    path: string = '/catalog/mgmt/v1/products'; // no products yet
    lang = 'en';

    constructor(private api: ApiService,
                private merchantBackendApi: MerchantBackendService){
    }


    createProduct(merchantId,  lang) {
      return this.merchantBackendApi.createMerchantsProduct(merchantId, lang)
        .map(result => result.id);
    }

    getOne(id: string, options = {}, lang: string): Observable<Product> {
      return this.api.get(this.path + '/' + id, options, lang);
    }

    getProducts(currency, options = {}){

        return this.api.get(this.path, options, this.lang, currency)
    }

    getPage(page: number, size: number, lang: string, currency: Currency, filterParams: any): Observable<Page<Product>> {
      return this.api.get(this.path, Object.assign({ currency: currency }, filterParams) , this.lang)
    }

    deleteProduct(product) {
        return this.api.delete(`${this.path}/${product.id}`)
    }

    saveProduct(merchantId, product: Product, productOriginal: Product, lang): any {

      if (!product.id || !_.isEqual(product, productOriginal)) {
        return this.save(merchantId, product, lang);
      } else {
        return Observable.of(product.id);
      }
    }

    save(merchantId, product: Product, lang){
      if(!product.id){
        this.createProduct(merchantId, lang)
          .subscribe(productId => {
             console.log('in save product id ', productId)
             return this.updateProductAttributes(productId, product.attributes, lang)
          }
          )
      }
      return this.updateProductAttributes(product.id, product.attributes, lang)
    }


    updateProductAttributes(productId, attributes, lang: string): Observable<string> {

      return this.api.put(this.path + '/' + productId + '/attributes/', attributes, {}, lang)
        .map(result => {
          if (result.result === true) {
            return productId;
          } else {
            return null;
          }
        });
    }

}
