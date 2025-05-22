import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from 'src/app/material.modules';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { UploadComponent } from 'src/app/components/shared/components/upload/upload.component';
import { UniversalTableComponent } from './components/universal-table/universal-table.component';
import { TableTemplateDirective } from './components/universal-table/table-template.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    TableTemplateDirective
  ],
  declarations: [UploadComponent, SpinnerComponent, UniversalTableComponent],
  exports: [
    UploadComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    UniversalTableComponent,
    TableTemplateDirective,
    MaterialModules
  ]
})
export class SharedModule {}
