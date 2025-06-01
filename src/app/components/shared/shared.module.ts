import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from 'src/app/components/shared/material.modules';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { UploadComponent } from 'src/app/components/shared/components/upload/upload.component';
import { UniversalTableComponent } from './components/universal-table/universal-table.component';
import { TableTemplateDirective } from './components/universal-table/table-template.directive';
import { UniversalDialogComponent } from './components/universal-dialog/universal-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules,
    TableTemplateDirective
  ],
  declarations: [
    UploadComponent,
    SpinnerComponent,
    UniversalTableComponent,
    UniversalDialogComponent
  ],
  exports: [
    UploadComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    UniversalTableComponent,
    UniversalDialogComponent,
    TableTemplateDirective,
    MaterialModules
  ]
})
export class SharedModule {}
