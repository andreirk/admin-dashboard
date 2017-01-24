/*
 * Copyright © 2017 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Injectable } from '@angular/core';
import { WorkTimeModel } from '../model/work-time-model';
import { WorkTime } from '../../../commons/model/work-time';
import { WorkTimeService } from '../../../core/services/work-times/work-time.service';
import { Observable } from 'rxjs';
import { WorkTimeType } from '../../../shared/types';

const WORK_TIME_INTERSECTION_CODE: string = 'catalog.pos.worktime.intersection';
const START_AFTER_END_CODE: string = 'catalog.pos.worktime.start.after.end';

const WORK_TIME_INTERSECTION_ERROR_MESSAGE: string = ': work time intersection';
const START_AFTER_END_ERROR_MESSAGE: string = ': start time must be before end time';

@Injectable()
export class WorkTimeViewModelService {
  constructor(private workTimeService: WorkTimeService) {
  }

  static createWorkTimeModelRecord(weekDay: number, ramadan: boolean): WorkTimeModel {
    let newWP: WorkTimeModel = new WorkTimeModel();
    newWP.workPeriod = new WorkTime();
    newWP.workPeriod.weekday = weekDay + 1;
    newWP.workPeriod.startTime = '00:00';
    newWP.workPeriod.endTime = '24:00';
    newWP.workPeriod.type = ramadan ? WorkTimeType.RAMADAN : WorkTimeType.REGULAR;
    return newWP;
  }

  static sortWorkTimesByStartTime(viewModel: WorkTimeModel[][]) {
    viewModel.forEach(dayWorkPeriods => {
      dayWorkPeriods.sort((a: WorkTimeModel, b: WorkTimeModel) => {
        if (!a && !b) {
          return 0;
        }
        if (!a) return 1;
        if (!b) return -1;

        if (a.workPeriod.startTime < b.workPeriod.startTime) return -1;
        if (a.workPeriod.startTime > b.workPeriod.startTime) return 1;
        return 0;
      })
    });
  }

  fillWorkTimeViewModel(workTimes: WorkTime[], ramadan: boolean) {
    workTimes = workTimes.filter(wt => ramadan ? wt.type == WorkTimeType.RAMADAN : wt.type == WorkTimeType.REGULAR);

    let viewModel: WorkTimeModel[][] = [];

    if (viewModel) {
      for (let i = 0; i < 7; i++) {
        viewModel[i] = [];
      }
      for (let workTime of workTimes) {
        let weekday: number = workTime.weekday - 1;
        if (!viewModel[weekday]) {
          viewModel[weekday] = [];
        }
        let index: number = viewModel[weekday].length;
        viewModel[weekday][index] = Object.assign(new WorkTimeModel(), {workPeriod: workTime});
      }

      WorkTimeViewModelService.sortWorkTimesByStartTime(viewModel);
      return viewModel;
    }
  }

  compareAndSaveChanges(posId: string, viewModel: WorkTimeModel[][], originalViewModel: WorkTimeModel[][]) {
    const vm = this;
    for (let weekday = 0; weekday < 7; weekday++) {
      if (viewModel[weekday] && originalViewModel[weekday] && viewModel[weekday].length !== 0) {

        let length = viewModel[weekday].length;
        let originalLength = originalViewModel[weekday].length;

        if (length >= originalLength) {
          for (let worktimeIndex = 0; worktimeIndex < length; worktimeIndex++) {
            vm.saveWorkTime(posId, viewModel[weekday], originalViewModel[weekday], worktimeIndex);
          }
        }
      }
    }
  }

  saveWorkTime(posId: string, day: WorkTimeModel[], originalDay: WorkTimeModel[], worktimeIndex: number) {
    const vm = this;
    if (!originalDay[worktimeIndex] || !_.isEqual(day[worktimeIndex].workPeriod, originalDay[worktimeIndex].workPeriod)) {
      vm.workTimeService.savePosWorkTime(posId, day[worktimeIndex].workPeriod).catch(err => {
        return vm.handleError(day[worktimeIndex], err);
      }).subscribe(wt => {
        if (wt) {
          day[worktimeIndex] = Object.assign(new WorkTimeModel(), {workPeriod: wt});
          originalDay[worktimeIndex] = _.cloneDeep(day[worktimeIndex]);
        }
      });
    }
  }

  handleError(workTimeModel: WorkTimeModel, err): Observable<any> {
    const vm = this;
    workTimeModel.error = true;
    workTimeModel.errorMessage = 'Error';

    let body = JSON.parse(err._body);
    if (body[0]) {
      let code = body[0]['code'];

      if (code) {
        switch (code) {
          case WORK_TIME_INTERSECTION_CODE:
            workTimeModel.errorMessage += WORK_TIME_INTERSECTION_ERROR_MESSAGE;
            break;
          case START_AFTER_END_CODE:
            workTimeModel.errorMessage += START_AFTER_END_ERROR_MESSAGE;
            break;

        }
        return Observable.of(undefined);
      }
    }
    workTimeModel.errorMessage += ': ' + err.status + ' ' + err.statusText;
    return Observable.of(undefined);
  }

}
