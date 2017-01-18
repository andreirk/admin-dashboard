/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ChangeLangEvent } from '../../../../shared/components/select-lang.component';
import { ProductService } from "../../../../core/services/products/products-service";
import { Product } from "../../../../commons/model/product";
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { MarketingAttributeType } from "../../../../shared/types";
import { Category } from "../../../../commons/model/category";
import { CategoryService } from "../../../../core/services/categories/category.service";

@Component({
    selector: 'am-product-detail',
    styles: [``],
    template: `<h1>Product detail</h1>
#Product id : {{productId}}
<form #productForm="ngForm" class="merchant-details container">
  <div class="form-group row">
    <div class="col-sm-4">
      <button (click)="saveProduct()" class="btn btn-secondary" [hidden]="!wasModified">Save</button>
    </div>
  </div>
  
  autocomplite
  <category-select [lang]="lang" (category)="onCategorySelect($event)" ></category-select>
  <div class="row">
        <am-select-lang [lang]="'en'"
                        [wasModified]="wasModified"
                        (onChange)="onChangeLang($event)">            
        </am-select-lang>
  </div>
<accordion [closeOthers]="true">
  <accordion-group heading="General" [isOpen]="true" >

        
          <div class="row">
            <div class="form-group col-sm-3">
              <label>Product main Image</label>
              <am-upload-image name="imageUrl"
                     [folder]="'PRODUCTS'"
                     [(ngModel)]="product.imageUrl">       
              </am-upload-image>
            </div>
          </div>
        
          <div class="form-group">
            <label class="checkbox-inline custom-checkbox nowrap">
              <input type="checkbox" class="form-control" name="enabled" [(ngModel)]="product.available">
              <span>Product available</span>
            </label>
          </div>
          
          <div class="row">
            <div class="form-group col-sm-6">
              <label>Name</label>
              <input type="text" class="form-control" name="name" [(ngModel)]="product.attributes.name" [ngStyle]="{'direction': langDirection}">
            </div>
          </div>
          
            <div class="row">
            <div class="form-group col-sm-6">
              <label>Description</label>
              <textarea type="text" class="form-control" name="desc" [(ngModel)]="product.attributes.description" [ngStyle]="{'direction': langDirection}">
              </textarea>
            </div>
          </div>
  </accordion-group>
  
  <accordion-group heading="Marketing">
     <div class="row">
          <div class="form-group col-sm-3">
            <label>Marketing Attribute</label>
            <select [(ngModel)]="product.marketingAttribute" name="marketingAttribute" class="form-control" required amProductMarketingAttributesTypeOptions ></select>
           
          </div>
        </div>
          
          <div class="row">
            <div class="form-group col-sm-3">
              <label class="label">UPC</label>
              <input type="text" class="form-control" name="lat" [(ngModel)]="product.attributes.description">
            </div>
            <div class="form-group col-sm-3">
              <label class="label">Price</label>
              <input type="text" class="form-control" name="lon" [(ngModel)]="product.attributes.description">
            </div>
          </div>
  </accordion-group>
  
  <accordion-group heading="Grouping">
      <div class="row">
        <div class="form-group col-sm-3">
          <label>Category</label>
          <select name="" id="">
           <option ngFor="let category of categories"  value="{{category}}">{{category}}
           </option>
          </select>
           <input type="text" class="form-control" name="lon" [(ngModel)]="product.categoryId">
        </div>
        <div class="form-group col-sm-3">
          <label>Groups</label>
           <input type="text" class="form-control" name="lon" [(ngModel)]="product.categoryId">
        </div>
      </div> 
       
       <div class="row">
        <div class="form-group col-sm-6">
          <label>Tags</label>
           <input type="text" class="form-control" name="lon" [(ngModel)]="product.categoryId">
        </div>
       </div>
  </accordion-group>
  
  <accordion-group heading="Options">
    <p>Options</p>
  </accordion-group>
  
</accordion>

</form>`
})
export class ProductDetailComponent implements OnInit {
  @ViewChild('productForm') form;

  marketingAttr : MarketingAttributeType[];
  categories: string[] = ['AB', 'AB','BC','TG'];

  private lang: string = 'en';
  private currency: string = 'SAR';
  private productId: string;
  private merchantId: string;
  private product: Product = new Product();
  private productOriginal = new Product();
  private wasModified = false;
  private rtlDetect = require('rtl-detect');


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {

    this.route.parent.params.subscribe(params => {
      if (params['merchantId']) {
        this.merchantId = params['merchantId'];
        if (this.merchantId !== 'new') {
          this.changeLang(false, this.lang);
        }
      }
    });


    this.route.params.subscribe(params => {
      if (params['productId']) {
        if (params['productId'] !== 'new') {
          this.productId = params['productId'];

          this.getCategories(this.lang);

        }
      }
    });

  }

