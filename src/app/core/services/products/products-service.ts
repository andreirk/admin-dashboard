import { Injectable } from '@angular/core';
import { BackendApiService as ApiService } from '../backend-api.service';
import { Currency, MarketingAttributeType } from '../../../shared/types';
import { Observable } from 'rxjs';
import { Page } from '../../../commons/model/page';
import { Product, ProductAttributes, Price } from '../../../commons/model/product';
import { MerchantBackendService } from '../merchants/merchant-backend.service';

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

    getOne(id: string, lang: string, options = {}): Observable<Product> {
      return this.api.get(this.path + '/' + id, options, lang);
    }

    getProducts(options, lang): Observable<Page<Product>> {
        return this.api.get(this.path, options, lang)
    }

    getPage(page: number, size: number, lang: string, currency: Currency, filterParams: any): Observable<Page<Product>> {
      return this.api.get(this.path, Object.assign({ currency: currency }, filterParams) , this.lang)
    }

    deleteProduct(productID) {
        return this.api.delete(`${this.path}/${productID}`)
          .map(resp => resp.result ? productID : '' );
    }

    updateAttributes(product: Product,  lang: string): Observable<ProductAttributes> {

      return this.api.put(this.path + '/' + product.id + '/attributes', product.attributes, {}, lang)
        .map(result => {
            if (result.success) {
              return product.attributes;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    updateUpc(product: Product, lang){

      if(product.upc) {
        return this.api.put(this.path + '/' + product.id + '/upc', product.upc, {}, lang)
          .map(result => {
              if (result.success) {

                return product.upc;
              } else {
                return null;
              }
            },
            err => console.log('error', err)
          );
      }
    }


    updateCategory(product: Product, lang){

      return this.api.put(this.path + '/' + product.id + '/category', product.categoryId, {}, lang)
        .map(result => {
            if (result.success) {
              return product.categoryId;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    createOrUpdatePrice(product: Product, lang): Observable<Price> | null {

      return this.api.put(this.path + '/' + product.id + '/prices', product.price, {}, lang)
        .map(result => {
            if (result.success) {
              return product.price;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    updateGroups(product: Product, lang){

      return this.api.put(this.path + '/' + product.id + '/groups', product.groupIds, {}, lang)
        .map(result => {
            if (result.success) {
              return product.groupIds;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    updateTags(product: Product, lang){

      return this.api.put(this.path + '/' + product.id + '/tagValues', product.tagValues, {}, lang)
        .map(result => {
            if (result.success) {
              return product.tagValues;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    updateMainImage(product: Product, lang){
      return this.api.put(this.path + '/' + product.id + '/media/' + product.selectedImage.id + '/main', '', {}, lang )
        .map(result => {
            if (result.success) {
              return product.selectedImage.id;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    uploadMedia(product: Product, lang){
        return this.api.post(this.path + '/' + product.id + '/media-external' ,'', {url: product.imageUrl}, lang )
          .map(result => {
              if (result.success) {
                return product.imageUrl;
              } else {
                return null;
              }
            },
            err => console.log('error', err)
          );
      }


    updateAvailablity(product: Product, lang){

      const availablity = product.available  ? 'AVAILABLE' : 'UNAVAILABLE';
      return this.api.put(this.path + '/' + product.id + '/' + availablity, '', {}, lang)
        .map(result => {
            if (result.success) {
              return product.available;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }

    updateMarketingAttribute(product: Product, lang): Observable<MarketingAttributeType | string> | null {

      return this.api.put(this.path + '/' + product.id + '/marketingattribute/' + product.marketingAttribute, '', {}, lang)
        .map(result => {
            if (result.success) {
              return product.marketingAttribute;
            } else {
              return null;
            }
          },
          err => console.log('error', err)
        );
    }


    update(originalProduct: Product, updatedProduct: Product, lang){

      let fieldsToUpdate: Array<Observable<any>>  = this.addFieldsToUpdate(originalProduct, updatedProduct, lang);

      return Observable
        .combineLatest(fieldsToUpdate)
        .map(results => updatedProduct.id)

    }

    save(merchantId, originalProduct: Product, updatedProduct: Product,  lang): any {

        if(updatedProduct.id){

          return this.update(originalProduct, updatedProduct, lang);
        }
        else {
           const createdProductId$ =  this.createProduct(merchantId, lang);

          return createdProductId$
            .switchMap(productId => {
              updatedProduct.id = productId;

              let fieldsToUpdate: Array<Observable<any>>  = this.addFieldsToUpdate(originalProduct, updatedProduct, lang);

              return Observable
                     .forkJoin(fieldsToUpdate)
                     .map(results => updatedProduct.id)

            })
      }
    }

  /**
   *
   */
  addFieldsToUpdate(originalProduct: Product, editedProduct: Product, lang): Array<Observable<any>> {

    let fieldsToUpdate:Array<Observable<any>> = [];

    if(!_.isEqual(originalProduct.attributes, editedProduct.attributes )){
      fieldsToUpdate.push(this.updateAttributes(editedProduct, lang))
    }

    if( !_.isEqual(originalProduct.categoryId, editedProduct.categoryId) ){
      fieldsToUpdate.push(this.updateCategory(editedProduct, lang))
    }

    if(editedProduct.price){
      fieldsToUpdate.push(this.createOrUpdatePrice(editedProduct, lang))
    }

    if(!_.isEqual(originalProduct.groupIds, editedProduct.groupIds)){
      fieldsToUpdate.push(this.updateGroups(editedProduct, lang))
    }

    if(!_.isEqual(originalProduct.tagValues, editedProduct.tagValues)){
      fieldsToUpdate.push(this.updateTags(editedProduct, lang))
    }
    // if(!_.isEmpty(product.selectedImage)){
    //   fieldsToUpdate.push(this.updateMainImage(product, lang))
    // }

    if(!_.isEqual(originalProduct.available, editedProduct.available) ){
      fieldsToUpdate.push(this.updateAvailablity(editedProduct, lang))
    }

    if( !_.isEqual(originalProduct.marketingAttribute, editedProduct.marketingAttribute) ){
      fieldsToUpdate.push(this.updateMarketingAttribute(editedProduct, lang))
    }

    if( !_.isEqual(originalProduct.imageUrl, editedProduct.imageUrl) ){
      fieldsToUpdate.push(this.uploadMedia(editedProduct, lang))
    }

    if(!_.isEqual(originalProduct.upc, editedProduct.upc)){
      fieldsToUpdate.push(this.updateUpc(editedProduct, lang))
    }


    return fieldsToUpdate;
  }

  /////////////////////////
}
