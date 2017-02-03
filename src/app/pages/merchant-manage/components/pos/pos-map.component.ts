/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MapMarkerViewModel } from '../../model/map-marker-view-model';


export const DEFAULT_MAP_BOUNDS = {
  east: 50,
  west: -50,
  north: 50,
  south: -50
};

export const SINGLE_MARKER_BOUNDS_DELTA: number = 0.001;

@Component({
  selector: 'am-pos-map',
  providers: [],
  styleUrls: ['./style'],
  template: `
        <sebm-google-map [fitBounds]="mapBounds"
                         (mapClick)="onMapClicked($event)">

          <sebm-google-map-marker *ngFor="let marker of markers; let i = index"
                                  [latitude]="marker.lat"
                                  [longitude]="marker.lon"
                                  [iconUrl]="marker.icon"
                                  (markerClick)="onMarkerClicked(i)"></sebm-google-map-marker>
        </sebm-google-map>

`
})
export class PosMapComponent implements OnInit, OnChanges {

  @Input() markers: MapMarkerViewModel[] = [];
  @Output() markerClick = new EventEmitter<any>();
  @Output() mapClick = new EventEmitter<any>();

  private mapBounds = DEFAULT_MAP_BOUNDS;

  constructor() {
  }

  ngOnInit() {
    this.mapBounds = PosMapComponent.fitMapBounds(this.markers);
  }

  static fitMapBounds(markerViewModels: MapMarkerViewModel[]): any {

    if (markerViewModels && markerViewModels.length > 0) {
      if (markerViewModels.length === 1) {
        return {
          east: markerViewModels[0].lon + SINGLE_MARKER_BOUNDS_DELTA,
          west: markerViewModels[0].lon - SINGLE_MARKER_BOUNDS_DELTA,
          north: markerViewModels[0].lat + SINGLE_MARKER_BOUNDS_DELTA,
          south: markerViewModels[0].lat - SINGLE_MARKER_BOUNDS_DELTA
        };
      } else {
        return {
          east: Math.max(...markerViewModels.map(marker => marker.lon)),
          west: Math.min(...markerViewModels.map(marker => marker.lon)),
          north: Math.max(...markerViewModels.map(marker => marker.lat)),
          south: Math.min(...markerViewModels.map(marker => marker.lat))
        };
      }
    } else {
      return DEFAULT_MAP_BOUNDS;
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  onMapClicked(event) {
    this.mapClick.emit(event);
  }

  onMarkerClicked(modelIndex: number) {
    this.markerClick.emit(modelIndex);
  }
}

// get icon url for glyph
function getIcon(glyph, color ? , size = 40) {
  let canvas, ctx;
  canvas = document.createElement('canvas');
  canvas.width =  size + (size * 0.4);
  canvas.height = size + (size * 0.8);
  ctx = canvas.getContext('2d');
  if (color) {
    ctx.fillStyle = color;
  }
  ctx.font = (size * 0.9) + 'px FontAwesome';
  ctx.textBaseline="top";
  ctx.fillText(glyph, size/2 - 1, size - 1);
  return canvas.toDataURL();
}
