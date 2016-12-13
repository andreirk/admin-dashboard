import { Injectable } from '@angular/core'
import { ApiService } from '../../../../services/api'

@Injectable()
export class CategoryService {
    path: string = '/merchants'; // no products yet

    constructor(private api: ApiService){
    }

    createCategory(category) {
        return this.api.post(this.path, category)
    }

    getCategories(){
        return this.api.get(this.path)
    }

    deleteCategory(category) {
        return this.api.delete(`${this.path}/${category.id}`)
    }
}