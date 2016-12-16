import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';

import { NgForm }    from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { EmitterService } from '../../emitter.service';
import { Category } from './model/category';
import { CategoryService }    from './category.service';
import { CategoryCardComponent } from './category-card.component'



@Component({

  selector: 'toyou-category-form',
  templateUrl: 'category-form.html',
  styles: [`
       .no-style .ng-valid {
          border-left: 1px  solid #CCC
        }

      .no-style .ng-invalid {
          border-left: 1px  solid #CCC
        }
      `]
})
export class CategoryFormComponent {

  constructor(
    private categoryService: CategoryService,
    // private model : Category
    ){}

  private editing = false;   
  private model =  new Category('', '', '','', 'deals', 0, 'REGULAR')

  @Input() editId: string;
  @Input() listId: string;


  @Input() changedLang: Object;  

  OnInit()  {
      this.model = new Category('', '', '','', 'deals', 0, 'REGULAR')
  }

  public uploaderOptions:any = {
     url: '/catalog/mgmt/v1/upload-image?folder=CATEGORIES',
     customHeaders:[ { 'Authorization': 'Basic ' + btoa('admin:0000')}
     ,{'Accept': 'application/json'}],
     multipart: false
  };

  onUpload(data){
    let imageUrl = JSON.parse(data.response).imageUrl;
    if (imageUrl) {
        this.model.imageUrl = imageUrl;
    }
    
  }  

  submitCategory(){
    // Variable to hold a reference of addCategory/updateCategory
    let categoryOperation: Observable<Category[]>;

    if(!this.editing){
        // Create a new Category
        categoryOperation = this.categoryService.addCategory(this.model)
    } else {
        // Update an existing Category
        categoryOperation = this.categoryService.updateCategory(this.model)
    }

    // Subscribe to observable
    categoryOperation
        .subscribe(
            categorys => {
                // Emit list event
                EmitterService.get(this.listId).emit(categorys);
                // Empty model
                this.model = new Category('', '', '','', 'deals', 0, 'REGULAR')
                // Switch editing status
                if(this.editing) this.editing = !this.editing;
            }, 
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    ngOnChanges() {
        // Listen to the 'edit'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.editId).subscribe((category:Category) => {
            this.model = category
            this.editing = true;
        });
    }

    cleanForm(){
        this.model =  new Category('', '', '','', 'deals', 0, 'REGULAR')
        this.editing = false;
    }

  /////////////////////////////
}