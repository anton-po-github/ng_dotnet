import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { IProduct } from '../products.component';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  standalone: false
})
export class AddUpdateProductComponent implements OnInit {
  public newMyProduct: IProduct = {
    id: null,
    productName: null,
    productDescription: null,
    discount: null,
    price: null
  };

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('productName')) {
      this.newMyProduct.productName =
        this.route.snapshot.paramMap.get('productName');
      this.newMyProduct.discount = this.route.snapshot.paramMap.get('discount');
      this.newMyProduct.price = this.route.snapshot.paramMap.get('price');
      this.newMyProduct.productDescription =
        this.route.snapshot.paramMap.get('productDescription');
      this.newMyProduct.id = this.route.snapshot.paramMap.get('id');
    }
  }

  public addUpdateProduct(): void {
    if (this.route.snapshot.paramMap.get('productName')) {
      this.updateOneProduct(this.newMyProduct.id);
    } else {
      this.addOneProduct();
    }
  }

  public addOneProduct(): void {
    this.productsService.addOneProduct(this.newMyProduct).subscribe({
      next: (result: { message: string }) => {
        if (result.message === 'product created') {
          this.router.navigate(['/products']);
        }

        this.resetNewMyProduct();
        this.productsService.onGetAllProducts$.next(true);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {}
    });
  }

  public updateOneProduct(productId: string): void {
    this.productsService
      .updateOneProduct(productId, this.newMyProduct)
      .subscribe({
        next: (result: { message: string }) => {
          if (result.message === 'Product updated') {
            this.router.navigate(['/products']);
          }

          this.resetNewMyProduct();

          this.productsService.onGetAllProducts$.next(true);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {}
      });
  }

  private resetNewMyProduct(): void {
    this.newMyProduct = {
      id: null,
      productName: null,
      productDescription: null,
      discount: null,
      price: null
    };
  }
}
