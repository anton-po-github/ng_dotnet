import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from 'src/app/material.modules';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { UploadComponent } from 'src/app/components/shared/components/upload/upload.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModules],
  declarations: [UploadComponent, SpinnerComponent],
  exports: [
    UploadComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    MaterialModules
  ]
})
export class SharedModule {}
