/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
  IMultiSelectOption, IMultiSelectSettings,
  IMultiSelectGroup, IMultiSelectTexts
} from '../../../shared/components/multiselect-dropdown.component';
import { SearchService } from '../../../core/services/search/search.service';
import { SearchQuery } from '../../../commons/model/search/search-query';
import { UserService } from '../../../core/services/users/user.service';
import { OrderFilteringService } from '../services/order-filtering.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'am-order-person-multiselect',
  template: `
  <am-multiselect-dropdown *ngIf="exist"
      [options]="orderPersonOptions"
      [groups]="orderPersonGroups"
      [settings]="settings"
      [texts]="texts"
      [(ngModel)]="selectedOptions"
      (searchChanged)="searchChange($event)"></am-multiselect-dropdown>`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => OrderPersonMultiselectComponent),
    multi: true
  }]
})
export class OrderPersonMultiselectComponent implements OnInit, ControlValueAccessor {
  @Input() _selectedOptions: IMultiSelectOption[];
  private orderPersonOptions: IMultiSelectOption[] = [];
  private orderPersonGroups: IMultiSelectGroup[] = [
    <IMultiSelectGroup> {
      id: 'usr',
      name: 'Customers and peers',
      prefix: 'Customer: '
    },
    <IMultiSelectGroup> {
      id: 'drv',
      name: 'Drivers',
      prefix: 'Driver: '
    }
  ];
  private settings: IMultiSelectSettings = <IMultiSelectSettings> {
    dynamicTitleMaxItems: 2,
    enableSearch: true,
    checkedStyle: 'radios'
  };
  private texts: IMultiSelectTexts = {
    defaultTitle: 'Select',
    searchPlaceholder: 'Search by phone or email...',
  };
  private subjectSearchText: Subject<string> = new Subject<string>();
  private exist = false;


  constructor(private filteringService: OrderFilteringService) {
    this.exist = true;
  }

  ngOnInit() {
    const vm = this;

    vm.subjectSearchText.debounceTime(300).subscribe(query => {
      vm.filteringService.getPersons(query).subscribe(persons => {
        vm.orderPersonOptions = [];
        let selectedUserOption: IMultiSelectOption;
        let selectedDriverOption: IMultiSelectOption;
        vm.selectedOptions.forEach(option => {
          if (option.group === 'usr' && !persons.users.content.find(opt => opt.id === option.id)) {
            selectedUserOption = option;
          }
          if (option.group === 'drv' && !persons.drivers.content.find(opt => opt.id === option.id)) {
            selectedDriverOption = option;
          }
        });

        if (persons.users.total > 0 || selectedUserOption) {
          vm.orderPersonOptions.push(<IMultiSelectOption> { name: 'Customers and peers (total ' + persons.users.total + ' matched)' });
        }
        if (selectedUserOption) {
          vm.orderPersonOptions.push(selectedUserOption);
        }
        persons.users.content.forEach(user => {
          vm.orderPersonOptions.push(<IMultiSelectOption> {
            id: user.id,
            name: user.firstName + ' ' + user.lastName + '(' + user.phoneNumber + ', ' + user.email + ')',
            group: 'usr'
          });
        });
        if (persons.drivers.total > 0 || selectedDriverOption) {
          vm.orderPersonOptions.push(<IMultiSelectOption> { name: 'Drivers (total ' + persons.drivers.total + ' matched)'  });
        }
        if (selectedDriverOption) {
          vm.orderPersonOptions.push(selectedDriverOption);
        }
        persons.drivers.content.forEach(driver => {
          vm.orderPersonOptions.push(<IMultiSelectOption> {
            id: driver.id,
            name: driver.firstName + ' ' + driver.lastName + '(' + driver.phone + ', ' + driver.email + ')',
            group: 'drv'
          });
        });
      });
    });
  }

  searchChange(event) {
    this.subjectSearchText.next(event.query);
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
