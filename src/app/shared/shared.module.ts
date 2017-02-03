/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';
import { Pages } from './pages.component';
import { FormsModule } from '@angular/forms';
import { SelectLangComponent } from './components/select-lang.component';
import { UploadImageComponent } from './components/upload-image.component';
import { NgaModule } from '../theme/nga.module';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { CategoryTypeOptionsDirective } from './directives/category-type-options.directive';
import { SectionTypeOptionsDirective } from './directives/section-type-options.directive';
import { AddressPipe } from './pipes/address.pipe';
import { SuffixPipe } from './pipes/suffix.pipe';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { DriverLocationPipe } from './pipes/driver-location.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { OrderStatusOptionsDirective } from './directives/order-status-options.directive';
import { StringListFilter } from './pipes/string-list-filter.pipe';
import { ImageResizePipe } from './pipes/image-resize.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MultiselectDropdownComponent } from './components/multiselect-dropdown.component';
import { ModalConfirmComponent } from './components/modal-confirm.component';
import { VehicleTypeOptionsDirective } from './directives/vehicle-type-options.directive';
import { DriverStatusOptionsDirective } from './directives/driver-status-options.directive';
import { TimeInputComponent } from './components/time-input.component';
import { AmRatingComponent } from './components/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './components/datepicker.component';
import { NullIfEmptyDirective } from './directives/null-if-empty.directive';
import { MatchValueValidatorDirective } from './directives/match-value-validator.directive';
import { MarketingAttributeTypeOptionsDirective } from './directives/product-marketing-attributes-type-options.directive';
import { PosListToMarkersPipe } from './pipes/pos-list-to-markers.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbModule,
  ],
  declarations: [SelectLangComponent,
    UploadImageComponent,
    MultiselectDropdownComponent,
    ModalConfirmComponent,
    TimeInputComponent,
    AmRatingComponent,
    DatepickerComponent,
    CategoryTypeOptionsDirective,
    MarketingAttributeTypeOptionsDirective,
    SectionTypeOptionsDirective,
    VehicleTypeOptionsDirective,
    DriverStatusOptionsDirective,
    NullIfEmptyDirective,
    MatchValueValidatorDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter,
    OrderByPipe, ImageResizePipe, PosListToMarkersPipe,
    UPLOAD_DIRECTIVES],
  exports: [SelectLangComponent,
    UploadImageComponent,
    MultiselectDropdownComponent,
    ModalConfirmComponent,
    TimeInputComponent,
    AmRatingComponent,
    DatepickerComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    MarketingAttributeTypeOptionsDirective,
    VehicleTypeOptionsDirective,
    DriverStatusOptionsDirective,
    NullIfEmptyDirective,
    MatchValueValidatorDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter,
    OrderByPipe, ImageResizePipe, PosListToMarkersPipe,
    CommonModule, FormsModule, NgaModule, NgbModule]
})
export class SharedModule {
}
