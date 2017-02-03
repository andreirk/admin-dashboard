import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { GlobalState } from '../../../../../global.state';

@Component({
  selector: 'ba-menu-item',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./baMenuItem.scss')],
  template: require('./baMenuItem.html')
})
export class BaMenuItem {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  constructor(private _state: GlobalState) {

  }

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }

  hideSideBar() {
    if (window.innerWidth < 900) {
      this._state.notifyDataChanged('menu.isCollapsed', true);
    }
  }
}
