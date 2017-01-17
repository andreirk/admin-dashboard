/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { GroupService } from './entity.service';
import { Observable } from 'rxjs';
import { ViewList } from '../../commons/model/view-list';
import { Page } from '../../commons/model/page';

export abstract class ViewListService<T extends { id? }> {
  constructor() { }

  abstract getPage(page: number, size: number, lang: string, filterParams?: any): Observable<Page<T>>;

  update(viewList: ViewList<T>, page: number, size: number, lang: string, filterParams?: any): Observable<ViewList<T>> {
    return this.getPage(page, size, lang, filterParams)
      .map(respPage => {
          viewList.total = respPage.total;
          for (let i = 0; i < respPage.content.length; ++i) {
            viewList.content[i + page * size] = respPage.content[i];
          }
          return viewList;
        }
      );
  }

  loadMore(viewList: ViewList<T>, size: number, lang: string, filterParams?: any): Observable<ViewList<T>> {
    const vm = this;
    let page =  Math.floor(viewList.content.length / size);
    return vm.update(viewList, page, size, lang, filterParams);
  }

  deleteOne(viewList: ViewList<T>, entityId: string): ViewList<T> {
    let oldLength = viewList.content.length;
    viewList.content = viewList.content.filter(entity => entity.id !== entityId);
    viewList.total -= oldLength - viewList.content.length;
    return viewList;
  }
}


