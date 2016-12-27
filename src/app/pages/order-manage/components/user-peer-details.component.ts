/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../core/services/users/user.service';
import { User } from '../../../commons/model/user';
import { Peer } from '../../../commons/model/order';

@Component({
  selector: 'am-user-peer-details',
  template: `
<h3>{{user.firstName + ' ' + user.lastName}}</h3>
<p>Phone: {{user.phoneNumber}}</p>
<p>Address: {{peer.address | amAddress}}</p>
`
})
export class UserPeerDetailsComponent implements OnInit {
  @Input() peer: Peer = new Peer();
  private user: User = new User();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    const vm = this;
    vm.userService.get(vm.peer.userId).subscribe(user => { vm.user = user; });
  }
}
