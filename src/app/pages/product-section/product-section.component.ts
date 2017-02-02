/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Product } from "../../commons/model/product";
import { ProductService } from "../../core/services/products/products-service";
import { AppState } from "../../shared/store/app-state";
import { productsLoadedAction } from "../../shared/store/actions";


@Component({
  selector: 'am-products-section',
  template: `
            <router-outlet></router-outlet>
`,

})
export class ProductSectionComponent implements OnInit {


  products$: Observable<Product[]>;

  constructor(private productsService: ProductService,
              private store: Store<AppState>) {

    // this.products$ = store.select(this.stateToProducts)

  }


  // stateToProducts(state: AppState): Product[] {
  //
  //   const products = _.values<Product>(state.storeData.products);
  //
  //   return products.map(_.partial(this.mapProductToProduct, state));
  //
  // }
  //
  // mapProductToProduct(state: AppState, product: Product): Product {
  //
  //   return {
  //     id: product.id
  //   }
  // }

  ngOnInit() {

    this.productsService.getProducts(4,'3')
      .subscribe(
        allUserData => this.store.dispatch(
          new productsLoadedAction(allUserData)
        )
      )

  }

}
