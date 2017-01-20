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
import { Output } from "@angular/core/src/metadata/directives";
import { ModalComponent } from "../../../../../shared/components/modal.component";

@Component({
  selector: 'am-pos-details',
  providers: [],
  template: require('./pos-details.component.html'),
  styleUrls: ['../style']
})
export class PosDetailsComponent {

  @ViewChild('posForm') form;

  @ViewChild('deleteModal')
  public readonly deleteModal: ModalComponent;

  @ViewChild('deactivateGuardModal')
  public readonly deactivateGuardModal: ModalComponent;

  private guardEvent = new EventEmitter();

  private lang: string = 'en';
  private merchantId: string;
  private posId: string;
  private pos: Pos = new Pos();
  private posOriginal: Pos = new Pos();
  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  private mapHidden: boolean = true;

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

  onGuardClick(result: boolean) {
    this.deactivateGuardModal.hide();
    this.guardEvent.emit(result);
  }

  canDeactivate() {
    if (this.wasModified) {
/*
      this.deactivateGuardModal.show();
      this.guardEvent.subscribe(event => {
        return event;
      });
*/

      return confirm('Unsaved changes will be lost. Are you shure you want to leave this page?');
    } else {
      return true;
    }
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
    vm.form.control.valueChanges
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

  initMap() {
    const vm = this;
    setTimeout(function() {
      vm.mapHidden = false;
    }, 400);
  }

}
