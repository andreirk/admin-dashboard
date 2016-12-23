/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Pos } from '../../../commons/model/pos';
import { PosService } from '../../../core/services/poses/pos.service';
import { Peer } from '../../../commons/model/order';

@Component({
  selector: 'am-pos-peer-details',
  template: `
<h3>{{pos.name}}</h3>
<p>Address: {{pos.address | amAddress}}</p>  
`
})
export class PosPeerDetailsComponent implements OnInit {
  @Input() peer: Peer;
  @Input() lang: string;
  private pos: Pos = new Pos();

  constructor(private posService: PosService) {
  }

  ngOnInit() {
    const vm = this;
    vm.posService.get(vm.peer.posId, vm.lang).subscribe(pos => { vm.pos = pos; });
  }
}
