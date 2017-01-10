/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {WorkTimeType} from "../../shared/types";

export class WorkTime {
  public id: string = '';
  public type: WorkTimeType = WorkTimeType.REGULAR;
  public weekday: number = 1;
  public startTime: string = '';
  public endTime: string = '';

  constructor() {
  }
}
