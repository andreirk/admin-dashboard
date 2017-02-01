/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { DriverStatusService } from '../../services/driver-status.service';
import { driverStatusColorsMap, vehicleTypeIconMap } from '../../model/driver-const';
import { DriverViewModelService } from '../../services/driver-view-model.service';
import { CanComponentDeactivate } from '../../../../core/services/guards/can-deactivate-guard.service';
import { ModalConfirmComponent } from '../../../../shared/components/modal-confirm.component';

@Component({
  selector: 'am-driver-tabs',
  template: require('./driver-tabs.component.html')
})

export class DriverTabsComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  @ViewChild('deactivateConfirmModal')
  public readonly deactivateConfirmModal: ModalConfirmComponent;
  private guardSubject: Subject<boolean> = new Subject<boolean>();

  private driverId: string;
  private paramsSubscr: Subscription;
  private leaveThisPageMessage = 'Unsaved changes will be lost. Are you sure you want to leave this page?';


  constructor (private route: ActivatedRoute,
               private router: Router,
               private vmService: DriverViewModelService) {
  }

  ngOnInit() {
    const vm = this;
    vm.paramsSubscr = vm.route.params.subscribe(params => {
      this.driverId = params['driverId'];
      if (vm.driverId !== 'new') {
        vm.vmService.updateDriver(parseInt(vm.driverId, 10));
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscr.unsubscribe();
  }

  canDeactivate() {
    if (this.vmService.wasModified) {
      this.deactivateConfirmModal.show();
      return this.guardSubject.asObservable();
    } else {
      return Observable.of(true);
    }
  }

  onDeactivateConfirm(event) {
    this.deactivateConfirmModal.hide();
    this.guardSubject.next(event);
  }

  getStatus(): string {
    return String(DriverStatusService.getStatus(this.vmService.driverLocation)).replace('_', ' ');
  }

  getStatusColor(): string {
    return driverStatusColorsMap.get(DriverStatusService.getStatus(this.vmService.driverLocation));
  }

  getIcon() {
    return vehicleTypeIconMap.get(this.vmService.driver.capacity);
  }

  saveDriver() {
    const vm = this;
    this.vmService.saveDriver().subscribe((driverId) => {
      vm.router.navigate(['../', driverId, 'general'], {relativeTo: vm.route});
    });
  }
}
