import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface IProduct {
  id: string;
  productName: string;
  productDescription: string;
  discount: string;
  price: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: false
})
export class ProductsComponent {
  public products$: Observable<Array<IProduct>>;

  constructor(
    private router: Router,
    private productsService: ProductsService
  ) {
    this.productsService.onGetAllProducts$
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe((value: boolean) => {
        if (value) {
          setTimeout(() => {
            this.getAllProducts();
          }, 300);
        }
      });
  }

  public updateProduct(product: IProduct): void {
    console.log(product);

    this.router.navigate(['/products/add-update-product', product]);
  }

  public deleteProduct(productId: string): void {
    this.productsService.deleteProduct(productId).subscribe({
      next: (result: { message: string }) => {
        console.log(result);
        if (result.message === 'Product deleted') {
          this.getAllProducts();
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  private getAllProducts(): void {
    this.products$ = this.productsService.getAllProducts();
  }
}
