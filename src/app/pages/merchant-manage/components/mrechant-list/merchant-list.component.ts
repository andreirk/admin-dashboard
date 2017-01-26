/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MerchantListService } from '../../services/merchant-list.service';
import { MerchantBackendService } from '../../../../core/services/merchants/merchant-backend.service';
import { BackendApiService } from '../../../../core/services/backend-api.service';
import { ViewList } from '../../../../commons/model/view-list';
import { Merchant } from '../../../../commons/model/merchant';
import { MerchantFilterParams } from '../../model/merchant-filter-params';
import { MerchantFilterParamsForm } from '../../model/merchant-filter-params-form';
import { MerchantFilteringService } from '../../services/merchant-filtering.service';

@Component({
  selector: 'am-merchant-list',
  providers: [
    BackendApiService,
    MerchantBackendService,
    MerchantListService
  ],
  template: require('./merchant-list.component.html')
})
export class MerchantListComponent implements OnInit, AfterViewInit {
  @ViewChild('merchantsFilterForm') form;

  private merchants: ViewList<Merchant> = new ViewList<Merchant>();
  private lang: string = 'en';
  private pagesize = 5;

  private filterParams: MerchantFilterParams = new MerchantFilterParams();
  private filterParamsForm: MerchantFilterParamsForm = new MerchantFilterParamsForm();

  constructor(private merchantListService: MerchantListService,
              private merchantFilteringService: MerchantFilteringService) {
  }

  ngOnInit() {
    this.loadMoreMerchants();
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(400)
      .subscribe(values => {
        vm.filterParams = vm.merchantFilteringService.transformFilterParams(vm.filterParamsForm);
        vm.merchants = new ViewList<Merchant>();
        vm.loadMoreMerchants();
      });
  }


  loadMoreMerchants() {
    const vm = this;
    vm.merchantListService.loadMore(vm.merchants, vm.pagesize, vm.lang, vm.filterParams)
      .subscribe(merchantList => {
        vm.merchants = merchantList;
      });
  }

  deleteMerchant(event) {
    this.merchants = this.merchantListService.deleteOne(this.merchants, event.value);
  }

  clearFilters() {
    this.filterParamsForm = new MerchantFilterParamsForm();
  }
}
