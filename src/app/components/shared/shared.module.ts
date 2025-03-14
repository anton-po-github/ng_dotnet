import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextInputComponent } from './text-input/text-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [TextInputComponent], exports: [TextInputComponent, ReactiveFormsModule]
})
export class SharedModule { }
