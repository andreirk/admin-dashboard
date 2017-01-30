/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: "am-rating-component",
  template: `
<ngb-rating [(rate)]="rating" [readonly]="true" max="5">
  <template let-fill="fill">
    <span [hidden]="!(fill === 100)" class="rating-star rating-filled" [ngStyle]="{'font-size': size + 'rem'}">&#9733;</span>
    <span [hidden]="!(fill === 0)" class="rating-star" [ngStyle]="{'font-size': size + 'rem'}">&#9733;</span>
    <span [hidden]="!(fill < 100 && fill > 0)" class="rating-star" [ngStyle]="{'font-size': size + 'rem'}">
      <span class="half" [style.width.%]="fill">&#9733;</span>&#9733;
    </span>
  </template>
</ngb-rating>
`,
  styles: [`
.rating-star {
  position: relative;
  display: inline-block;
  color: #b0c4de;
}
.rating-filled {
  color: whitesmoke;
}
.half {
  position: absolute;
  display: inline-block;
  overflow: hidden;
  color: whitesmoke;
}`]
})
export class AmRatingComponent {
  @Input() size: number;
  @Input() rating: number;
}
