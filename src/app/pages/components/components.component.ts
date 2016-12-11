import {Component} from '@angular/core';

@Component({
  selector: 'components',
  styles: [],
  template: ` <h2>Component page</h2>
  <router-outlet></router-outlet>
  `
})
export class Components {

  constructor() {
  }

}
