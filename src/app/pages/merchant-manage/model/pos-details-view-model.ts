/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */

import { Pos } from '../../../commons/model/pos';
import { DeliveryAddress, PointOnMap } from '../../../commons/model/order';
import { MapMarkerViewModel } from './map-marker-view-model';
export class PosDetailsViewModel {

  public pos: Pos = new Pos();
  public posSaved: Pos = new Pos();

  public wasModified: boolean = false;

  public lastModifiedAddress: DeliveryAddress = new DeliveryAddress();
  public lastModifiedPoint: PointOnMap = new PointOnMap();

  public resolvedAddress: DeliveryAddress = new DeliveryAddress();
  public resolvedPoint: PointOnMap = new PointOnMap();

  public unresolvedAddress: boolean = false;
  public showResolved: boolean = false;

  public mapMarkersViewModel: MapMarkerViewModel[] = [];
}
