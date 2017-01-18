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
  attributes: Attributes = new Attributes();
  available: boolean = true;
  categoryId: string = '';
  groupIds: string[] = [];
  id?: string = '';
  description: string = '';
  imageUrl: string = '';
  discountedPrice: number;
  marketingAttribute: string = '';
  mediaResources: MediaResource[] = [];
  merchantId: string = '';
  name: string;
  packageType: string = '';
  price: Price = new Price();
  tagValues: string[] = [];
  tags: Tag[] = [];
  upc: string = '';
  defaultProductImageUrl: string;

  constructor(){}
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

