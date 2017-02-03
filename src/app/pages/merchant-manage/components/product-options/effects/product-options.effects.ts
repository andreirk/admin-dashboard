/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../store/index';
import { ProductOptionActions } from '../actions/product-option.actions';
import { MerchantBackendService } from '../../../../../core/services/merchants/merchant-backend.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductOptionsEffects {

  constructor (
    private update$: Actions,
    private productOptionActions: ProductOptionActions,
    private productOptionsService: MerchantBackendService,
    private store: Store<MerchantProductAppState>,
) {}

@Effect() getProductOptionList$ = this.update$
  .ofType(ProductOptionActions.GET_PRODUCT_OPTION_LIST)
  .map(action => action.payload)
  .debug('Action payload recieved')
  .switchMap((payload) => this.productOptionsService.getMerchantProductOptionsList(payload.merchantId, payload.lang))
  .map(productOptions => this.productOptionActions.getProductOptionListSuccess(productOptions));


@Effect() getProductOption$ = this.update$
  .ofType(ProductOptionActions.GET_A_PRODUCT_OPTION)
  .map(action => {

    return action.payload
  })
  .switchMap(payload => {

    let productOptionId = payload.productOptionId;
    let merchantId = payload.merchantId;
    let currency = payload.currency;
    let lang = payload.lang;

    let productOption = this.productOptionsService.getMerchantProductOptionOne(payload.merchantId, payload.productOptionId, payload.lang)

    let values = this.productOptionsService.getProductOptionValues(merchantId, productOptionId, currency, lang)
      .map(valuesPage => valuesPage.content);

    return Observable.combineLatest(productOption, values)
      .map(results => ({productOption:results[0], values:results[1]}))
  })
  .map(productOptionWithValues => {

    return this.productOptionActions.getProductOptionOneSuccess(productOptionWithValues)
  });


@Effect() saveProductOption$ = this.update$
  .ofType(ProductOptionActions.SAVE_PRODUCT_OPTION)
  .map(action => {

    return action.payload }
  )
  .withLatestFrom(this.store, (payload, state) => ({payload, state}))
  .switchMap(({payload, state}) => {

      const originalProductOption = state.productOption;
      const updatedProductOption  = payload.productOption;
      const valuesToDelete = payload.productValuesToDelete;
      const merchantId = payload.merchantId;
      const lang = payload.lang;

      if( _.isEqual(originalProductOption, updatedProductOption)){
        return;
      }

      let itemsToSyncronizeWithBackend = [];

      // delete productOptions values
      valuesToDelete.forEach((value, index, arr) => {
        if(value.id) {
          itemsToSyncronizeWithBackend.push(this.productOptionsService.deleteProductOptionValue(value));
        }
      });

      // update productOption main fields
      if(updatedProductOption.id) {
          itemsToSyncronizeWithBackend.push( this.productOptionsService.updateMerchantProductOption(merchantId, updatedProductOption, lang) );
        } else {
          itemsToSyncronizeWithBackend.push( this.productOptionsService.createMerchantProductOption(merchantId, updatedProductOption, lang) );
      };

      // update or create product options values
      updatedProductOption.values.forEach((value, index, arr) => {
        if (value.id){
          let valueToUpdate$ = this.productOptionsService.updateProductOptionValue(value);
          itemsToSyncronizeWithBackend.push( valueToUpdate$ );
        } else {
          let valueToCreate$ = this.productOptionsService.createProductOptionValue(value);
          itemsToSyncronizeWithBackend.push( valueToCreate$ );
        });
      })  ;





      // proccess all async
      return Observable.combineLatest(itemsToSyncronizeWithBackend);

  })
  .map(result => this.productOptionActions.saveProductOptionSuccess(result));



@Effect() deleteProductOption$ = this.update$
  .ofType(ProductOptionActions.DELETE_PRODUCT_OPTION)
  .map(action => action.payload)
  .withLatestFrom(this.store, (productOptionId, state) => ({productOptionId, state}))
  .switchMap(({productOptionId, state}) => {

      const merchantId = state.merchant.id;

      return this.productOptionsService.deleteMerchantProductOption(merchantId, productOptionId)
  })
  .map(productOption => this.productOptionActions.deleteProductOptionSuccess(productOption));

}
