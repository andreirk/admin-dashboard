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
import { PointClickEvent } from '../change-geo-point-card.component';
import { MapMarkerViewModel } from '../../../model/map-marker-view-model';
import { PosDetailsViewModel } from '../../../model/pos-details-view-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'am-pos-details',
  providers: [],
  template: require('./pos-details.component.html'),
  styleUrls: ['../style']
})
export class PosDetailsComponent implements OnInit {

  @ViewChild('posForm') form: NgForm;
  @ViewChild('detailsForm') detailsForm: NgForm;

  @ViewChild('deleteConfirmModal')
  public readonly deleteModal: ModalConfirmComponent;
  @ViewChild('deactivateConfirmModal')
  public readonly deactivateConfirmModal: ModalConfirmComponent;
  @ViewChild('replaceAddressModal')
  public readonly replaceAddressModal: ModalConfirmComponent;

  private lang: string = 'en';
  private merchantId: string;
  private posId: string;

  private model: PosDetailsViewModel = new PosDetailsViewModel();

  private mapMarkersViewModel: MapMarkerViewModel[] = [];

  private rtlDetect = require('rtl-detect');

  private confirmDeleteMessage = 'Delete this POS?';
  private leaveThisPageMessage = 'Unsaved changes will be lost. Are you sure you want to leave this page?';
  private replaceAddressMessage = 'Replace address?';

  private mapHidden: boolean = true;

  private guardSubject: Subject<boolean> = new Subject<boolean>();
  private showModalConfirmSubject: Subject<string> = new Subject<string>();
  private confirmAddressSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private posService: PosService,
              private posViewModelService: PosViewModelService) {
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
    vm.showModalConfirmSubject.asObservable().subscribe(message => {
      vm.replaceAddressMessage = message;
      vm.replaceAddressModal.show();
    });
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
    if (this.model.wasModified) {
      this.deactivateConfirmModal.show();
      return this.guardSubject.asObservable();
    } else {
      return Observable.of(true);
    }
  }


  getPos(posId: string, lang: string) {
    const vm = this;
    vm.posService.get(vm.posId, vm.lang).subscribe(pos => {
      vm.model = Object.assign(new PosDetailsViewModel(), {
        pos: pos,
        posSaved: _.cloneDeep(pos),
        lastModifiedAddress: _.cloneDeep(pos.address),
        lastModifiedPoint: _.cloneDeep(pos.address.geoPoint)
      });
    });
  }

  ngAfterViewInit() {
    const vm = this;
    vm.form.control.valueChanges.debounceTime(500)
      .subscribe(values => {
        vm.model.wasModified = !_.isEqual(vm.model.pos, vm.model.posSaved);
        if (PosViewModelService.checkAddressLinesModified(vm.model.pos.address, vm.model.lastModifiedAddress)) {
          vm.model = vm.posViewModelService.geocodeAddress(vm.model, vm.lang);
        } else if(!_.isEqual(vm.model.pos.address.geoPoint, vm.model.lastModifiedPoint)) {
          vm.model = vm.posViewModelService.reverseGeocode(vm.model, vm.showModalConfirmSubject, vm.confirmAddressSubject, vm.lang);
        }
        vm.mapMarkersViewModel = PosViewModelService.updatePosMarkerViewModel(vm.model.showResolved, vm.model.pos.address.geoPoint, vm.model.resolvedPoint);
      });
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
      observPosId = vm.posService.savePos(vm.merchantId, vm.model.pos, vm.model.posSaved, prevLang);
    } else {
      observPosId = Observable.of(vm.posId);
    }

    observPosId.mergeMap(posId => {
      return vm.posService.get(posId, lang);
    }).subscribe((pos: Pos) => {
      vm.posId = pos.id;
      vm.model = Object.assign(new PosDetailsViewModel(), {
        pos: pos,
        posSaved: _.cloneDeep(pos),
        lastModifiedAddress: _.cloneDeep(pos.address),
        lastModifiedPoint: _.cloneDeep(pos.address.geoPoint)
      });
      vm.lang = lang;
    });
  }

  savePos() {
    const vm = this;
    if (PosViewModelService.checkRequiredFields(vm.model.pos)) {
      vm.posService.savePos(vm.merchantId, vm.model.pos, vm.model.posSaved, vm.lang).subscribe(
        posId => {
          if (posId) {
            vm.posId = posId;
            vm.model.pos.id = posId;
            vm.model.wasModified = false;
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
    vm.mapMarkersViewModel = PosViewModelService.updatePosMarkerViewModel(vm.model.showResolved, vm.model.pos.address.geoPoint, vm.model.resolvedPoint);
    setTimeout(function () {
      vm.mapHidden = false;
    }, 200);
  }

  onMapClicked($event) {
    const vm = this;
    vm.model.showResolved = false;
    if (vm.model.pos && vm.model.pos.address && vm.model.pos.address.geoPoint) {
      vm.model.pos.address.geoPoint = Object.assign(new PointOnMap(), {lat: $event.coords.lat, lon: $event.coords.lng});
      vm.model = vm.posViewModelService.reverseGeocode(vm.model, vm.showModalConfirmSubject, vm.confirmAddressSubject, vm.lang);
      vm.mapMarkersViewModel = PosViewModelService.updatePosMarkerViewModel(vm.model.showResolved, vm.model.pos.address.geoPoint, vm.model.resolvedPoint);
    }
  }

  onReplaceAddressConfirm(event) {
    const vm = this;
    vm.replaceAddressModal.hide();
    vm.confirmAddressSubject.next(event);
  }

  onPointChosen(event: PointClickEvent) {
    const vm = this;
    vm.model.pos.address.geoPoint = event.chosenPoint;
    vm.model.lastModifiedPoint = _.cloneDeep(vm.model.pos.address.geoPoint);
    vm.model.showResolved = false;
    vm.mapMarkersViewModel = PosViewModelService.updatePosMarkerViewModel(vm.model.showResolved, vm.model.pos.address.geoPoint, vm.model.resolvedPoint);
  }

  onMarkerClicked(event) {
    const vm = this;
    if (vm.model.showResolved) {
      vm.onPointChosen({chosenPoint: {lat: vm.mapMarkersViewModel[event].lat, lon: vm.mapMarkersViewModel[event].lon}});
    }

  }

}


