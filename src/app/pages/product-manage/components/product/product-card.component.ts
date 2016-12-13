import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'am-product-card',
  // styles: [require('./product.style.css')],
  template: `
            <div class="col-sm-10" (click)="onProductClick($event)">
              <div class="card card-block">
                <h5 class="card-title">Product id {{product.id}}</h5>
                <p class="card-text">Short description.</p>
                <a href="#" class="btn btn-primary">Edit</a>
              </div>
            </div>     
  `
})
export class ProductCardComponent {
  @Input() product = {};
  @Output() checked = new EventEmitter()
  showCheck: boolean = false;

  toggleCheck() {
    this.showCheck = !this.showCheck;
  }

  onChecked() {
    this.checked.next(this.product); 
  }

  onProductClick(event){
    alert(this.product)
  }
}