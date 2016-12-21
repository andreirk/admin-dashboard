import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';
import { Lang } from './../../objects';
import { LANGUAGES     } from "./../../constants";

@Component({
    selector: 'language-switch',
    templateUrl: `
        <div class="form-group">
            <label for="exampleSelect">Select Language</label>
            <select 
                (click)="onClick($event)" 
                class="form-control" 
                id="exampleSelect">
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
   

    public languages : Lang[] = LANGUAGES;

    onClick(event){
        console.log('event =' + event.target.value)
        let obj = {
            old: this.model,
            new: event.target.value
        }
        this.model = event.target.value;
        this.changeLanguage.emit(obj)
    }


    ngOnInit() { }
}