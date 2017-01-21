/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ChangeLangEvent } from '../../../../shared/components/select-lang.component';
import { ProductService } from "../../../../core/services/products/products-service";
import { Product } from "../../../../commons/model/product";
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccordionModule } from 'ng2-bootstrap/accordion';


@Component({
    selector: 'am-product-form',
    styles: [``],
    template: `<h1>Product details Form</h1>

    <div class="col-sm-4">
     <pre>#Product : {{product | json}}</pre> 
    </div>

<form #productForm="ngForm" class="merchant-details container">
  <div class="form-group row">
    <div class="col-sm-4">
      <button (click)="save.emit(product)" class="btn btn-secondary" >Save</button>
    </div>
  </div>
  
  <div class="row">
        <!--<am-select-lang [lang]="'en'"-->
                        <!--[wasModified]="wasModified"-->
                        <!--(onChange)="onChangeLang($event)">            -->
        <!--</am-select-lang>-->
  </div>
  
<accordion >
  <accordion-group heading="General" [isOpen]="true">

        
          <div class="row">
            <div class="form-group col-sm-3">
              <label>Product main Image</label>
              <am-upload-image name="imageUrl"
                               [folder]="'PRODUCTS'"
                               [(ngModel)]="product.imageUrl"
                     >       
              </am-upload-image>
            </div>
          </div>
        
          <div class="form-group">
            <label class="checkbox-inline custom-checkbox nowrap">
              <input type="checkbox" class="form-control" name="enabled" 
                      [(ngModel)]="product.available">
              <span>Product available</span>
            </label>
          </div>
          
          <div class="row">
            <div class="form-group col-sm-6">
              <label>Name</label>
              <input type="text" class="form-control" name="name"
                     [(ngModel)]="product.attributes.name" 
                     [ngStyle]="{'direction': langDirection}">
            </div>
          </div>
          
            <div class="row">
            <div class="form-group col-sm-6">
              <label>Description</label>
              <textarea type="text" class="form-control" name="desc" 
                        [(ngModel)]="product.attributes.description" 
                        [ngStyle]="{'direction': langDirection}">
              </textarea>
            </div>
          </div>
  </accordion-group>
  
  <accordion-group heading="Marketing" [isOpen]="true">
     <div class="row">
     
        <div class="form-group col-sm-3">
          <label>Marketing Attribute</label>
          <select  name="marketingAttribute" class="form-control" 
                required
                amProductMarketingAttributesTypeOptions >      
          </select>
        </div>
          
        <div class="form-group col-sm-3">
          <label class="label">UPC</label>
          <input type="text" class="form-control" name="upc"
               [(ngModel)]="product.upc" >
        </div>
                       
     </div>
          
    <div class="row">

        <div class="form-group col-sm-3">
          <label class="label">Price</label>
          <input type="text" class="form-control" name="price" 
            [(ngModel)]="product.price.price" 
          >
        </div>
        
        <div class="form-group col-sm-3">
          <label class="label">Discounted Price</label>
          <input type="text" class="form-control" name="discPrice"
            [(ngModel)]="product.price.discountedPrice"
           >
        </div>
        
    </div>
          
  </accordion-group>
  
  <accordion-group heading="Grouping" [isOpen]="true">
      <div class="row">
        <div class="form-group col-sm-3">
          <label>Category</label>
            <am-category-select [lang]="lang" (category)="onCategorySelect($event)" [(ngModel)]="product.categoryId" name="categoryId"></am-category-select>
        </div>
        <div class="form-group col-sm-3">
          <label>Groups</label>
           <am-group-multi-select [(ngModel)]="product.groupsIds" name="groupIds"> </am-group-multi-select>
        </div>
      </div> 
      
       <div class="row">
        <div class="form-group col-sm-6">
          <label>Tags</label>
           <am-tag-multi-select [(ngModel)]="product.tagValues" name="tags"></am-tag-multi-select>
        </div>
       </div>
  </accordion-group>
  
  <accordion-group heading="Options" [isOpen]="true">
    <p>Options</p>
  </accordion-group>
  
</accordion>

</form>
`
})
export class ProductFormComponent implements OnInit {

  _product = {};
  originalProduct = {};

  @Input() set product(value) {
    if(value) this.originalProduct = value;
    this._product = Object.assign({}, value);
  }
  get product() {
    return this._product;
  }

  @Output() save = new EventEmitter();

  // @ViewChild('productForm') form;


  // private productId: string;
  // private merchantId: string;
  // private product: Product ;
  // private productOriginal: Product;
  // private wasModified = false;
  private rtlDetect = require('rtl-detect');


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              ) { }

  ngOnInit() {

    // this.route.parent.params.subscribe(params => {
    //   if (params['merchantId']) {
    //     this.merchantId = params['merchantId'];
    //     if (this.merchantId !== 'new') {
    //     //  this.changeLang(false, this.lang);
    //     }
    //   }
    // });

    //
    // this.route.params.subscribe(params => {
    //   if (params['productId']) {
    //     if (params['productId'] !== 'new') {
    //       this.productId = params['productId'];
    //       this.getProduct(this.productId, this.lang);
    //       this.changeLang(false, this.lang);
    //     }
    //   }
    // });

  }

  // ngAfterViewInit() {
  //   this.form.control.valueChanges
  //     .subscribe(values => {
  //     //  this.wasModified = !_.isEqual(this.product, this.productOriginal);
  //     });
  // }

  onCategorySelect(){
    console.log('oncategory select')
  }

  // changeLang(save: boolean, lang: string, prevLang?: string) {
  //
  //   let observProductId: Observable<string>;
  //   if (save && prevLang) {
  //     observProductId = this.productService.saveProduct(this.merchantId, this.product, this.productOriginal, prevLang);
  //   } else {
  //     observProductId = Observable.of(this.productId);
  //   }
  //
  //   observProductId.mergeMap(productId => {
  //     const options = {
  //       currency: this.currency
  //     };
  //     return this.productService.getOne(productId, options, lang);
  //   }).subscribe(( Product : Product) => {
  //     this.productId = Product.id;
  //     this.product = Product;
  //     this.productOriginal = _.cloneDeep(Product);
  //     this.lang = lang;
  //   });
  // }


  // getProduct(productID: string, lang: string) {
  //   const options = {
  //     currency: this.currency
  //   };
  //   this.productService.getOne(productID, options, lang)
  //     .subscribe(product => {
  //
  //       this.product = new Product(
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
  //       )
  //
  //       this.productOriginal = _.cloneDeep(product);
  //   });
  // }

    // onChangeLang(event: ChangeLangEvent) {
    //     this.changeLang(event.save, event.lang, event.prevLang);
    // }

    // get langDirection() {
    //   return this.rtlDetect.getLangDir(this.lang);
    // }

  //   saveProduct() {
  //     this.productService.saveProduct(this.merchantId, this.product, this.productOriginal, this.lang)
  //       .subscribe(
  //         productId => {
  //           if (productId) {
  //             console.log('in product details component',productId )
  //             this.productId = productId;
  //             this.wasModified = false;
  //           }
  //           this.router.navigate(['../', this.productId], {relativeTo: this.route});
  //       }
  //     );
  // }

/////////////////////////////////////////////////////////
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
