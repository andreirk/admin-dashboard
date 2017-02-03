/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Directive, ElementRef } from '@angular/core';
import { MarketingAttributeType } from '../types';

@Directive({
  selector: '[amProductMarketingAttributesTypeOptions]'
})
export class MarketingAttributeTypeOptionsDirective {
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    if (this.el.nativeElement.localName === 'select') {
      for (let type in MarketingAttributeType) {
        if (!(parseInt(type, 10) >= 0)) {
          this.el.nativeElement.options[this.el.nativeElement.options.length]
                = new Option(type.replace('_', ' '), type);
        }
      }
    }
  }
}
