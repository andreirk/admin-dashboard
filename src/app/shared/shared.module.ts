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

@NgModule({
  imports: [CommonModule, FormsModule, NgaModule],
  declarations: [SelectLangComponent,
    UploadImageComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter, ImageResizePipe,
    UPLOAD_DIRECTIVES],
  exports: [SelectLangComponent,
    UploadImageComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    AddressPipe, SuffixPipe, DefaultValuePipe, DriverLocationPipe, OrderStatusPipe, StringListFilter, ImageResizePipe,
    CommonModule, FormsModule, NgaModule]
})
export class SharedModule {
}
