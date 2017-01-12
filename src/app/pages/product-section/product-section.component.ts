/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ProductVM } from "./model/product.vm";
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


  products: Observable<ProductVM[]>;

  constructor(private productsService: ProductService,
              private store: Store<AppState>) {

    this.products = store.select(this.stateToProducts)

  }


  stateToProducts(state: AppState): ProductVM[] {

    const products = _.values<Product>(state.storeData.products);

    return products.map(_.partial(this.mapProductToProductVM, state));

  }

  mapProductToProductVM(state: AppState, product: Product): ProductVM {

    return {
      id: product.id
    }
  }

  ngOnInit() {

    this.productsService.getProducts()
      .subscribe(
        allUserData => this.store.dispatch(
          new productsLoadedAction(allUserData)
        )
      )

  }

}
