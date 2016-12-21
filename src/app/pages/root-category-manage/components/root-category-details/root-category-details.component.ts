/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild } from '@angular/core';
import { RootCategoryService } from '../../services/root-category.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RootCategory } from '../../model/root-category';
import { ChangeLangEvent } from '../../../../shared/components/select-lang.component';

@Component({
  selector: 'am-root-category-details',
  providers: [
    RootCategoryService
  ],
  template: require('./root-category-details.component.html')
})
export class RootCategoryDetailsComponent {
  @ViewChild('rootCategoryForm') form;

  private rootCategoryId: string;
  private lang: string = 'en';
  private rootCategory: RootCategory = new RootCategory();
  private rootCategoryOriginal: RootCategory = new RootCategory();
  private wasModified: boolean = false;
  private rtlDetect = require('rtl-detect');

  constructor(private route: ActivatedRoute,
              private rootCategoryService: RootCategoryService) {
  }

  ngOnInit() {
    const vm = this;
    vm.rootCategoryId = vm.route.snapshot.params['rootCategoryId'];

    if (vm.rootCategoryId !== 'new') {
      vm.changeLang(false, vm.lang);
    }
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.rootCategory, vm.rootCategoryOriginal);
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
    let observ: Observable<RootCategory>;
    if (save && prevLang) {
      observ = vm.rootCategoryService.save(vm.rootCategory, prevLang).mergeMap(rootCategory => {
        vm.rootCategoryId = rootCategory.id;
        return vm.rootCategoryService.get(vm.rootCategoryId, lang);
      });
    } else {
      observ = vm.rootCategoryService.get(vm.rootCategoryId, lang);
    }

    observ.subscribe((rootCategory: RootCategory) => {
      vm.rootCategory = rootCategory;
      vm.rootCategoryOriginal = _.cloneDeep(rootCategory);
      vm.lang = lang;
    });
  }

  onUploadImage(event) {
    this.rootCategory.imageUrl = event.imageUrl;
    this.wasModified = true;
  }

  saveRootCategory() {
    const vm = this;
    vm.rootCategoryService.save(vm.rootCategory, vm.lang).subscribe(
      merchant => {
        vm.rootCategory = merchant;
        vm.rootCategoryOriginal = _.cloneDeep(merchant);
        vm.wasModified = false;
      }
    );
  }
}
