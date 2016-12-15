import { Component, EventEmitter, Input, OnChanges } from '@angular/core';

import { NgForm }    from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { EmitterService } from '../../emitter.service';
import { Category } from './category';
import { CategoryService }    from './category.service';
import { CategoryCardComponent } from './category-card.component'

@Component({

  selector: 'toyou-category-form',
  templateUrl: 'category-form.1.html',
  styles: [
      `
       .no-style .ng-valid {
          border-left: 1px  solid #CCC
        }

      .no-style .ng-invalid {
          border-left: 1px  solid #CCC
        }
      `
  ]
})
export class CategoryFormComponent {

  constructor(
    private categoryService: CategoryService
    ){}

  @Input() editId: string;
  @Input() listId: string;
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:any = {
     url: '/catalog/mgmt/v1/upload-image?folder=CATEGORIES',
     customHeaders:[ { 'Authorization': 'Basic ' + btoa('admin:0000')}
     ,{'Accept': 'application/json'}],
     multipart: false
  };

  // public description: string,
  // public imageUrl: string,
  // public name: string,
  // public sectionType?: string,
  // public sortOrder?: number,
  // public type?: string
  private model = new Category('', '', '', 'deals', 0, 'REGULAR');

  private editing = false;     


  submitted = false;





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
    categoryOperation.subscribe(
                            categorys => {
                                // Emit list event
                                EmitterService.get(this.listId).emit(categorys);
                                // Empty model
                                this.model = new Category('', '', '', 'deals', 0, 'REGULAR');
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
        this.model =  new Category('', '', '', 'deals', 0, 'REGULAR');
        this.editing = false;
    }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // newCategory() {
  //   this.model = new Category('cat from form unother', 'image url', 'name here', 'selection', 0, "REGULAR");
  // }
  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(categoryForm)}}


  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value && form.valid; // Dr. IQ
  }

  /////////////////////////////

}