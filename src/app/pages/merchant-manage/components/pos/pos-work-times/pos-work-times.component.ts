/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { WorkTimeService } from "../../../../../core/services/work-times/work-time.service";
import { WorkTime } from "../../../../../commons/model/work-time";
import { ViewChild } from "@angular/core/src/metadata/di";
import { WorkTimeModel } from "../../../model/work-time-model";
import { WorkTimeType } from "../../../../../shared/types";
import { Observable } from "rxjs";

@Component({
  selector: 'am-pos-work-times',
  providers: [],
  styleUrls: ['../style'],
  template: require('./pos-work-times.component.html')
})

export class PosWorkTimesComponent implements OnInit, OnChanges {

  @Input() posId: string;
  @ViewChild('workTimesForm') form;

  private weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  private viewModel: WorkTimeModel[][] = [];
  private originalViewModel: WorkTimeModel[][] = [];

  private ramadan: boolean = false;

  private WORK_TIME_INTERSECTION_CODE: string = 'catalog.pos.worktime.intersection';
  private START_AFTER_END_CODE: string = 'catalog.pos.worktime.start.after.end';


  constructor(private workTimeService: WorkTimeService) {
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {
    const vm = this;
    if (vm.posId) {
      this.loadPosWorkTimes();
    }
  }

  loadPosWorkTimes() {
    const vm = this;
    if (vm.posId) {
      vm.workTimeService.getAllPosWorkTimes(vm.posId)
        .subscribe(workTimes => {
          vm.fillModel(workTimes);
        })
    }
  }

  fillModel(workTimes: WorkTime[]) {
    const vm = this;
    workTimes = workTimes.filter(wt => vm.ramadan ? wt.type == WorkTimeType.RAMADAN : wt.type == WorkTimeType.REGULAR);

    vm.viewModel = [];
    for (let i = 0; i < 7; i++) {
      vm.viewModel[i] = [];
    }
    for (let workTime of workTimes) {
      let weekday: number = workTime.weekday - 1;
      if (!vm.viewModel[weekday]) {
        vm.viewModel[weekday] = [];
      }
      let index: number = vm.viewModel[weekday].length;
      vm.viewModel[weekday][index] = vm.workTimeToModelTransformer(workTime);
    }

    vm.sortWorkTimesByStartTime();
    vm.originalViewModel = _.cloneDeep(vm.viewModel);
  }

  sortWorkTimesByStartTime() {
    const vm = this;
    return vm.viewModel.forEach(dayWorkPeriods => {
      dayWorkPeriods.sort((a: WorkTimeModel, b: WorkTimeModel) => {
        if (!a && !b) {
          return 0;
        }
        if (!a) return 1;
        if (!b) return -1;

        let aStartTime: string = a.startTimeHour + ':' + a.startTimeMinute;
        let bStartTime: string = b.startTimeHour + ':' + b.startTimeMinute;

        if (aStartTime < bStartTime) return -1;
        if (aStartTime > bStartTime) return 1;
        return 0;
      })
    })
  }

  convertMinutesNumberToString(minutes: number): string {
    minutes = Math.abs(minutes) % 60;
    return (minutes < 10) ? '0' + minutes : '' + minutes;
  }

  convertHoursNumberToString(hours: number): string {
    hours = Math.abs(hours) % 24;
    return (hours < 10) ? '0' + hours : '' + hours;
  }


  setRamadan(ramadan: boolean) {
    this.ramadan = ramadan;
    this.ngOnInit();
  }

  deleteWorkTime(weekday: number, index: number) {
    const vm = this;
    let wt = vm.viewModel[weekday][index];
    if (wt) {
      let wtId = wt.workTimeId;
      if (wtId) {
        vm.workTimeService.deleteWorkTime(wtId).subscribe();
      }
    }
    vm.viewModel[weekday] = vm.viewModel[weekday].filter(wt => wt != vm.viewModel[weekday][index])
  }

  saveWorkTime(weekday: number, index: number) {
    const vm = this;
    let wp = vm.viewModel[weekday][index];
    let wt = vm.modelToWorkTimeTransformer(wp, weekday);
    vm.workTimeService.savePosWorkTime(vm.posId, wt).catch(err => {
      return vm.handleError(err, weekday, index);
    }).subscribe(wt => {
      if (wt) {
        vm.viewModel[weekday][index] = vm.workTimeToModelTransformer(wt);

        vm.originalViewModel[weekday][index] = _.cloneDeep(vm.viewModel[weekday][index]);
      }

    })
  }

  handleError(err, weekday: number, index: number): Observable<any> {
    const vm = this;

    vm.viewModel[weekday][index].error = true;
    vm.viewModel[weekday][index].errorMessage = 'Error';

    let body = JSON.parse(err._body);
    if (body[0]) {
      let code = body[0]['code'];
      if (code) {
        switch (code) {
          case vm.WORK_TIME_INTERSECTION_CODE:
            vm.viewModel[weekday][index].errorMessage += ': work time intersection';
            break;
          case vm.START_AFTER_END_CODE:
            vm.viewModel[weekday][index].errorMessage += ': start time must be before end time';
            break;

        }
        return Observable.of(undefined);
      }
    }
    vm.viewModel[weekday][index].errorMessage += ': ' + err.status + ' ' + err.statusText;
    return Observable.of(undefined);
  }

  modelToWorkTimeTransformer(workTimeModel: WorkTimeModel, weekday: number): WorkTime {
    if (!workTimeModel) return undefined;

    const vm = this;
    let wt = new WorkTime();
    wt.weekday = weekday + 1;
    wt.type = vm.ramadan ? WorkTimeType.RAMADAN : WorkTimeType.REGULAR;

    let start = vm.convertHoursNumberToString(+workTimeModel.startTimeHour) + ':' + vm.convertMinutesNumberToString(+workTimeModel.startTimeMinute);
    let end = vm.convertHoursNumberToString(+workTimeModel.endTimeHour) + ':' + vm.convertMinutesNumberToString(+workTimeModel.endTimeMinute);

    wt.startTime = start;
    wt.endTime = end;

    wt.id = workTimeModel.workTimeId;

    return wt;
  }

  workTimeToModelTransformer(workTime: WorkTime): WorkTimeModel {
    if (!workTime) return undefined;

    const vm = this;
    let wp = new WorkTimeModel();

    let start: string[] = workTime.startTime.split(':');
    wp.startTimeHour = start[0];
    wp.startTimeMinute = start[1];

    let end: string[] = workTime.endTime.split(':');
    wp.endTimeHour = end[0];
    wp.endTimeMinute = end[1];

    wp.weekDay = workTime.weekday - 1;
    wp.workTimeId = workTime.id;

    return wp;
  }


  addWorkTime(weekDay: number) {
    const vm = this;
    if (!vm.viewModel[weekDay]) {
      vm.viewModel[weekDay] = [];
    }
    let nextWtIndex = vm.viewModel[weekDay].length;
    let newWP: WorkTimeModel = new WorkTimeModel();
    newWP.weekDay = weekDay;
    newWP.startTimeHour = '00';
    newWP.startTimeMinute = '00';
    newWP.endTimeHour = '24';
    newWP.endTimeMinute = '00';
    vm.viewModel[weekDay][nextWtIndex] = newWP;
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(300)
      .subscribe(values => {
        vm.compareAndSaveChanges();
      });
  }

  compareAndSaveChanges() {
    const vm = this;
    for (let weekday = 0; weekday < 7; weekday++) {
      vm.checkWeekDayForChangesAndSave(weekday);
    }
  }

  checkWeekDayForChangesAndSave(weekday: number) {
    const vm = this;
    let day = vm.viewModel[weekday];
    let originalDay = vm.originalViewModel[weekday];
    if (day && originalDay) {
      let length = day.length;
      let originalLength = originalDay.length;
      if (length >= originalLength) {
        for (let i = 0; i < length; i++) {
          if (!originalDay[i] || !_.isEqual(day[i], originalDay[i])) {
            vm.saveWorkTime(weekday, i);
          }
        }
      }
    }
  }

}
