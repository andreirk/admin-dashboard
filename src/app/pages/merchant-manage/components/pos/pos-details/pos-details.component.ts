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
import { Observable, Subject } from "rxjs";
import { ModalConfirmComponent } from "../../../../../shared/components/modal-confirm.component";

@Component({
  selector: 'am-pos-details',
  providers: [],
  template: require('./pos-details.component.html'),
  styleUrls: ['../style']
})
export class PosDetailsComponent {

  @ViewChild('posForm') form;

  @ViewChild('deleteConfirmModal')
  public readonly deleteModal: ModalConfirmComponent;

  @ViewChild('deactivateConfirmModal')
  public readonly deactivateConfirmModal: ModalConfirmComponent;

  private lang: string = 'en';
  private merchantId: string;
  private posId: string;
  private pos: Pos = new Pos();
  private posOriginal: Pos = new Pos();
  private wasModified = false;
  private rtlDetect = require('rtl-detect');

  private confirmDeleteMessage = 'Delete this POS?';
  private leaveThisPageMessage = 'Unsaved changes will be lost. Are you sure you want to leave this page?';

  private mapHidden: boolean = true;

  private guardSubject: Subject<boolean> = new Subject<boolean>();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private posService: PosService) {
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
    setTimeout(function () {
      vm.mapHidden = false;
    }, 400);
  }

}
