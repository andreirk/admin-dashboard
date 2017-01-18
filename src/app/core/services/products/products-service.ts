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
    path: string = '/catalog/mgmt/v1/products';
    lang = 'en';

    constructor(private api: ApiService,
                private merchantBackendApi: MerchantBackendService){
    }


    createProduct(merchantId,  lang): Observable<string> {
      return this.merchantBackendApi.createMerchantsProduct(merchantId, lang)
        .map(result => result.id);
    }

    getOne(id: string, options = {}, lang: string): Observable<Product> {
      return this.api.get(this.path + '/' + id, options, lang);
    }

    getProducts(options = {}, lang){
        return this.api.get(this.path, options, lang)
    }

    getPage(page: number, size: number, lang: string, currency: Currency, filterParams: any): Observable<Page<Product>> {
      return this.api.get(this.path, Object.assign({ currency: currency }, filterParams) , this.lang)
    }

    deleteProduct(productID) {
        return this.api.delete(`${this.path}/${productID}`)
          .map(resp => resp.result);
    }

    saveProduct(merchantId, product: Product, productOriginal: Product, lang): any {
      if (!product.id || !_.isEqual(product, productOriginal)) {
        return this.save(merchantId, product, lang)
      } else {
        return Observable.of(product.id);
      }
    }

    save(merchantId, product: Product, lang): any{
      if(product.id){
        return this.updateProductAttributes(product.id, product.attributes, lang)
      }
      else {
        return this.createProduct(merchantId, lang)
          .switchMap(productId => {
             return this.updateProductAttributes(productId, product.attributes, lang)
          })
      }
    }

    updateProductAttributes(productId, attributes, lang: string): Observable<string> {
      return this.api.put(this.path + '/' + productId + '/attributes', attributes, {}, lang)
        .map(result => {
          if (result.success) {
            return productId;
          } else {
            return null;
          }
        },
          err => console.log('error', err)
        );
    }
}
