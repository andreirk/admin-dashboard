/**
 * Created by asokolov on 1/27/17.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({

    selector: 'am-product-media',
    styles: [`

.media-item {
  margin: 20px;
}

label > input{ 
  visibility: hidden; 
  position: absolute; 
}
label > input + img{ 
  cursor:pointer;
  border:2px solid transparent;
}
label > input:checked + img{ 
  border:2px solid #a2ff4f;
}
`],
    template: `

  <div class="row" >
      <div class="col-sm-3 media-item" *ngFor="let item of mediaItems">
      
          <div class="col-sm-11 border-box-blue">
             <label>
                <input type="radio" name="fb" value="small" />
                <img src="{{item.url}}" width="160" height="100" >
             </label>
            
          </div>
      </div>
  
  </div>

`
})
export class ProductMediaResourceComponent implements OnInit {

  @Input() mediaItems = [
    {url: 'http://res.cloudinary.com/dglgkomis/image/upload/v1485515970/products/mcud8wfd2ymvzxmquhvg.jpg'},
    {url: 'http://res.cloudinary.com/dglgkomis/image/upload/v1485515970/products/mcud8wfd2ymvzxmquhvg.jpg'},
    {url: 'http://res.cloudinary.com/dglgkomis/image/upload/v1485515970/products/mcud8wfd2ymvzxmquhvg.jpg'},
    ];
  constructor() { }

  ngOnInit() { }

}
