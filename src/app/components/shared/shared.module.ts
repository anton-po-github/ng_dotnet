import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';
import { UploadComponent } from 'src/app/fetch-data/upload/upload.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [TextInputComponent, UploadComponent],
  exports: [TextInputComponent, UploadComponent, ReactiveFormsModule]
})
export class SharedModule {}
