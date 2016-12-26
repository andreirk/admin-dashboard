import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main row">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <div class="row">
      <footer class="al-footer clearfix">
        <div class="al-footer-right"></div>
        <div class="al-footer-main clearfix">
          <div class="al-copy">&copy; <a href="http://toyou.com" target='_blank'>toyou.com</a> 2016</div>
          <ul class="al-share clearfix">
  
          </ul>
        </div>
      </footer>
    </div>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor() {
  }

  ngOnInit() {
  }
}
