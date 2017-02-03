/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */


import { Currency, MarketingAttributeType } from '../../shared/types';
export class ProductAttributes {
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
  currency: Currency = Currency.SAR;
  discountedPrice: number;
  price: number = 0;
}


export interface Tag {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  products: Product[];
}

export class ProductSelectedImage {
  id: string = '';
}

export class Product {
  constructor(
  public attributes: ProductAttributes = new ProductAttributes(),
  public available: boolean = true,
  public categoryId: string = '',
  public groupIds: string[] = [],
  public description: string = '',
  public imageUrl: string = '',
  public marketingAttribute: MarketingAttributeType | string = '',
  public mediaResources: MediaResource[] = [],
  public merchantId: string = '',
  public packageType: string = '',
  public price: Price = new Price(),
  public tagValues: string[] = [],
  public tags: Tag[] = [],
  public upc: string = '',
  public defaultProductImageUrl: string,
  public selectedImage: ProductSelectedImage = new ProductSelectedImage(),
  public id?: string,
)
  {}
}

export interface ProductsRootObject {
  content: Product[];
  total: number;
}


export interface ProductGroup {
  name: string
}

