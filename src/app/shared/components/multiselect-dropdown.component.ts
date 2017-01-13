/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {
  Component, Input, Output, EventEmitter, forwardRef, ElementRef, IterableDiffers,
  HostListener
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
}

export interface IMultiSelectSettings {
  pullRight?: boolean;
  enableSearch?: boolean;
  checkedStyle?: 'checkboxes' | 'glyphicon';
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
  `],
  template: `
<div class="dropdown">
    <button type="button" class="dropdown-toggle" [ngClass]="settings.buttonClasses"
    (click)="toggleDropdown()">{{ title }}&nbsp;<span class="caret"></span></button>
    <ul *ngIf="isVisible" class="dropdown-menu" [class.pull-right]="settings.pullRight"
    [style.max-height]="settings.maxHeight" style="display: block; height: auto; overflow-y: auto;">
        <li class="dropdown-item" *ngIf="settings.enableSearch">
            <div class="input-group input-group-sm">
                <span class="input-group-addon" id="sizing-addon3"><i class="fa fa-search"></i></span>
                <input type="text" class="form-control" placeholder="{{ texts.searchPlaceholder }}"
                aria-describedby="sizing-addon3" [(ngModel)]="searchFilterText" (keyup)="searchChange()">
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
                <input type="checkbox" [checked]="isSelected(option)" />                
                {{ option.name }}
            </a>
        </li>
    </ul>
</div>`
})
export class MultiselectDropdownComponent {
  @Input() options: Array<IMultiSelectOption>;
  @Input() settings: IMultiSelectSettings;
  @Input() texts: IMultiSelectTexts;
  @Output() selectionLimitReached = new EventEmitter();
  @Output() dropdownClosed = new EventEmitter();
  @Output() searchChanged = new EventEmitter();

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

  model: number[];
  title: string;
  differ: any;
  numSelected: number = 0;
  isVisible: boolean = false;
  searchFilterText: string = '';
  defaultSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
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
  }

  toggleDropdown() {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
      this.dropdownClosed.emit();
    }
  }

  isSelected(option: IMultiSelectOption): boolean {
    return this.model && this.model.indexOf(option.id) > -1;
  }

  setSelected(event: Event, option: IMultiSelectOption) {
    if (!this.model) {
      this.model = [];
    }
    let index = this.model.indexOf(option.id);
    if (index > -1) {
      this.model.splice(index, 1);
    } else {
      if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
        this.model.push(option.id);
      } else {
        if (this.settings.autoUnselect) {
          this.model.push(option.id);
          this.model.shift();
        } else {
          this.selectionLimitReached.emit(this.model.length);
          return;
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
    if (this.numSelected === 0) {
      this.title = this.texts.defaultTitle;
    } else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
      this.title = this.options
        .filter((option: IMultiSelectOption) =>
          this.model && this.model.indexOf(option.id) > -1
        )
        .map((option: IMultiSelectOption) => option.name)
        .join(', ');
    } else {
      this.title = this.numSelected
        + ' '
        + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
    }
  }

  searchChange() {
    this.searchChanged.emit({ query: this.searchFilterText });
  }
}
