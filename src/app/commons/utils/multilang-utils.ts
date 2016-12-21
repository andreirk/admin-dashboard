import { MultiLang } from "../model/multilang";
import { Observable } from "rxjs";

export class MultilangUtils {
  static updateMultiLang<T, S>(target: T, source: S, lang: string) {
    Object.keys(source).forEach(function(name) {
      if (!source[name]) return;
      if (target[name] instanceof MultiLang) {
        target[name][lang] = source[name];
      } else {
        target[name] = source[name];
      }
    });
    return target;
  }

  static updateSingleLang<T, S>(target: T, source: S, lang: string) {
    Object.keys(source).forEach(function(name) {
      if (!source[name]) return;
      if (source[name] instanceof MultiLang) {
        target[name] = source[name][lang];
      } else {
        target[name] = source[name];
      }
    });
    return target;
  }

  static combineObservables<T, S>(target: T, obsMap: Map<string, Observable<S>>) {
    let resObs: Observable<T> = Observable.create(observer => observer.next(target));
    obsMap.forEach(function(obs, lang) {
      resObs = resObs.combineLatest(obs,
        (val1: T, val2: S): T => MultilangUtils.updateMultiLang<T, S>(val1, val2, lang));
    });
    return resObs;
  }
}
