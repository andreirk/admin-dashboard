/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { ElementRef, Component, Output, Input, EventEmitter } from "@angular/core";
import { CategoryService } from "../../../../core/services/categories/category.service";


@Component({
  selector: 'category-select',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="country" type="text" class="validate filter-input" [(ngModel)]=query (keyup)=filter()>
              <label for="country">Country</label>
            </div>

              <div class="form-group col-sm-3" [hidden]="showAlert">
                <select [(ngModel)]="query" 
                      class="form-control">
                  <option *ngFor="let item of categories;" 
                      class="dropdown-item" value="{{item.name}}">{{item.name}}</option>
                </select>
              </div>
        </div>  	
        `
})
export class AutocompleteComponent {
  @Input() lang;
  @Output() category = new EventEmitter();
  public query = '';
  public categories = [];
  public filteredList = [];
  public elementRef;


  constructor(myElement: ElementRef,
              private categoryService: CategoryService,) {
    this.elementRef = myElement;
  }

  ngOnInit(){
    this.getCategories('en')
  }

  getCategories(lang: string){
    this.categoryService.getCategories(lang)
      .subscribe(
        categories => {
          console.log('categories', categories);
          this.categories = categories.content;
        }
      )
  }

  filter() {
    if (this.query !== ""){
      this.filteredList = this.categories.filter(function(el){
        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
    }else{
      this.filteredList = [];
    }
  }

  select(item){
    this.query = item;
    this.filteredList = [];
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if(!inside){
      this.filteredList = [];
    }
  }

}
