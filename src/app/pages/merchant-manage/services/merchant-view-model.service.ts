/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { MerchantViewModel } from '../model/merchant-view-model';
import * as _ from 'lodash';
import { MerchantBackendService } from '../../../core/services/merchants/merchant-backend.service';
import { Merchant } from '../../../commons/model/merchant';
import { Observable } from 'rxjs';

@Injectable()
export class MerchantViewModelService {
  constructor(private merchantService: MerchantBackendService) {}

  combinePropertiesFunc = (merchant: Merchant, linkedRootCategoryIds: string[]): MerchantViewModel => {
    let resultViewModel: MerchantViewModel = new MerchantViewModel();
    resultViewModel.merchant = merchant;
    resultViewModel.linkedRootCategoryIds = linkedRootCategoryIds;
    return resultViewModel;
  };

  saveMerchant(merchant: Merchant, merchantOriginal: Merchant, lang: string): Observable<Merchant> {
    if (!merchant.id || !_.isEqual(merchant, merchantOriginal)) {
      return this.merchantService.save(merchant, lang);
    } else {
      return Observable.of(merchant);
    }
  }

  saveLinkedRootCategories(merchantId: string, linkedRootCategoryIds: string[], linkedRootCategoryIdsOriginal: string[]): Observable<string[]> {
    if (merchantId && !_.isEqual(linkedRootCategoryIds, linkedRootCategoryIdsOriginal)) {
      return this.merchantService.updateLinkedRootCategories(merchantId, linkedRootCategoryIds, linkedRootCategoryIdsOriginal);
    } else {
      return Observable.of(linkedRootCategoryIds);
    }
  }

  save(viewModel: MerchantViewModel, viewModelOriginal: MerchantViewModel, lang: string): Observable<MerchantViewModel> {
    const vm = this;
    let obsMerchant: Observable<Merchant> = vm.saveMerchant(viewModel.merchant, viewModelOriginal.merchant, lang);

    return vm.saveMerchant(viewModel.merchant, viewModelOriginal.merchant, lang).mergeMap(merchant => {
      return Observable.combineLatest(
        Observable.of(merchant),
        vm.saveLinkedRootCategories(merchant.id, viewModel.linkedRootCategoryIds, viewModelOriginal.linkedRootCategoryIds),
        vm.combinePropertiesFunc
      );
    });
  }

  get(merchantId: string, lang: string): Observable<MerchantViewModel> {
    const vm = this;
    let obsMerchant: Observable<Merchant> = vm.merchantService.get(merchantId, lang);
    let obsLinkedRootcategoryIds: Observable<string[]> = vm.merchantService.getLinkedRootCategoryIds(merchantId);
    return Observable.combineLatest(
      obsMerchant,
      obsLinkedRootcategoryIds,
      vm.combinePropertiesFunc
    );
  }
}
