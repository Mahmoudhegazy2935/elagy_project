import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { NavebarComponent } from "../navebar/navebar.component";
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service/product.service';
import Swal from 'sweetalert2';



import { TruncatePipe } from '../../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Cart2Service } from '../../services/cart2.service/cart2.service';
import { SpinnerComponent } from "../spinner/spinner.component";


@Component({

  selector: 'app-home,TruncatePipe',
  standalone: true,
  imports: [NavebarComponent, RouterModule, FormsModule, SpinnerComponent],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  searchQuery: string = '';
  loading:boolean=false;
    // Store only a single product
  errorMessage: string = '';
  products: Product[] = [];
  CartProduct:any[]=[];
  isVisible: boolean = false;
  addButton:boolean=false;
  amount:number=0;
  showVideo = false;

  constructor(
    private cartService:Cart2Service,
    private productsrvice: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.products.forEach((item: any) => {
      Object.assign(item, { quantity: 1, total: item.price });
    });

    window.addEventListener('scroll', this.toggleScrollBtn);
  }

  search() {
    this.loading=true;
    this.errorMessage = '';
      // Reset previous result


    if (this.searchQuery.trim()) {
      this.productsrvice.searchProduct(this.searchQuery).subscribe({
        next: (data) => {
          this.loading=false;
           if (data) {
            this.products = data;  // Store the product
          } else {
            this.errorMessage = ` لا توجد نتائج ل ${this.searchQuery}`;
          }
        },
        error: (err) => {
          this.loading=false;
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
    this.loading=true;
    this.productsrvice
      .getAllProducts()
      .subscribe((data) => {
        this.loading=false;
        this.products = data
      });


  }


  truncateText(text: any, limit: number = 20): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }





  showAlert() {


    Swal.fire({
      title: 'تم!',
      text: 'تمت الإضافة إلى السلة بنجاح',
      icon: 'success',
      confirmButtonText: 'حسناً'
    });
  }


 addToCart(product: any) {
  const productToAdd = {
    ...product,
    amount: 1
  };

  let cart: any[] = [];

  if ("cart" in localStorage) {
    cart = JSON.parse(localStorage.getItem("cart")!);
    const exist = cart.find(item => item.id == product.id);

    if (exist) {
      Swal.fire({
        title: 'المنتج مضاف في السلة',
        text: 'تمت الإضافة إلى السلة سابقاً',
        icon: 'info',
        confirmButtonText: 'حسناً'
      });
      return;
    }
  }

  cart.push(productToAdd);
  this.cartService.updateCart(cart); // this both saves to localStorage and notifies listeners

  Swal.fire({
    title: 'تم!',
    text: 'تمت الإضافة إلى السلة بنجاح',
    icon: 'success',
    confirmButtonText: 'حسناً'
  });
}






  toggleScrollBtn = () => {
    const btn = document.getElementById('scrollToTopBtn');
    if (btn) {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    }
  };

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  // for scrolling products


scrollLeft() {
  this.scrollContainer.nativeElement.scrollLeft -= 300;
}

scrollRight() {
  this.scrollContainer.nativeElement.scrollLeft += 300;
}



}
