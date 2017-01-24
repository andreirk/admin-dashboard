/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

import { WorkTime } from '../../../commons/model/work-time';
export class WorkTimeModel {
  public workPeriod: WorkTime = new WorkTime();
  public error: boolean = false;
  public errorMessage: string = '';
}
