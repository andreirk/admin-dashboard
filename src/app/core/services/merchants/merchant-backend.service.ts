/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from '../../../commons/model/merchant';
import { BackendApiService } from '../backend-api.service';
import { RootCategory } from '../../../commons/model/root-category';
import { MerchantLinkableRootCategories } from '../../../shared/constants';
import { RootCategoryService } from '../root-categories/root-category.service';
import { Page } from '../../../commons/model/page';
import {Pos} from "../../../commons/model/pos";
import { Product } from "../../../commons/model/product";
import { ProductOption, ProductOptionValue } from '../../../commons/model/product-option';

@Injectable()
export class MerchantBackendService {
  private path: string = '/catalog/mgmt/v1/merchants';

  constructor(private backendApi: BackendApiService,
              private rootCategoryService: RootCategoryService) {
  }

  getPage(page: number, size: number, lang: string, filterParams: any): Observable<Page<Merchant>> {
    return this.backendApi.get(this.path,
      Object.assign({
        'page': String(page),
        'size': String(size),
        'sort': 'name'
      }, filterParams),
      lang);
  }


  get(id: string, lang: string): Observable<Merchant> {
    return this.backendApi.get(this.path + '/' + id, {}, lang);
  }

  deleteOne(id): Observable<any> {
    return this.backendApi.delete(this.path + '/' + id);
  }

  save(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    if (merchantBackend.id) {
      return this.update(merchantBackend, lang);
    } else {
      return this.create(merchantBackend, lang);
    }
  }

  create(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    return this.backendApi.post(this.path, merchantBackend, {}, lang);
  }

  update(merchantBackend: Merchant, lang: string): Observable<Merchant> {
    return this.backendApi.put(this.path + '/' + merchantBackend.id, merchantBackend, {}, lang);
  }

  getLinkedRootCategoryIds(id: string): Observable<string[]> {
    return this.backendApi.get(this.path + '/' + id + '/rootcategories', {}, 'en')
      .map(rootCategories => rootCategories.map(rootCategory => rootCategory.id));
  }

  getAvailableRootCategories(lang: string): Observable<RootCategory[]> {
    return this.rootCategoryService.getList(lang)
      .map(rootCategories => rootCategories.filter(
        rootCategory => MerchantLinkableRootCategories.indexOf(rootCategory.type) >= 0 && rootCategory.name
      ));
  }

  updateLinkedRootCategories(merchantId: string, linkedRootCategoryIds: string[], linkedRootCategoryIdsOriginal: string[]): Observable<string[]> {
    let addRootCategoryIds = linkedRootCategoryIds.filter(id => linkedRootCategoryIdsOriginal.indexOf(id) < 0);
    let removeRootCategoryIds = linkedRootCategoryIdsOriginal.filter(id => linkedRootCategoryIds.indexOf(id) < 0);

    let observables: Observable<any>[] = [];
    addRootCategoryIds.forEach(id => {
      observables.push(this.rootCategoryService.linkMerchant(id, merchantId));
    });
    removeRootCategoryIds.forEach(id => {
      observables.push(this.rootCategoryService.unlinkMerchant(id, merchantId));
    });
    return Observable.combineLatest(observables, () => linkedRootCategoryIds);
  }

  getMerchantsPos(merchantId: string, lang: string): Observable<Pos[]> {
    return this.backendApi.get(this.path + '/' + merchantId + '/pos', {}, lang);
  }

  createMerchantsPos(merchantId: string, pos: Pos, lang: string): Observable<any> {
    return this.backendApi.post(this.path + '/' + merchantId + '/pos', pos, {}, lang);
  }

  createMerchantsProduct(merchantId: string, lang: string): Observable<any> {
    return this.backendApi.post(this.path + '/' + merchantId + '/products', null, {}, lang);
  }



  /**
   *
   * /////// ProductOptions //////////
   */

  updateMerchantProductOption(merchantId: string, productOption: ProductOption, lang: string){
    return this.backendApi.put(this.path + '/' + merchantId + '/productoptions/' + productOption.id, productOption, {}, lang);
  }

  createMerchantProductOption(merchantId: string, productOption: ProductOption, lang: string){
    return this.backendApi.post(this.path + '/' + merchantId + '/productoptions', productOption,  {}, lang);
  }

  getMerchantProductOptionsList(merchantId: string, lang: string): Observable<Page<ProductOption>> {
    return this.backendApi.get(this.path + '/' + merchantId + '/productoptions', {}, lang);
  }

  getMerchantProductOptionOne(merchantId: string, productOptionId: string, lang: string): Observable<ProductOption> {
    return this.backendApi.get(this.path + '/' + merchantId + '/productoptions/' + productOptionId, {}, lang);
  }

  deleteMerchantProductOption(merchantId: string, productOptionId: string): Observable<ProductOption> {
    return this.backendApi.delete(this.path + '/' + merchantId + '/productoptions/' + productOptionId);
  }

  getProductOptionValues(merchantId, productOptionId, currency, lang){
    return this.backendApi.get(this.path + '/' + merchantId + '/productoptions/' + productOptionId + '/productoptionvalues', {currency}, lang);
  }

  updateProductOptionValue(merchantId, productOptionId, productOptionValue, currency, lang){
    let path = this.path + '/' + merchantId + '/productoptions/' + productOptionId + '/productoptionvalues';
    return this.backendApi.put(path, productOptionValue, {currency}, lang);
  }

  createProductOptionValue(merchantId: string, productOptionId: string, productOptionValue: ProductOptionValue, currency, lang){
    let path = this.path + '/' + merchantId + '/productoptions/' + productOptionId + '/productoptionvalues';
    return this.backendApi.post(path, ProductOptionValue,  {currency}, lang);
  }

}
