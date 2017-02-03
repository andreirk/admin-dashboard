/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Pos } from '../../commons/model/pos';
import { MapMarkerViewModel } from '../../pages/merchant-manage/model/map-marker-view-model';

@Pipe({name: 'amPosListToMarkers'})
export class PosListToMarkersPipe implements PipeTransform {

  transform(posList: Pos[], selectedIndex: number): MapMarkerViewModel[] {
    if (!posList || posList.length === 0) return [];

    let markers: MapMarkerViewModel[] = posList.map(pos => Object.assign(new MapMarkerViewModel(), {
      lat: pos.address.geoPoint.lat,
      lon: pos.address.geoPoint.lon,
      icon: getIcon('\uf041', 'red')
    }));

    if (selectedIndex !== undefined) {
      markers[selectedIndex].icon = getIcon('\uf041', 'blue');
    }

    return markers;
  }
}

// get icon url for glyph
function getIcon(glyph, color ? , size = 40) {
  let canvas, ctx;
  canvas = document.createElement('canvas');
  canvas.width =  size/2 + 3;
  canvas.height = size;
  ctx = canvas.getContext('2d');
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.font = size + 'px FontAwesome';
  ctx.textBaseline="top";
  ctx.fillText(glyph, 0, 0);
  return canvas.toDataURL();
}
