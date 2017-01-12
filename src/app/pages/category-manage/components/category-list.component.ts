/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input } from '@angular/core';
import { CategoryService } from '../../../core/services/categories/category.service';
import { EmitterService } from '../../product-manage/emitter.service';
import { Category } from '../../../commons/model/category';


@Component({

  selector: 'am-category-list',
  template: require('./category-list.html'),
  styles: [`
    .category-search {
      margin: 5px;
      padding: 2px;
    }

    .category-card  {
      margin: 0px;
      padding: 2em;
    }  
  `],
})
export class CategoryListComponent {

  constructor(private categorieService: CategoryService) {

  }

  categories: Category[] = [];

  @Input() listId: string;
  @Input() editId: string;
  @Input() language: any;

  lang: any;

  ngOnInit() {
    // Load categories
    this.loadCategories()

  }

  loadCategories() {
    // Get all categories
    this.categorieService.getCategories(this.language)
      .subscribe(resp => {
        this.categories = resp.content
      })
  }

  ngOnChanges(changes: any) {

    if (changes.language.currentValue) {
      this.language = changes.language.currentValue;
    }

    this.loadCategories();

    EmitterService.get(this.listId).subscribe((comments: Comment[]) => {
      this.loadCategories()
    });
  }

}
