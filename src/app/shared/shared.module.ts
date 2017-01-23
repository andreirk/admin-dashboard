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

@NgModule({
  imports: [CommonModule, FormsModule, NgaModule],
  declarations: [SelectLangComponent,
    UploadImageComponent,
    MultiselectDropdownComponent,
    ModalConfirmComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    VehicleTypeOptionsDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter, OrderByPipe, ImageResizePipe,
    UPLOAD_DIRECTIVES],
  exports: [SelectLangComponent,
    UploadImageComponent,
    MultiselectDropdownComponent,
    ModalConfirmComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    VehicleTypeOptionsDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter, OrderByPipe, ImageResizePipe,
    CommonModule, FormsModule, NgaModule]
})
export class SharedModule {
}
