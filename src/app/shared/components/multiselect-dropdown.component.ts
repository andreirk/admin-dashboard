/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {
  Component, Input, Output, EventEmitter, forwardRef, ElementRef, IterableDiffers,
  HostListener, ViewChild, OnInit, AfterViewInit, OnChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiselectDropdownComponent),
  multi: true
};

export interface IMultiSelectOption {
  id: any;
  name: string;
  group: string;
}

export interface IMultiSelectGroup {
  id: any;
  name: string;
  prefix: string;
}

export interface IMultiSelectSettings {
  pullRight?: boolean;
  enableSearch?: boolean;
  checkedStyle?: 'checkboxes' | 'radios';
  buttonClasses?: string;
  selectionLimit?: number;
  closeOnSelect?: boolean;
  autoUnselect?: boolean;
  dynamicTitleMaxItems?: number;
  maxHeight?: string;
}

export interface IMultiSelectTexts {
  checked?: string;
  checkedPlural?: string;
  searchPlaceholder?: string;
  defaultTitle?: string;
}


@Component({
  selector: 'am-multiselect-dropdown',
  providers: [MULTISELECT_VALUE_ACCESSOR],
  styles: [`
    a { outline: none !important; }
    input { color: #373a3c !important; border-color: #373a3c !important; }
    i { color: #373a3c !important; }
    .dropdown-toggle:after { display:none; }
    .dropdown-toggle { height: 2.2rem!important; }
    .btn:hover { transform: none; }
    .form-control::-webkit-input-placeholder { color: grey; }
    .form-control:-moz-placeholder { color: grey; }
    .form-control::-moz-placeholder { color: grey; }
    .form-control:-ms-input-placeholder { color: grey; }
  `],
  template: `
<div class="dropdown">
    <div class="input-group">
      <button type="button" style="width:100%;" class="dropdown-toggle" [ngClass]="settings.buttonClasses" (click)="toggleDropdown()">
        <div *ngFor="let t of titleList">{{ t }}</div>
      </button>
      <span class="input-group-addon" (click)="toggleDropdown()">
        <i class="fa fa-sort-desc" aria-hidden="true"></i>
      </span>
    </div>
      
    <ul *ngIf="isVisible" class="dropdown-menu" [class.pull-right]="settings.pullRight"
    [style.max-height]="settings.maxHeight" style="display: block; height: auto; overflow-y: auto;">
        <li class="dropdown-item" *ngIf="settings.enableSearch">
            <div class="input-group input-group-sm">
                <span class="input-group-addon" id="sizing-addon3"><i class="fa fa-search"></i></span>
                <input id="dropdownFocusable" type="text" class="form-control" placeholder="{{ texts.searchPlaceholder }}"
                  aria-describedby="sizing-addon3" [(ngModel)]="searchFilterText" (keyup)="searchChange()" autofocus>
                <span class="input-group-btn" *ngIf="searchFilterText.length > 0">
                    <button class="btn btn-default" type="button" (click)="clearSearch()"><i class="fa fa-times"></i></button>
                </span>
            </div>
        </li>
        <li class="dropdown-divider divider" *ngIf="settings.enableSearch && options.length > 0"></li>
        <li class="dropdown-item" *ngFor="let option of options">
            <span *ngIf="!option.id"><i class="fa fa-sort-desc" aria-hidden="true"></i>&nbsp;{{ option.name }}</span>
            <a *ngIf="option.id" href="javascript:;" role="menuitem" tabindex="-1" (click)="setSelected($event, option)">
                &nbsp;&nbsp;&nbsp;
                <input *ngIf="settings.checkedStyle == 'checkboxes'" type="checkbox" [checked]="isSelected(option)" />
                <input *ngIf="settings.checkedStyle == 'radios'" [name]="option.group" type="checkbox" [checked]="isSelected(option)" />
                {{ option.name }}
            </a>
        </li>
    </ul>
</div>`
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() options: Array<IMultiSelectOption>;
  @Input() groups: Array<IMultiSelectGroup>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() searchChanged = new EventEmitter();

  @ViewChild('dropdownFocusable') dropdownFocusable;

  @HostListener('document: click', ['$event.target'])
  onClick(target: HTMLElement) {
    let parentFound = false;
    while (target != null && !parentFound) {
      if (target === this.element.nativeElement) {
        parentFound = true;
      }
      target = target.parentElement;
    }
    if (!parentFound) {
      this.isVisible = false;
    }
  }

  model: IMultiSelectOption[];
  title: string;
  titleList: string[];
  differ: any;
  numSelected: number = 0;
  isVisible: boolean = false;
  searchFilterText: string = '';
  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    checkedStyle: 'checkboxes',
    enableSearch: false,
    buttonClasses: 'btn btn-default btn-block text-left',
    selectionLimit: 0,
    closeOnSelect: false,
    autoUnselect: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  defaultTexts: IMultiSelectTexts = {
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
  };

  constructor(private element: ElementRef,
              private differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.settings = Object.assign(this.defaultSettings, this.settings);
    this.texts = Object.assign(this.defaultTexts, this.texts);
    this.title = this.texts.defaultTitle;
    this.titleList = [ this.texts.defaultTitle ];
  }

  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };

  writeValue(value: any): void {
    if (value !== undefined) {
      this.model = value;
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.model);
    if (changes) {
      this.updateNumSelected();
      this.updateTitle();
    }
  }

  clearSearch() {
    this.searchFilterText = '';
    this.searchChange();
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
      this.dropdownClosed.emit();
    } else {
      setTimeout(function () {
        if (this.dropdownFocusable) {
          this.dropdownFocusable.focus();
        }
      }, 300);
    }
  }

  isSelected(option: IMultiSelectOption): boolean {
    return this.model && this.model.find(opt => opt.id === option.id) !== undefined;
  }

  setSelected(event: Event, option: IMultiSelectOption) {
    if (!this.model) {
      this.model = [];
    }

    if (this.settings.checkedStyle === 'radios') {
      if (this.model.find(opt => opt.id === option.id)) { // need for uncheck
        this.model = this.model.filter(opt => opt.group !== option.group);
      } else {
        this.model = this.model.filter(opt => opt.group !== option.group);
        this.model.push(option);
      }
    } else {
      let index = this.model.findIndex(opt => opt.id === option.id);
      if (index > -1) {
        this.model.splice(index, 1);
      } else {
        if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
          this.model.push(option);
        } else {
          if (this.settings.autoUnselect) {
            this.model.push(option);
            this.model.shift();
          } else {
            this.selectionLimitReached.emit(this.model.length);
            return;
          }
        }
      }
    }
    if (this.settings.closeOnSelect) {
      this.toggleDropdown();
    }
    this.onModelChange(this.model);
  }

  updateNumSelected() {
    this.numSelected = this.model && this.model.length || 0;
  }

  updateTitle() {
    const vm = this;
    if (vm.numSelected === 0) {
      vm.title = vm.texts.defaultTitle;
      vm.titleList = [ vm.texts.defaultTitle ];
    } else if (vm.settings.dynamicTitleMaxItems >= vm.numSelected) {
      vm.titleList = vm.model
        .map((option: IMultiSelectOption) => {
          if (option.group) {
            return vm.groups.find(group => group.id === option.group).prefix + option.name;
          } else {
            return option.name;
          }
        });
      vm.title = vm.model
        .map((option: IMultiSelectOption) => option.name)
        .join('\n ');
    } else {
      vm.title = vm.numSelected
        + ' '
        + (vm.numSelected === 1 ? vm.texts.checked : vm.texts.checkedPlural);
      vm.titleList = [ vm.title ];
    }
  }

  searchChange() {
    this.searchChanged.emit({ query: this.searchFilterText });
  }
}
