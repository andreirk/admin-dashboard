/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */


export interface Attributes {
  brand: string;
  description: string;
  name: string;
}

export interface MediaResource {
  id: number;
  main: boolean;
  type: string;
  url: string;
}

export interface Price {
  currency: string;
  discountedPrice: number;
  price: number;
}

export interface MediaResources {
  images: string[];
  videos: string[];
}

export interface Product {
  available: boolean;
  brand: string;
  defaultProductImageUrl: string;
  description: string;
  discountedPrice: number;
  id: string;
  imageUrl: string;
  marketingAttribute: string;
  // mediaResources: MediaResources;
  merchantId: string;
  name: string;
  packageType: string;
  price: number;
}

export interface Tag {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  products: Product[];
}

export interface Content {
  attributes: Attributes;
  available: boolean;
  categoryId: string;
  groupIds: string[];
  id: string;
  imageUrl: string;
  marketingAttribute: string;
  mediaResources: MediaResource[];
  merchantId: string;
  packageType: string;
  price: Price;
  tagValues: string[];
  tags: Tag[];
  upc: string;
}

export interface ProductsRootObject {
  content: Product[];
  total: number;
}


