/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LANGUAGES } from '../constants';
import { LangObj } from '../objects';

@Component({
  selector: 'am-select-lang',
  template: `
  <div class="form-group" [hidden]="showAlert">
    <select [(ngModel)]="lang" [ngModelOptions]="{standalone: true}"
          (change)="onChangeLang()"
          class="form-control">
      <option *ngFor="let lng of LANGS;" 
          class="dropdown-item" value="{{lng.key}}">{{lng.name}}</option>
    </select>
  </div>
  <div class="alert alert-warning" role="alert" [hidden]="!showAlert">
    <strong>Warning!</strong> Do you want to save before change language
    <button (click)="emitChangeLang(true)" class="btn btn-secondary">Yes</button>
    <button (click)="emitChangeLang(false)" class="btn btn-secondary">No</button>
  </div>
`
})
export class SelectLangComponent {
  @Input() lang: string;
  @Input() wasModified: string;
  @Output() onChange: EventEmitter<ChangeLangEvent> = new EventEmitter<ChangeLangEvent>();

  private prevLang: string;
  private showAlert: boolean = false;
  private LANGS: LangObj[] = LANGUAGES;

  constructor() { }

  ngOnInit() {
    this.prevLang = this.lang;
  }

  onChangeLang() {
    if (this.wasModified) {
      this.showAlert = true;
    } else {
      this.emitChangeLang(false);
    }
  }

  emitChangeLang(save: boolean) {
    this.onChange.emit(new ChangeLangEvent(save, this.lang, this.prevLang));
    this.showAlert = false;
    this.prevLang = this.lang;
  }
}

export class ChangeLangEvent {
  constructor(
    public save: boolean,
    public lang: string,
    public prevLang: string) { }
}
