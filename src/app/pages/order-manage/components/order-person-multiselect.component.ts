/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings } from '../../../shared/components/multiselect-dropdown.component';
import { SearchService } from '../../../core/services/search/search.service';
import { SearchQuery } from '../../../commons/model/search/search-query';
import { UserService } from '../../../core/services/users/user.service';
import { OrderFilteringService } from '../services/order-filtering.service';

@Component({
  selector: 'am-order-person-multiselect',
  template: `
  <am-multiselect-dropdown *ngIf="exist"
      [options]="orderPersonOptions"
      [settings]="settings"
      [(ngModel)]="selectedOptions"
      (searchChanged)="searchChange($event)"></am-multiselect-dropdown>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderPersonMultiselectComponent),
    multi: true
  }]
})
export class OrderPersonMultiselectComponent implements ControlValueAccessor {
  @Input() _selectedOptions: string[];
  private orderPersonOptions: IMultiSelectOption[] = [];
  private settings: IMultiSelectSettings = <IMultiSelectSettings> {
    dynamicTitleMaxItems: 1,
    enableSearch: true,
  };
  private exist = false;


  constructor(private filteringService: OrderFilteringService) {
    this.exist = true;
  }

  searchChange(event) {
    const vm = this;
    vm.orderPersonOptions = [];
    vm.filteringService.getPersons(event.query).subscribe(persons => {
      if (persons.users.total > 0) {
        vm.orderPersonOptions.push(<IMultiSelectOption> { name: 'Customers and peers' });
      }
      persons.users.content.forEach(user => {
        vm.orderPersonOptions.push(<IMultiSelectOption> {
          id: 'usr' + user.id,
          name: user.firstName + ' ' + user.lastName + '(' + user.phoneNumber + ')'
        });
      });
      if (persons.drivers.total > 0) {
        vm.orderPersonOptions.push(<IMultiSelectOption> { name: 'Drivers' });
      }
      persons.drivers.content.forEach(driver => {
        vm.orderPersonOptions.push(<IMultiSelectOption> {
          id: 'drv' + driver.id,
          name: driver.firstName + ' ' + driver.lastName + '(' + driver.phone + ', ' + driver.email + ')'
        });
      })
    });
  }

  // custom form control methods
  get selectedOptions() {
    return this._selectedOptions;
  }

  set selectedOptions(val) {
    this._selectedOptions = val;
    this.propagateChange(val);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedOptions = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
