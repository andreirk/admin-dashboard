/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, EventEmitter } from "@angular/core";
import { PosService } from "../../../../../core/services/pos/pos.service";
import * as _ from "lodash";
import { ActivatedRoute, Router } from "@angular/router";
import { Pos } from "../../../../../commons/model/pos";
import { ViewChild } from "@angular/core/src/metadata/di";
import { ChangeLangEvent } from "../../../../../shared/components/select-lang.component";
import { Observable } from "rxjs";
import { WorkTimeService } from "../../../../../core/services/work-times/work-time.service";
import { Output } from "@angular/core/src/metadata/directives";
import { ModalComponent } from "../../../../../shared/components/modal.component";

@Component({
  selector: 'am-pos-details',
  providers: [
    PosService,
    WorkTimeService
  ],
  template: require('./pos-details.component.html')
})
export class PosDetailsComponent {

  @ViewChild('posForm') form;

  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  private lang: string = 'en';
  private merchantId: string;
  private posId: string;
  private pos: Pos = new Pos();
  private posOriginal: Pos = new Pos();
  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  @Output() onDelete = new EventEmitter();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private posService: PosService) {
  }

  ngOnInit() {
    const vm = this;
    vm.route.parent.params.subscribe(parentParams => {
      if (parentParams['merchantId']) {
        vm.merchantId = parentParams['merchantId'];
      }
    });

    vm.route.params.subscribe(params => {
      if (params['posId']) {
        if (params['posId'] !== 'new') {
          vm.posId = params['posId'];
          vm.getPos(vm.posId, vm.lang);
          vm.changeLang(false, vm.lang);
        }
      }
    });
  }

  getPos(posId: string, lang: string) {
    const vm = this;
    vm.posService.get(vm.posId, vm.lang).subscribe(pos => {
      vm.pos = pos;
      vm.posOriginal = _.cloneDeep(pos);
    });
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.pos, vm.posOriginal);
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
      observPosId = vm.posService.savePos(vm.merchantId, vm.pos, vm.posOriginal, prevLang);
    } else {
      observPosId = Observable.of(vm.posId);
    }

    observPosId.mergeMap(posId => {
      return vm.posService.get(posId, lang);
    }).subscribe((pos: Pos) => {
      vm.posId = pos.id;
      vm.pos = pos;
      vm.posOriginal = _.cloneDeep(pos);
      vm.lang = lang;
    });
  }

  savePos() {
    const vm = this;
    vm.posService.savePos(vm.merchantId, vm.pos, vm.posOriginal, vm.lang).subscribe(
      posId => {
        if (posId) {
          vm.posId = posId;
          vm.wasModified = false;
        }
        this.router.navigate(['../', vm.posId], {relativeTo: this.route});
      }
    );

  }

  deletePos(posId: string) {
    this.posService.deletePos(posId).subscribe(res => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }

}
