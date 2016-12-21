/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "am-upload-image",
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
    <img src="{{imageUrl}}" class="float-xs-left media-resources">
  </div>
  <label class="btn btn-secondary btn-file">
    {{title}}
    <input type="file"
           ngFileSelect
           [options]="uploadOptions"
           (onUpload)="handleUpload($event)"
           [hidden]="true">
  </label>
</div>`
})
export class UploadImageComponent {
  @Input() title: string;
  @Input() folder: string;
  @Input() imageUrl: string;
  @Output() onUpload: EventEmitter<any> = new EventEmitter();
  private uploadOptions;

  constructor() { }

  ngOnInit() {
    this.uploadOptions = {
      url: '/catalog/mgmt/v1/upload-image?folder=' + this.folder,
      customHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Basic YWRtaW46MDAwMA=='
      },
      multipart: false
    };
  }
  handleUpload(data): void {
    const vm = this;
    if (data && data.response) {
      let response = JSON.parse(data.response);
      if (response.imageUrl) {
        vm.onUpload.emit({
          imageUrl: response.imageUrl
        });
      }
    }
  }
}
