import { Component } from '@angular/core';
import { ChangeLangEvent } from '../../../shared/components/select-lang.component';


@Component({
//   selector: 'toyou-category',
  styles: [],
  template: require('./category.component.html'),
})
export class CategoryComponent {
    private listId = 'CATEGORY_COMPONENT_LIST';
    private editId = 'CATEGORY_COMPONENT_EDIT';
    private changedLangObj: string = 'en';


    onChangeLanguage(event : ChangeLangEvent) {
      this.changedLangObj = event.lang;
    }
}
