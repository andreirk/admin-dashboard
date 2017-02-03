/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PointOnMap } from '../../../../commons/model/order';

@Component({
  selector: 'am-change-geo-point-card',
  providers: [],
  template: `
        <div class="alert alert-warning form-group">
          <div class="row card-margin-bottom">
            The resolved geo point differs from a current one. Please choose which one to stay.
          </div>
          <div class="row form-check">
            <label class="form-check-label" style="color: red">
              <input type="radio" class="form-check-input" name="radio" id="currentPointRadio" value="option1" (change)="onCurrentPointClick()">
              Current point:
              &nbsp;&nbsp;
              &nbsp;&nbsp;
              <span class="glyphicon glyphicon-map-marker"><i class="fa fa-map-marker"></i></span>
              &nbsp;&nbsp;
              <strong>({{currentPoint.lat}}, {{currentPoint.lon}})</strong>              
            </label>
          </div>
          <div class="row form-check">
            <label class="form-check-label"  style="color: blue">
              <input type="radio" class="form-check-input" name="radio" id="newPointRadios" value="option2" (change)="onNewPointClick()">
              Resolved point:
              &nbsp;&nbsp;
              <span class="glyphicon glyphicon-map-marker"><i class="fa fa-map-marker"></i></span>
              &nbsp;&nbsp;
              <strong>({{newPoint.lat}}, {{newPoint.lon}})</strong>
            </label>
          </div>
        </div>
`
})
export class ChangeGeoPointCardComponent {
  @Input() currentPoint: PointOnMap = new PointOnMap;
  @Input() newPoint: PointOnMap = new PointOnMap;

  @Output() pointClick: EventEmitter<PointClickEvent> = new EventEmitter<PointClickEvent>();

  onCurrentPointClick() {
    this.pointClick.emit(new PointClickEvent(this.currentPoint));
  }

  onNewPointClick() {
    this.pointClick.emit(new PointClickEvent(this.newPoint));
  }

}

export class PointClickEvent {
  constructor(public chosenPoint: PointOnMap){
  }
}
