/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';
import { PosService } from '../../../../../core/services/pos/pos.service';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Pos } from '../../../../../commons/model/pos';
import { ViewChild } from '@angular/core/src/metadata/di';
import { ChangeLangEvent } from '../../../../../shared/components/select-lang.component';
import { Observable, Subject } from 'rxjs';
import { ModalConfirmComponent } from '../../../../../shared/components/modal-confirm.component';
import { GoogleGeocodingService } from '../../../../../core/services/geocoding/google-geocoding.service';
import { DeliveryAddress, PointOnMap } from '../../../../../commons/model/order';
import { PosViewModelService } from '../../../services/pos-view-model.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'am-pos-details',
  providers: [],
  template: require('./pos-details.component.html'),
  styleUrls: ['../style']
})
export class PosDetailsComponent implements OnInit {

  @ViewChild('posForm') form;
  @ViewChild('deleteConfirmModal')
  public readonly deleteModal: ModalConfirmComponent;
  @ViewChild('deactivateConfirmModal')
  public readonly deactivateConfirmModal: ModalConfirmComponent;
  @ViewChild('replaceAddressModal')
  public readonly replaceAddressModal: ModalConfirmComponent;

  private lang: string = 'en';
  private merchantId: string;
  private posId: string;

  private pos: Pos = new Pos();
  private posSaved: Pos = new Pos();
  private lastModifiedAddress: DeliveryAddress = new DeliveryAddress();
  private resolvedAddress: DeliveryAddress = new DeliveryAddress();

  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  private confirmDeleteMessage = 'Delete this POS?';
  private leaveThisPageMessage = 'Unsaved changes will be lost. Are you sure you want to leave this page?';
  private replaceAddressMessage = 'Replace address?';

  private mapHidden: boolean = true;

  private guardSubject: Subject<boolean> = new Subject<boolean>();

  private unresolvedAddress: boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private posService: PosService,
              private geocodingService: GoogleGeocodingService) {
  }

  ngOnInit() {
    const vm = this;
    vm.merchantId = vm.route.parent.snapshot.params['merchantId'];
    let id = vm.route.snapshot.params['posId'];
    if (id !== 'new') {
      vm.posId = id;
      vm.getPos(vm.posId, vm.lang);
      vm.changeLang(false, vm.lang);
    }
  }

  onDeleteConfirm(event) {
    if (event === true) this.deletePos(this.posId);
    else this.deleteModal.hide();
  }

  onDeactivateConfirm(event) {
    this.deactivateConfirmModal.hide();
    this.guardSubject.next(event);
  }

  canDeactivate() {
    if (this.wasModified) {
      this.deactivateConfirmModal.show();
      return this.guardSubject.asObservable();
    } else {
      return Observable.of(true);
    }
  }


  getPos(posId: string, lang: string) {
    const vm = this;
    vm.posService.get(vm.posId, vm.lang).subscribe(pos => {
      vm.pos = pos;
      vm.posSaved = _.cloneDeep(pos);
      vm.lastModifiedAddress = _.cloneDeep(pos.address);
    });
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(500)
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.pos, vm.posSaved);

        if (PosViewModelService.checkAddressLinesModified(vm.pos.address, vm.lastModifiedAddress)) {
          vm.geocodeAddress();
        }
        vm.lastModifiedAddress = _.cloneDeep(vm.pos.address);
      });
  }

  geocodeAddress() {
    const vm = this;
    let googleResponsePromise = vm.geocodingService.geocodeAddress(vm.pos.address, vm.lang);
    if (googleResponsePromise) {
      googleResponsePromise.then(result => vm.onGeocodeResponse(result));
    }
  }

  onGeocodeResponse(response) {
    const vm = this;
    let point = GoogleGeocodingService.getGeoPointFromGeocodingResponseJson(response.json);
    if (point) {
      vm.pos.address.geoPoint = point;
      vm.unresolvedAddress = false;
    } else {
      vm.unresolvedAddress = true;
    }
  }

  get langDirection() {
    return this.rtlDetect.getLangDir(this.lang);
  }

  onChangeLang(event: ChangeLangEvent) {
    this.changeLang(event.save, event.lang, event.prevLang);
  }

  changeLang(save: boolean, lang: string, prevLang?: string) {
    const vm = this;
    let observPosId: Observable<string>;
    if (save && prevLang) {
      observPosId = vm.posService.savePos(vm.merchantId, vm.pos, vm.posSaved, prevLang);
    } else {
      observPosId = Observable.of(vm.posId);
    }

    observPosId.mergeMap(posId => {
      return vm.posService.get(posId, lang);
    }).subscribe((pos: Pos) => {
      vm.posId = pos.id;
      vm.pos = pos;
      vm.posSaved = _.cloneDeep(pos);
      vm.lang = lang;
    });
  }

  savePos() {
    const vm = this;
    if (PosViewModelService.checkRequiredFields(vm.pos)) {
      vm.posService.savePos(vm.merchantId, vm.pos, vm.posSaved, vm.lang).subscribe(
        posId => {
          if (posId) {
            vm.posId = posId;
            vm.pos.id = posId;
            vm.wasModified = false;
          }
          this.router.navigate(['../', vm.posId], {relativeTo: this.route});
        }
      );
    }

  }

  deletePos(posId: string) {
    this.posService.deletePos(posId).subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

  onPanelChanged(event: NgbPanelChangeEvent) {
    if (event.panelId == 'map-panel') this.initMap();
  }

  initMap() {
    const vm = this;
    setTimeout(function () {
      vm.mapHidden = false;
    }, 400);
  }

  onMapClicked($event) {
    const vm = this;
    if (vm.pos && vm.pos.address && vm.pos.address.geoPoint) {
      vm.pos.address.geoPoint = Object.assign(new PointOnMap(), {lat: $event.coords.lat, lon: $event.coords.lng});
      let googleResponsePromise = vm.geocodingService.reverseGeocodeLocation(vm.pos.address.geoPoint, vm.lang);
      if (googleResponsePromise) {
        googleResponsePromise.then(result => vm.onReverseGeocodeResponse(result));
      }
    }
  }

  onReverseGeocodeResponse(response) {
    const vm = this;
    vm.resolvedAddress = GoogleGeocodingService.getAddressFromReverseGeocodingResponseJson(response.json);
    if (vm.resolvedAddress
      && PosViewModelService.checkAddressLinesModified(vm.pos.address, vm.resolvedAddress)) {
      let currentAddressString = GoogleGeocodingService.getAddressString(vm.pos.address);
      let resolvedAddressString = GoogleGeocodingService.getAddressString(vm.resolvedAddress);

      vm.replaceAddressMessage = 'Resolved address differs from current address.\n\nCurrent address:\n' + currentAddressString
        + '\n\nResolved address:\n' + resolvedAddressString + '\n\nReplace current address?';

      vm.replaceAddressModal.show();
    }
  }

  onReplaceAddressConfirm(event) {
    const vm = this;
    if (event === true) {
      vm.pos.address = PosViewModelService.copyAddressLines(vm.pos.address, vm.resolvedAddress);
      vm.lastModifiedAddress = _.cloneDeep(vm.pos.address);
    }
    vm.replaceAddressModal.hide();
  }
}
