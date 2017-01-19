/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */


export class Attributes {
  brand: string = '';
  description: string = '';
  name: string = '';
}

export interface MediaResource {
  id: number;
  main: boolean;
  type: string;
  url: string;
}



export class Price {
  currency: string = '';
  discountedPrice: number = 0;
  price: number = 0;
}


// export interface Product {
//   available: boolean;
//   brand: string;
//   defaultProductImageUrl: string;
//   description: string;
//   discountedPrice: number;
//   id: string;
//   imageUrl: string;
//   marketingAttribute: MarketingAttribute;
//   // mediaResources: MediaResources;
//   merchantId: string;
//   name: string;
//   packageType: string;
//   price: Price;
// }

export interface Tag {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  products: Product[];
}

export class Product {
  constructor(
  public attributes: Attributes = new Attributes(),
  public available: boolean = true,
  public categoryId: string = '',
  public groupIds: string[] = [],
  public description: string = '',
  public imageUrl: string = '',
  public marketingAttribute: string = '',
  public mediaResources: MediaResource[] = [],
  public merchantId: string = '',
  public name: string = '',
  public packageType: string = '',
  public price: Price = new Price(),
  public tagValues: string[] = [],
  public tags: Tag[] = [],
  public upc: string = '',
  public defaultProductImageUrl: string,
  public id?: string,
)
  {}
}

export interface ProductsRootObject {
  content: Product[];
  total: number;
}

export type MarketingAttribute = 'Promo'| 'Gift'| 'Tranding' | '';


export interface ProductOption {
  name: string
}

export interface ProductGroup {
  name: string
}

