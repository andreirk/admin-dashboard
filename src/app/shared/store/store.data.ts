import { Merchant } from "../../commons/model/merchant";
import { Product, ProductsRootObject } from "../../commons/model/product";

export interface  StoreData {

  products: {
      content: Product[]

      total: number
  };

}

export const INITIAL_STORE_DATA: StoreData = {

  products: {
    content: null,
    total: null,
  }

};
