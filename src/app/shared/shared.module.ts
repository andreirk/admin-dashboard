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

@NgModule({
  imports: [CommonModule, FormsModule, NgaModule],
  declarations: [SelectLangComponent,
    UploadImageComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective, UPLOAD_DIRECTIVES],
  exports: [SelectLangComponent,
    UploadImageComponent,
    CategoryTypeOptionsDirective,
    SectionTypeOptionsDirective,
    CommonModule, FormsModule, NgaModule]
})
export class SharedModule {
}
