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


@Component({
 
  selector: 'am-category-list',
  template: require('./category-list.html'),
  styles: [`
    .category-search {
      margin-bottom: 2px;
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

  categories = []

  @Input() listId: string;
  @Input() editId: string;

  ngOnInit(){
    // Load categories
    this.loadCategories()
  }

  loadCategories(){
      // Get all categories
        this.categorieService.getCategories()
          .subscribe(resp => {
            this.categories = resp.content
            console.log('this are categories', this.categories)  
        })
  }

  ngOnChanges(changes:any) {
    // Listen to the 'list'emitted event so as populate the model
    // with the event payload
    EmitterService.get(this.listId).subscribe((comments:Comment[]) => {this.loadCategories()});
}

}