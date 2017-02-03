/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ChangeLangEvent } from '../../../../shared/components/select-lang.component';
import { MerchantViewModel } from '../../model/merchant-view-model';
import { MerchantViewModelService } from '../../services/merchant-view-model.service';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../store/index';
import { MerchantActions } from '../../actions/merchant-actions';

@Component({
  selector: 'am-merchant-details',
  providers: [
    MerchantViewModelService
  ],
  styleUrls: ['../style'],
  template: require('./merchant-details.component.html')
})
export class MerchantDetailsComponent {
  @ViewChild('merchantForm') form;

  private lang: string = 'en';
  private merchantId: string;
  private viewModel: MerchantViewModel = new MerchantViewModel();
  private viewModelOriginal: MerchantViewModel = new MerchantViewModel();
  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private merchantVmService: MerchantViewModelService,
    private store: Store<MerchantProductAppState>,
    private merchantActions: MerchantActions) {
    }

  ngOnInit() {
    const vm = this;
    vm.route.parent.params.subscribe(params => {
      if (params['merchantId']) {
        vm.merchantId = params['merchantId'];
        if (vm.merchantId !== 'new') {
          vm.changeLang(false, vm.lang);
        }
      }
    });
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.viewModel, vm.viewModelOriginal);
      });
  }

  get langDirection() {
    return this.rtlDetect.getLangDir(this.lang);
  }

  onChangeLang(event: ChangeLangEvent) {
    this.changeLang(event.save, event.lang, event.prevLang);
  }

  changeLang(save: boolean, lang: string, prevLang?: string) {
    const vm = this;
    let observMerchantId: Observable<string>;
    if (save && prevLang) {
      observMerchantId = vm.merchantVmService.save(vm.viewModel, vm.viewModelOriginal, prevLang).map(viewModel => viewModel.merchant.id);
    } else {
      observMerchantId = Observable.of(vm.merchantId);
    }

    observMerchantId.mergeMap(merchantId => {
      return vm.merchantVmService.get(merchantId, lang);
    }).subscribe((viewModel: MerchantViewModel) => {
      let payload = {
        id:viewModel.merchant.id
      };
      this.store.dispatch(this.merchantActions.getMerchantSuccess(payload));
      vm.merchantId = viewModel.merchant.id;
      vm.viewModel = viewModel;
      vm.viewModelOriginal = _.cloneDeep(viewModel);
      vm.lang = lang;
      vm.router.navigate(['../../', vm.viewModel.merchant.id, 'general'], {relativeTo: this.route});
    });
  }

  saveMerchant() {
    const vm = this;

    vm.merchantVmService.save(vm.viewModel, vm.viewModelOriginal, vm.lang).subscribe(
      viewModel => {
        vm.viewModel = viewModel;
        vm.viewModelOriginal = _.cloneDeep(viewModel);
        vm.wasModified = false;
        vm.router.navigate(['../../', vm.viewModel.merchant.id, 'general'], {relativeTo: this.route});
      }
    );

  }
}
