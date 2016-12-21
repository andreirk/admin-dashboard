import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { CategoryService } from './category.service'
import { EmitterService } from '../../emitter.service';
import { StringListFilter } from './../../../../theme/pipes';
import { layoutPaths } from '../../../../theme/theme.constants';
import { Category } from './model/category';


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

  categories: Category[] = []

  @Input() listId: string;
  @Input() editId: string;
  @Input() language: any;  

  lang: any;

  ngOnInit(){
    // Load categories
    this.loadCategories()
     
  }

  loadCategories(){
      // Get all categories
        this.categorieService.getCategories(this.language)
          .subscribe(resp => {
            this.categories = resp.content
        })
  }

  ngOnChanges(changes:any) {

    if(changes.language.currentValue ){
      this.language = changes.language.currentValue.new
    }

    this.loadCategories()
    
    EmitterService.get(this.listId).subscribe((comments:Comment[]) => {this.loadCategories()});
  }

}