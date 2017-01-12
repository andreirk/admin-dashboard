/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { routing } from './groups.routing';
import { SharedModule } from '../../shared/shared.module';
import { GroupCardComponent } from './components/group-card.component';
import { GroupListComponent } from './components/group-list.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    GroupListComponent,
    GroupCardComponent,
    GroupDetailsComponent
  ]
})
export default class GroupsModule { }
