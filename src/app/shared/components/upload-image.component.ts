/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'am-upload-image',
  template: `
<style>
  .media-resources {
    display: block!important;
    max-height: 150px;
    max-width: 300px;
    width: auto;
    height: auto;
  }
</style>
<div>
  <div class="media">
    <img src="{{imageUrlResize}}" class="float-xs-left media-resources">
  </div>
  <label class="btn btn-secondary btn-file">
    {{title}}
    <input type="file"
           ngFileSelect
           [options]="uploadOptions"
           (onUpload)="handleUpload($event)"
           [hidden]="true">
  </label>
</div>`,
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
  }]
})
export class UploadImageComponent implements OnInit, ControlValueAccessor {
  @Input() title: string;
  @Input() folder: string;
  @Input() _imageUrl: string;
  private uploadOptions;

  constructor() {}

  ngOnInit() {
    this.uploadOptions = {
      url: '/catalog/mgmt/v1/upload-image?folder=' + this.folder,
      fieldName: 'imageFile',
      customHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Basic YWRtaW46MDAwMA=='
      }
    };
  }

  get imageUrlResize() {
    return this.imageUrl ? this._imageUrl.replace('image/upload/', 'image/upload/w_300/') : '';
  }

  handleUpload(data): void {
    const vm = this;
    if (data && data.response) {
      let response = JSON.parse(data.response);
      if (response.imageUrl) {
        this.imageUrl = response.imageUrl;
      }
    }
  }

// custom form control methods
  get imageUrl() {
    return this._imageUrl;
  }

  set imageUrl(val) {
    this._imageUrl = val;
    this.propagateChange(val);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.imageUrl = value;
    }
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
