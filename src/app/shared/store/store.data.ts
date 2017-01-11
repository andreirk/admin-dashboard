
import {Merchant} from "../../commons/model/merchant";

export interface  StoreData {

  merchants: {[key:number]: Merchant};

  products: {[key:number]: Product};
}

export const INITIAL_STORE_DATA : StoreData = {

  merchants: {},
  products: {}

}
