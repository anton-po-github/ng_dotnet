import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';

import { AddUpdateProductComponent } from './add-update-product/add-update-product.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'add-update-product',
        component: AddUpdateProductComponent
      }
    ])
  ],
  declarations: [ProductsComponent, AddUpdateProductComponent]
})
export class ProductsModule {}
