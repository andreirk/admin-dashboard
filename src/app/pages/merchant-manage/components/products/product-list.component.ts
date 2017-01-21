/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from "rxjs";
import { productsLoadedAction, LoadProductsAction, ProductDeleteAction } from "../../../../shared/store/actions";
import { AppState } from "../../../../shared/store/app-state";
import { Product, Tag, MediaResource } from "../../../../commons/model/product";
import { ProductService } from "../../../../core/services/products/products-service";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { ModalComponent } from "../../../../shared/components/modal.component";
import { ProductActions } from "./actions/product.actions";
import { MerchantProductAppState } from "./reducers/index";


@Component({
  selector: 'am-product-card',
  providers: [
    ProductService
  ],
  template: `
<div class="col-sm-10">
  <div class="card card-block">
    <h5 class="card-title">{{product.attributes.name}}</h5>
    <p class="card-text">{{product.attributes.description }}</p>
    <a class="btn btn-primary" [routerLink]="[product.id]" routerLinkActive="active">Edit</a>
    <a style="float: right" class="btn btn-primary" (click)="modal.show()">Delete</a>    
  </div>
  <am-app-modal>
    <div class="app-modal-body">
      <h5 class="modal-title" id="deleteModalLabel">Delete this Product?</h5>
    </div>
    <div class="app-modal-footer">
      <button type="button" class="btn btn-primary" (click)="onClickDelete(product.id)">Confirm</button>
      <button type="button" class="btn btn-secondary" (click)="modal.hide()">Cancel</button>
    </div>
  </am-app-modal>  
</div>
`
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() lang: string = 'en';
  @Output() deleteProduct = new EventEmitter();

  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  constructor(private productService: ProductService) {
  }

  onClickDelete(productId: number){
    this.deleteProduct.emit({ value: productId })
  }

  ngOnInit() {

  }

}


@Component({
  selector: 'am-product-list',
  template: `
   <div class="col-sm-3 card-block"> 
    <a class="btn btn-primary align-bottom" [routerLink]="['new']"
        routerLinkActive="active">New Product</a>
   </div>
   
  <am-product-card *ngFor="let product of (products$ | async)" 
          [product]="product"  
          (deleteProduct)="onDeleteProduct($event)"
          >
  </am-product-card>`
})
export class ProductListComponent implements OnInit {

  products$: Observable<any>;
  private lang: string = 'en';
  private merchantId: string;

  constructor(private route: ActivatedRoute,
              private store: Store<MerchantProductAppState>,
              private productService: ProductService,
              private productActions: ProductActions
  ) {

     this.products$ = store.select('products');
     this.products$
       .subscribe(
         products => console.log('!!!get products', products)
       )

  }


  // stateToProducts(state: AppState): Product[] {
  //
  //   const products = state.storeData.products.content;
  //
  //   return products.map(
  //     product => {
  //
  //       const newProduct = new Product(
  //         product.attributes,
  //         product.available,
  //         product.categoryId,
  //         product.groupIds,
  //         product.description,
  //         product.imageUrl,
  //         product.marketingAttribute,
  //         product.mediaResources,
  //         product.merchantId,
  //         product.name,
  //         product.packageType,
  //         product.price,
  //         product.tagValues,
  //         product.tags,
  //         product.upc,
  //         product.defaultProductImageUrl,
  //         product.id
  //       );
  //
  //       // newProduct.id = product.id;
  //       // newProduct.available = product.available;
  //       // newProduct.description = product.description;
  //       // newProduct.id = product.id;
  //       // newProduct.imageUrl = product.imageUrl;
  //       // newProduct.marketingAttribute = product.marketingAttribute;
  //       // newProduct.name = product.name;
  //       // newProduct.price = product.price;
  //
  //       return newProduct;
  //
  //     }
  //   );
  //
  // }

  onDeleteProduct(event){
    // this.products$ = this.products$.filter(product => product.id != event.value);

    this.store.dispatch( this.productActions.deleteProduct(event.value))
  }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {

      if (params['merchantId']) {
        console.log('merchant id', params['merchantId'])
        this.merchantId = params['merchantId'];
        let payload = {
          merchantId : params['merchantId'],
          'currency' : 'USD',
          'available' : true,
          'page': 0,
          'size': 20,
          'sort': 'name',
          'lang': this.lang
        };
      //  this.loadMerchantProductList();
        this.store.dispatch(this.productActions.loadProducts(payload));
      }
    });

  }

  loadMerchantProductList() {
    console.log('merchantID: ', this.merchantId);
    if (this.merchantId) {
      const options = {
        merchantId: this.merchantId,
        currency : 'USD',
      };
      this.productService.getProducts( options, this.lang )
        .subscribe(products => {
          this.products$ = products.content;
        })

    }
  }
}