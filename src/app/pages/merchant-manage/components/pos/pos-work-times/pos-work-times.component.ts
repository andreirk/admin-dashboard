/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkTimeService } from '../../../../../core/services/work-times/work-time.service';
import { ViewChild } from '@angular/core/src/metadata/di';
import { WorkTimeModel } from '../../../model/work-time-model';
import { WorkTimeViewModelService } from '../../../services/work-time-view-model.service';

@Component({
  selector: 'am-pos-work-times',
  providers: [
    WorkTimeViewModelService
  ],
  styleUrls: ['../style'],
  template: require('./pos-work-times.component.html')
})
export class PosWorkTimesComponent implements OnInit, OnChanges {

  @Input() posId: string;
  @ViewChild('workTimesForm') form;

  private weekDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  private viewModel: WorkTimeModel[][] = [];
  private originalViewModel: WorkTimeModel[][] = [];

  private ramadan: boolean = false;

  constructor(private workTimeService: WorkTimeService,
              private wtViewModelService: WorkTimeViewModelService) {
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
          vm.viewModel = vm.wtViewModelService.fillWorkTimeViewModel(workTimes, vm.ramadan);
          vm.originalViewModel = _.cloneDeep(vm.viewModel);
        });
    }
  }

  setRamadan(ramadan: boolean) {
    this.ramadan = ramadan;
    this.ngOnInit();
  }

  addWorkTime(weekDay: number) {
    const vm = this;
    if (!vm.viewModel[weekDay]) {
      vm.viewModel[weekDay] = [];
    }
    let nextWtIndex = vm.viewModel[weekDay].length;
    vm.viewModel[weekDay][nextWtIndex] = WorkTimeViewModelService.createWorkTimeModelRecord(weekDay, vm.ramadan);
  }

  deleteWorkTime(weekday: number, workTimeIndex: number) {
    const vm = this;
    let wt = vm.viewModel[weekday][workTimeIndex].workPeriod;
    if (wt) {
      if (wt.id) {
        vm.workTimeService.deleteWorkTime(wt.id).subscribe();
      }
    }
    vm.viewModel[weekday] = vm.viewModel[weekday].filter(wt => wt != vm.viewModel[weekday][workTimeIndex]);
    vm.originalViewModel[weekday] = _.cloneDeep(vm.viewModel[weekday]);
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(400)
      .subscribe(values => {
        vm.wtViewModelService.compareAndSaveChanges(vm.posId, vm.viewModel, vm.originalViewModel);
      });
  }

}
