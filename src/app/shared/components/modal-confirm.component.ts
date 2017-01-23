import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from "@angular/core/src/metadata/directives";

@Component({
  selector: 'am-modal-confirm',
  template: `
  <div style="margin-top: 35vh" class="modal fade" role="dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog" role="document" style="color: darkcyan">
      <div class="modal-content">
        <div class="modal-body">
          <strong>{{message}}</strong>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="onClick(true)">Confirm</button>
          <button type="button" class="btn btn-secondary" (click)="onClick(false)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ModalConfirmComponent {

  @Input() message: string = "Confirm action";
  @Output() answer = new EventEmitter();

  public visible = false;
  private visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  onClick(result: boolean) {
    this.answer.emit(result);
  }
}
