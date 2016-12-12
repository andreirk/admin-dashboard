import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'am-category-card',
  // styles: [require('./product.style.css')],
  template: `
            <div class="col-sm-10" (click)="onCategoryClick($event)">
              <div class="card card-block">
                <h5 class="card-title">Category id {{category.id}}</h5>
                <p class="card-text">Short description.</p>
                <a href="#" class="btn btn-primary">Edit</a>
              </div>
            </div>     
  `
})
export class CategoryCardComponent {
  @Input() category = {};
  @Output() checked = new EventEmitter()
  showCheck: boolean = false;

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  onChecked() {
    this.checked.next(this.category); 
  }

  onCategoryClick(event){
    alert(this.category);
  }
}