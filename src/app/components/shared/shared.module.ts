import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';
import { UploadComponent } from 'src/app/components/shared/components/upload/upload.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [TextInputComponent, UploadComponent, SpinnerComponent],
  exports: [
    TextInputComponent,
    UploadComponent,
    SpinnerComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
