/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'amImageResize'
})
export class ImageResizePipe implements PipeTransform {
  transform(imageUrl: string): string {
    return imageUrl ? imageUrl.replace('image/upload/', 'image/upload/w_300/') : '';
  }

}

