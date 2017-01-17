/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangeLangEvent } from '../../../../shared/components/select-lang.component';
import { GroupService } from '../../../../core/services/groups/group.service';
import { Group } from '../../../../commons/model/group';

@Component({
  selector: 'am-group-details',
  providers: [
    GroupService
  ],
  template: require('./group-details.component.html')
})
export class GroupDetailsComponent {
  @ViewChild('groupForm') form;

  private groupId: string;
  private lang: string = 'en';
  private group: Group = new Group();
  private groupOriginal: Group = new Group();
  private wasModified: boolean = false;
  private rtlDetect = require('rtl-detect');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private groupService: GroupService) {
  }

  ngOnInit() {
    const vm = this;
    vm.groupId = vm.route.snapshot.params['groupId'];

    if (vm.groupId !== 'new') {
      vm.changeLang(false, vm.lang);
    }
  }

  ngAfterViewInit() {
    const vm = this;
    this.form.control.valueChanges
      .subscribe(values => {
        vm.wasModified = !_.isEqual(vm.group, vm.groupOriginal);
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
    let observ: Observable<Group>;
    if (save && prevLang) {
      observ = vm.groupService.save(vm.group, prevLang).mergeMap(group => {
        vm.groupId = group.id;
        return vm.groupService.get(vm.groupId, lang);
      });
    } else {
      observ = vm.groupService.get(vm.groupId, lang);
    }

    observ.subscribe((group: Group) => {
      vm.group = group;
      vm.groupOriginal = _.cloneDeep(group);
      vm.lang = lang;
    });
  }

  saveGroup() {
    const vm = this;
    vm.groupService.save(vm.group, vm.lang).subscribe(
      group => {
        vm.group = group;
        vm.groupOriginal = _.cloneDeep(group);
        vm.wasModified = false;
        vm.groupId = group.id;
        vm.router.navigate(['../', group.id], {relativeTo: this.route});
      }
    );
  }
}

