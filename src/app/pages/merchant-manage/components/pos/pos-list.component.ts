/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit } from '@angular/core';
import { Pos } from '../../../../commons/model/pos';
import { MerchantBackendService } from '../../../../core/services/merchants/merchant-backend.service';
import { PosService } from '../../../../core/services/pos/pos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'am-pos-list',
  providers: [],
  styleUrls: ['./style'],
  template: `
  <div class="col-sm-12 card-margin-bottom">
      <a class="btn btn-primary align-bottom" 
          [routerLink]="['new']"
          routerLinkActive="active">New POS</a>

      <a class="btn btn-primary align-bottom pull-right" 
          (click)="toggleMapVisibility()">{{(showMap) ? 'Hide Map' : 'Show Map'}}</a>
  </div>
  
  <div class="row">
    <div [ngClass]="{'col-sm-6' : showMap, 'col-sm-10': !showMap}">
     <am-pos-card *ngFor="let pos of displayedList | amOrderBy: 'name' : true"
            [pos]="pos"
            [lang]="lang"
            (onDelete)="deletePos($event)"></am-pos-card>
     
    <div class="col-sm-3 card-margin-bottom">
     <a *ngIf="posSelected"
          class="btn btn-primary align-bottom" 
          (click)="onShowAllClicked()">Show All</a>
    </div>
    </div>
    <div *ngIf="showMap" class="col-sm-6 card-margin-bottom">
      <am-pos-map [markers]="posList | amPosListToMarkers: selectedIndex" (mapClick)="onMapClicked($event)" (markerClick)="onMarkerClicked($event)"></am-pos-map>
    </div>
  </div>
  `
})

export class PosListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private merchantService: MerchantBackendService, private posService: PosService) {
  }

  private merchantId: string;
  private posList: Pos[] = [];
  private lang: string = 'en';

  private displayedList: Pos[] = [];
  private posSelected: boolean = false;
  private selectedIndex: number = undefined;

  private showMap: boolean = false;

  ngOnInit() {
    const vm = this;

    vm.route.parent.params.subscribe(params => {
      if (params['merchantId']) {
        vm.merchantId = params['merchantId'];
        this.loadMerchantsPosList();
      }
    });

  }

  loadMerchantsPosList() {
    const vm = this;
    if (this.merchantId) {
      vm.merchantService.getMerchantsPos(vm.merchantId, vm.lang)
        .subscribe(posList => {
          vm.posList = posList;
          vm.displayedList = _.cloneDeep(posList);
          vm.posSelected = false;
        })

    }
  }

  deletePos(event) {
    this.posList = this.posList.filter(pos => pos.id != event.value);
  }

  toggleMapVisibility() {
    this.showMap = !this.showMap;
  }

  onMapClicked(event){
    this.displayAll();
  }

  onMarkerClicked(event){
    const vm = this;
    vm.displayedList = [];
    vm.displayedList[0] = vm.posList[event];
    vm.posSelected = true;
    vm.selectedIndex = event;
  }

  onShowAllClicked() {
    this.displayAll();
  }

  displayAll() {
    const vm = this;
    vm.displayedList = _.cloneDeep(vm.posList);
    vm.posSelected = false;
    vm.selectedIndex = undefined;
  }


}
