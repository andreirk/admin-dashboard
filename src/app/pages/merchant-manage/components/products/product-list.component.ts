/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { productsLoadedAction, LoadProductsAction, ProductDeleteAction } from "../../../../shared/store/actions";
import { AppState } from "../../../../shared/store/app-state";
import { Product, MediaResources, Tag, MediaResource } from "../../../../commons/model/product";
import { ProductService } from "../../../../core/services/products/products-service";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'am-product-card',
  providers: [
    ProductService
  ],
  template: `product card
<div class="col-sm-10">
  <div class="card card-block">
    <h5 class="card-title">{{product.attributes.name}}</h5>
    <p class="card-text">{{product.attributes.description }}</p>
    <a class="btn btn-primary" [routerLink]="[product.id]" routerLinkActive="active">Edit</a>
    <a class="btn btn-primary" (click)="onClickDelete(product.id)">Delete</a>
  </div>
</div>
`
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() lang: string = 'en';
  @Output() deleteProduct = new EventEmitter();

  constructor(private productService: ProductService) {
  }

  onClickDelete(productId: number){
    console.log('in onclick delete', productId)
    this.productService.deleteProduct(productId)
      .subscribe(
        res => {
          console.log('response from delete:', res)
         if (res) {
           this.deleteProduct.emit({ value: productId })
         }
        }
      )
  }

  ngOnInit() {
    console.log('in product card', this.product)
  }

}


@Component({
  selector: 'am-product-list',
  template: `
   <div class="col-sm-3"> 
    <a class="btn btn-primary align-bottom" [routerLink]="['new']"
        routerLinkActive="active">New Product</a>
   </div>
  <am-product-card *ngFor="let product of (products$)" 
          [product]="product"  
          (deleteProduct)="onDeleteProduct($event)"
          ></am-product-card>`
})
export class ProductListComponent implements OnInit {

  products$: Product[] = [];
  private lang: string = 'en';
  private merchantId: string;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private productService: ProductService) {

    // this.products$ = store.select(this.stateToProducts)

  }


  stateToProducts(state: AppState): Product[] {

    const products = state.storeData.products.content;

    return products.map(
      product => {

        const newProduct = new Product();

        newProduct.id = product.id;
        newProduct.available = product.available;
        newProduct.description = product.description;
        newProduct.discountedPrice = product.discountedPrice;
        newProduct.id = product.id;
        newProduct.imageUrl = product.imageUrl;
        newProduct.marketingAttribute = product.marketingAttribute;
        newProduct.name = product.name;
        newProduct.price = product.price;

        return newProduct;

      }
    );

  }

  onDeleteProduct(event){
    this.products$ = this.products$.filter(product => product.id != event.value);

    // this.store.dispatch(new ProductDeleteAction(productId))
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
        this.loadMerchantsProductList();
        // this.store.dispatch(new LoadProductsAction(payload))
      }
    });

  }

  loadMerchantsProductList() {
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
