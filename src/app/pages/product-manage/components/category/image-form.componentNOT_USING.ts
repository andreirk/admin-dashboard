import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService }    from './category.service';
import { Ng2Uploader } from 'ng2-uploader';



@Component({
    selector: 'toyou-image-form',
    templateUrl: `

    `
})
export class ImageUploader implements OnInit {
    constructor() { 

    }
    
  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };


    
    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    @Input() 
    options: Object = {
      url: 'http://localhost:10050/upload'
    };

    @Output()
    onUpload = new EventEmitter()

    sizeLimit = 2000000;
    
    handleUpload(data): void {
      if (data && data.response) {
        data = JSON.parse(data.response);
        this.uploadFile = data;
      }
    }
    
    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
    
    beforeUpload(uploadingFile): void {
      if (uploadingFile.size > this.sizeLimit) {
        uploadingFile.setAbort();
        alert('File is too large');
      }
    }
    

    ngOnInit() { }
}