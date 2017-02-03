/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */


export class ProductOption {
  public id: string;
  public multiselect: boolean;
  public name: string;
  public required: boolean;
  public title: string;
  public values: ProductOptionValue[] = [];


  constructor() {
  }
}


export class ProductOptionValue {
  public id: string = '';
  public enabled: string = '';
  public name: string = '';
  public cost: string = '';
  public optionId: string = '';

  constructor() {
  }
}
