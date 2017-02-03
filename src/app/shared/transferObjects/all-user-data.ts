import { Merchant } from "../../commons/model/merchant";
import { Product, ProductsRootObject } from "../../commons/model/product";

export interface AllUserData {

    content: Product[],
    total: number

    // productOptions: ProductOption[]

}
