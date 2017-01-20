/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

export class WorkTimeModel {
  public workTimeId: string = '';
  public weekDay: number = 0;

  public startTimeHour: string = '';
  public startTimeMinute: string = '';

  public endTimeHour: string = '';
  public endTimeMinute: string = '';

  public error: boolean = false;
  public errorMessage: string = '';

}
