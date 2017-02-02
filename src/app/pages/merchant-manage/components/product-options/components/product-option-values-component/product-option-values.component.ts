/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { MerchantProductAppState } from '../../../../store/index';
import { Subscription, Observable } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';

@Component({

    selector: 'am-product-option-values',
    styles:  [require('./product-option-values-component.scss')],
    template: `
  
        <ng2-smart-table
          [settings]="productOptionValuesSettings"
          [source]="dataSource"
          (createConfirm)="onCreateConfirm($event)"
          (editConfirm)="onEditConfirm($event)"
          (deleteConfirm)="onDeleteConfirm($event)"
          >
   
        </ng2-smart-table>
        
`
})
export class ProductOptionValuesComponent implements OnInit {

  dataSource: LocalDataSource;
  subscription: Subscription;
  productOptionValues$: Observable<any>;
  productOptionValuesSettings: any;

  @Output() newValueCreated = new EventEmitter();

  constructor( private store: Store<MerchantProductAppState>,
               ) {

    this.dataSource = new LocalDataSource();
    this.productOptionValues$ = this.store.select('productOption')
  }

  ngOnInit() {
    this.subscription = this.productOptionValues$
      .subscribe(result => {
          let values = result.values.map(value => ({name: value.name, price: value.cost}));
          console.log('values', values);
          if(values.length){
            this.dataSource.load(values);
          }
      });


    this.productOptionValuesSettings = {

      add: {
        addButtonContent: '<a class="btn btn-primary"  ><span style="color: white"  >Add</span></a>',
        createButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<span class="glyphicon glyphicon-pencil"><i class="fa fa-pencil" aria-hidden="true"></i> </span>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave : true,
      },
      delete: {
        deleteButtonContent: '<span class="glyphicon glyphicon-trash"><i class="fa fa-trash" aria-hidden="true"></i> </span>',
        confirmDelete: true
      },
      columns: {

        name: {
          title: 'Name',
          filter: false,
        },

        price: {
          title: 'Price',
          filter: false,
        },

      },
      noDataMessage: 'No values found'

    };

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.dataSource.empty();
  }


  onCreateConfirm($event){
    console.log('onCreateConfirm', $event);
    $event.confirm.resolve();
    this.newValueCreated.emit($event.newData);

  }

  onEditConfirm($event){
    console.log('onEditConfirm', $event);
    $event.confirm.resolve($event.newData);
  }

  onDeleteConfirm($event){
    console.log('onDeleteConfirm', $event);
  }


}
