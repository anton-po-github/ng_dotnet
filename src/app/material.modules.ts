import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

export const mat_modules = [MatIconModule, MatButtonModule, MatToolbarModule];

@NgModule({
  imports: mat_modules,
  exports: mat_modules
})
export class MaterialModules {}
