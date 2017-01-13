/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { CommonOrderStatus } from '../../../shared/types';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class OrderFilterParamsForm {
  public orderStatuses: CommonOrderStatus[] = [];
  public orderPersons: string[] = [];
  public createdFrom: NgbDateStruct;
  public createdTo: NgbDateStruct;

  constructor() {
  }
}
