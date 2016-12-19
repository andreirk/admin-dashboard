import { Component } from '@angular/core';


@Component({
//   selector: 'toyou-category',
  styles: [],
  template: require('./category.component.html'),
})
export class CategoryComponent {
    private listId = 'CATEGORY_COMPONENT_LIST';
    private editId = 'CATEGORY_COMPONENT_EDIT'; 
    private changedLangObj = 'CATEGORY_LANGUAGE_ID'


    onChangeLanguage(event){
      console.log(event)
      this.changedLangObj = event;
    }
}
