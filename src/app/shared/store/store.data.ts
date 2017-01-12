import { Merchant } from "../../commons/model/merchant";
import { Product } from "../../commons/model/product";

export interface  StoreData {

  products: {
    [key: number]: Product
  };
}

export const INITIAL_STORE_DATA: StoreData = {

  products: {}

};
