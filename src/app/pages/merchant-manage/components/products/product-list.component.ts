/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { ProductVM } from "./model/product.vm";
import { productsLoadedAction, LoadProductsAction, ProductDeleteAction } from "../../../../shared/store/actions";
import { AppState } from "../../../../shared/store/app-state";
import { Product, MediaResources } from "../../../../commons/model/product";
import { ProductService } from "../../../../core/services/products/products-service";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'am-product-card',
  template: `
<div class="col-sm-10">
  <div class="card card-block">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">{{product.description }}</p>
    <a class="btn btn-primary" [routerLink]="[product.id]" routerLinkActive="active">Edit</a>
    <a class="btn btn-primary" (click)="onClickDelete(product.id)">Delete</a>
  </div>
</div>
`
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductVM;
  @Input() lang: string = 'en';
  @Output() deleteProduct = new EventEmitter();

  constructor() {
  }


  onClickDelete(productId: number){
    this.deleteProduct.emit(productId)
  }

  ngOnInit() {

  }

}


@Component({
  selector: 'am-product-list',
  template: `product list
<am-product-card *ngFor="let product of (products$ | async)" 
          [product]="product"  
          (deleteProduct)="onDeleteProduct($event)"
          ></am-product-card>`
})
export class ProductListComponent implements OnInit {

  products$: Observable<ProductVM[]>;


  constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    this.products$ = store.select(this.stateToProducts)

  }


  stateToProducts(state: AppState): ProductVM[] {

    const products = state.storeData.products.content;

    return products.map(
      product => {
        return {
          available: product.available,
          brand: product.brand,
          defaultProductImageUrl: product.defaultProductImageUrl,
          description: product.description,
          discountedPrice: product.discountedPrice,
          id: product.id,
          imageUrl: product.imageUrl,
          marketingAttribute: product.marketingAttribute,
          merchantId: product.merchantId,
          name: product.name,
          packageType: product.packageType,
          price: product.price,
        }
      }
    );

  }

  onDeleteProduct(productId:number){
    console.log('onDelete', productId)
    this.store.dispatch(new ProductDeleteAction(productId))
  }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      if (params['merchantId']) {

        let payload = {
          merchantId : params['merchantId']
        };
        this.store.dispatch(new LoadProductsAction(payload))
      }
    });



  }
}