  ngAfterViewInit() {
    this.form.control.valueChanges
      .subscribe(values => {
        this.wasModified = !_.isEqual(this.product, this.productOriginal);
      });
  }

  onCategorySelect(){
    console.log('oncategory select')
  }
  changeLang(save: boolean, lang: string, prevLang?: string) {

    let observProductId: Observable<string>;
    if (save && prevLang) {
      observProductId = this.productService.saveProduct(this.merchantId, this.product, this.productOriginal, prevLang);
    } else {
      observProductId = Observable.of(this.productId);
    }

    observProductId.mergeMap(productId => {
      const options = {
        currency: this.currency
      };
      return this.productService.getOne(productId, options, lang);
    }).subscribe(( Product : Product) => {
      this.productId = Product.id;
      this.product = Product;
      this.productOriginal = _.cloneDeep(Product);
      this.lang = lang;
    });
  }

  getCategories(lang: string){
    this.categoryService.getCategories(lang)
      .subscribe(
        categories => {
          console.log('categories', categories)
         // this.categories = categories.content;
          this.getProduct(this.productId, this.lang);
          this.changeLang(false, this.lang);
        }
      )
  }

  getProduct(productID: string, lang: string) {
    const options = {
      currency: this.currency
    };
    this.productService.getOne(productID, options, lang)
      .subscribe(product => {
        this.product = product;
        this.productOriginal = _.cloneDeep(product);
    });
  }

    onChangeLang(event: ChangeLangEvent) {
        this.changeLang(event.save, event.lang, event.prevLang);
    }

    get langDirection() {
      return this.rtlDetect.getLangDir(this.lang);
    }

    saveProduct() {
      this.productService.saveProduct(this.merchantId, this.product, this.productOriginal, this.lang)
        .subscribe(
          productId => {
            if (productId) {
              console.log('in product details component',productId )
              this.productId = productId;
              this.wasModified = false;
            }
            this.router.navigate(['../', this.productId], {relativeTo: this.route});
        }
      );

  }

}


// export class MerchantDetailsComponent {
//   @ViewChild('merchantForm') form;
//
//   private lang: string = 'en';
//   private merchantId: string;
//   private viewModel: MerchantViewModel = new MerchantViewModel();
//   private viewModelOriginal: MerchantViewModel = new MerchantViewModel();
//   private wasModified = false;
//   private rtlDetect = require('rtl-detect');
//
//   constructor(
//     private route: ActivatedRoute,
//     private merchantVmService: MerchantViewModelService) {
//   }
//
//   ngOnInit() {
//     const this = this;
//     this.route.parent.params.subscribe(params => {
//       if (params['merchantId']) {
//         this.merchantId = params['merchantId'];
//         if (this.merchantId !== 'new') {
//           this.changeLang(false, this.lang);
//         }
//       }
//     });
//   }
//
//   ngAfterViewInit() {
//     const this = this;
//     this.form.control.valueChanges
//       .subscribe(values => {
//         this.wasModified = !_.isEqual(this.viewModel, this.viewModelOriginal);
//       });
//   }
//
//   get langDirection() {
//     return this.rtlDetect.getLangDir(this.lang);
//   }
//
//   onChangeLang(event: ChangeLangEvent) {
//     this.changeLang(event.save, event.lang, event.prevLang);
//   }
//
//   changeLang(save: boolean, lang: string, prevLang?: string) {
//     const this = this;
//     let observMerchantId: Observable<string>;
//     if (save && prevLang) {
//       observMerchantId = this.merchantVmService.save(this.viewModel, this.viewModelOriginal, prevLang).map(viewModel => viewModel.merchant.id);
//     } else {
//       observMerchantId = Observable.of(this.merchantId);
//     }
//
//     observMerchantId.mergeMap(merchantId => {
//       return this.merchantVmService.get(merchantId, lang);
//     }).subscribe((viewModel: MerchantViewModel) => {
//       this.merchantId = viewModel.merchant.id;
//       this.viewModel = viewModel;
//       this.viewModelOriginal = _.cloneDeep(viewModel);
//       this.lang = lang;
//     });
//   }
//
//   saveMerchant() {
//     const this = this;
//
//     this.merchantVmService.save(this.viewModel, this.viewModelOriginal, this.lang).subscribe(
//       viewModel => {
//         this.viewModel = viewModel;
//         this.viewModelOriginal = _.cloneDeep(viewModel);
//         this.wasModified = false;
//       }
//     );
//
//   }
// }
