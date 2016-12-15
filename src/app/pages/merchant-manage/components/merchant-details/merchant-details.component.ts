/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild } from "@angular/core";
import { MerchantBackendService } from "../../services/merchant-backend.service";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { BackendApiService } from "../../../../services/backend-api.service";
import { Merchant } from "../../model/merchant";
import { Observable } from "rxjs";
import { ChangeLangEvent } from "../../../../shared/components/select-lang.component";

@Component({
  selector: 'am-merchant-details',
  providers: [
    MerchantBackendService, BackendApiService
  ],
  template: require('./merchant-details.component.html')
})
export class MerchantDetailsComponent {
  @ViewChild('merchantForm') form;

  private lang: string = 'en';
  private merchantId: string;
  private merchant: Merchant = new Merchant();
  private merchantOriginal: Merchant = new Merchant();
  private wasModified = false;

  constructor(
    private route: ActivatedRoute,
    private merchantService: MerchantBackendService) {
  }

  ngOnInit() {
    const vm = this;
    vm.merchantId = vm.route.snapshot.params['merchantId'];

    if (vm.merchantId !== 'new') {
      vm.changeLang(false, vm.lang);
    }
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.merchant, vm.merchantOriginal);
      });
  }

  onChangeLang(event: ChangeLangEvent) {
    this.changeLang(event.save, event.lang, event.prevLang)
  }

  changeLang(save: boolean, lang: string, prevLang?: string) {
    const vm = this;
    let observ: Observable<Merchant>;
    if (save && prevLang) {
      observ = Observable.concat(
        vm.merchantService.save(vm.merchant, prevLang),
        vm.merchantService.get(vm.merchantId, lang)
      );
    } else {
      observ = vm.merchantService.get(vm.merchantId, lang);
    }

    observ.subscribe((merchant: Merchant) => {
      vm.merchant = merchant;
      vm.merchantOriginal = _.cloneDeep(merchant);
      vm.lang = lang;
    });
  }

  saveMerchant() {
    const vm = this;
    vm.merchantService.save(vm.merchant, vm.lang).subscribe(
      merchant => {
        vm.merchant = merchant;
        vm.merchantOriginal = _.cloneDeep(merchant);
        vm.wasModified = false;
      }
    );
  }

  onUploadImage(event) {
    this.merchant.imageUrl = event.imageUrl;
    this.wasModified = true;
  }

  onUploadDefaultProductImage(event) {
    this.merchant.defaultProductImageUrl = event.imageUrl;
    this.wasModified = true;
  }
}
