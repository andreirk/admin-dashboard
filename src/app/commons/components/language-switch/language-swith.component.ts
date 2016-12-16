import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'language-switch',
    templateUrl: `
        <div class="form-group">
            <label for="exampleSelect1">Select Language</label>
            <select (click)="onClick($event)" (focusout)="onFocusOut($event)" (focus)="onFocus($event)" class="form-control" id="exampleSelect1">
            <option   value="{{lang.key}}" *ngFor="let lang of languages" >{{lang.name}}</option>
            </select>
        </div>
    `    
})
export class LanguageSwitchComponent implements OnInit {
    constructor() { }
    
    model = 'en'
    // @Input() languages: Array<string>
    @Output() changeLanguage = new EventEmitter()
    public languages = [
          {key: 'en',   name: 'English'},
          {key: 'ar',   name: 'Arabian'},
          {key: 'ru',   name: 'Russian'}
        ];

    onClick(event){
        console.log('event =' + event.target.value)
        let obj = {
            old: this.model,
            new: event.target.value
        }
        this.model = event.target.value;
        this.changeLanguage.emit(obj)
    }

    onFocus(event){
        this.model = event.target.value
        console.log(this.model)
    }

    onFocusOut(event){
        this.model = ''
    }

    ngOnInit() { }
}