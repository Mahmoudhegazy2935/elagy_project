import { Component, NgModule } from '@angular/core';
import { NavebarComponent } from "../navebar/navebar.component";
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service/product.service';



import { TruncatePipe } from '../../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({

  selector: 'app-home,TruncatePipe',
  standalone: true,
  imports: [NavebarComponent,RouterModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  searchQuery: string = '';
  product: any = null;  // Store only a single product
  errorMessage: string = '';
  products: Product[] = [];
  isVisible: boolean = false;
  constructor(

    private productsrvice: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.products.forEach((item: any) => {
      Object.assign(item, { quantity: 1, total: item.price });
    });
  }

  search() {
    this.errorMessage = '';
      // Reset previous result


    if (this.searchQuery.trim()) {
      this.productsrvice.searchProduct(this.searchQuery).subscribe({
        next: (data) => {
           if (data) {
            this.products = data;  // Store the product
          } else {
            this.errorMessage = ` لا توجد نتائج ل ${this.searchQuery}`;
          }
        },
        error: (err) => {
          console.error('Error fetching product', err);
          this.errorMessage = ` لا توجد نتائج ل ${this.searchQuery}`;
        }
      });
    }
  }

  onSearch() {
    this.isVisible = this.searchQuery.length > 0;
  }


  getProducts() {
    this.productsrvice
      .getAllProducts()
      .subscribe((data) => (this.products = data));
      console.log(this.products)

  }


  truncateText(text: any, limit: number = 20): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  // addToCart(product: any): void {
  //   this.cartservice.addtocart(product);
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Added to Cart',
  //     text: 'The product has been successfully added to the cart.',
  //     showConfirmButton: false,
  //     timer: 900,
  //   });
  // }
}
