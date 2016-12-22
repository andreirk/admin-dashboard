/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'am-upload-image',
  template: `
<ba-picture-uploader 
  (onUploadCompleted)="onUpload($event)"
  (onRemove)="onRemove($event)"
  [picture]="imageUrlResize"   
  [uploaderOptions]="uploadOptions"></ba-picture-uploader>
`,
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
  }]
})
export class UploadImageComponent implements OnInit, ControlValueAccessor {
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

  onUpload(data) {
    let imageUrl = JSON.parse(data.response).imageUrl;
    if (imageUrl) {
      this.imageUrl = imageUrl;
    }
  }

  onRemove(event) {
    this.imageUrl = '';
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
