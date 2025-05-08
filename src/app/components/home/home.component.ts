import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { NavebarComponent } from "../navebar/navebar.component";
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service/product.service';
import Swal from 'sweetalert2';



import { TruncatePipe } from '../../pipes/truncate.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({

  selector: 'app-home,TruncatePipe',
  standalone: true,
  imports: [NavebarComponent,RouterModule,FormsModule],
  templateUrl:'./home.component.html',
  styleUrl: './home.component.css',

})
export class HomeComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  searchQuery: string = '';
    // Store only a single product
  errorMessage: string = '';
  products: Product[] = [];
  CartProduct:any[]=[];
  isVisible: boolean = false;
  addButton:boolean=false;
  amount:number=0;
  showVideo = false;
  drugImages: string[] = [
    "https://tse4.mm.bing.net/th?id=OIP._hfjck2DY3y4rDCzHUEd7AHaHa&pid=Api", // Brufen
    "https://tse1.mm.bing.net/th?id=OIP.QdXEFdNXjT2grIdPA4A7xAHaHa&pid=Api", // Antinal
    "https://tse1.mm.bing.net/th?id=OIP.U2aeir-D51jFZ5o7SoZupgHaHa&pid=Api", // Panadol Extra
    "https://tse4.mm.bing.net/th?id=OIP.3R0UOSw4mr1_h0XlD1VmnwHaHa&pid=Api", // Duphaston
    "https://m.media-amazon.com/images/I/51dfDhgmlFL.jpg",
    "https://cdn.altibbi.com/cdn/cache/large/image/2021/05/24/41e99577971dd5e734ebf9af5b5fe7c7.webp",
    "https://www.claritin.com/sites/g/files/vrxlpx50451/files/2024-10/claritin-pdp-hero-24h-tablets-10ct-front-1200x1154.png",
    "https://lh4.googleusercontent.com/proxy/ingBVfk8hBuoo64bEXM689sbZ93dKk8vE3tX-lXXXX_JmLCoaw4lGiyMEegVd1940ks6UWklovfElB7u1624xQLm91LnheUSJ1qNHHSQP4I3TA1Pg6tfi5OIJsoLZuAUXg",
    "https://dawadose.com/wp-content/uploads/2024/10/Flagyl-500mg-14-Tablets.jpg",
    "https://images-eu.ssl-images-amazon.com/images/I/81yEWxYtayL._AC_UL600_SR600,600_.jpg",
    "https://cdn.chefaa.com/filters:format(webp)/public/uploads/products/panadol-cold-and-flu-day-01664875291.png",
    "https://img.youm7.com/large/201802260938383838.jpg",
    "https://www.buscopan.com/dam/jcr:ba32304b-a371-47b3-bd31-8884d5930eb9/Buscopan-ENG-CLEAN-1500x1200.png",
    "https://tdawi.com/media/catalog/product/cache/c02fd180406f0a5f799ad7095a14ddcd/g/a/gaptin_300_mg_2__sc38rzjd79xttsal.jpg",
  ];

  panadolimages:string[]=[
    "https://tse1.mm.bing.net/th?id=OIP.U2aeir-D51jFZ5o7SoZupgHaHa&pid=Api", // Panadol Extra
    "https://cdn.chefaa.com/filters:format(webp)/public/uploads/products/panadol-cold-and-flu-day-01664875291.png",

  ]
  constructor(

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


  addToCart(product:any){

    // this.CartProduct=localStorage.getItem("cart")

    const productToAdd = {
      ...product,
      amount: 1  // لو المستخدم مدخلش كمية، نحط 1 افتراضيًا
    };
    if("cart" in localStorage){
      this.CartProduct=JSON.parse(localStorage.getItem("cart")!)
      let exist=this.CartProduct.find(item => item.id == product.id)
      if (exist){
        Swal.fire({
          title: 'المنتج مضاف في السله ',
          text: 'تمت الإضافة إلى السلة سابقاً',
          icon: 'success',
          confirmButtonText: 'حسناً'
        });
      }else{
        this.CartProduct.push(product)
        localStorage.setItem("cart",JSON.stringify(this.CartProduct))
      }

    }else{
      this.CartProduct.push(product)
      localStorage.setItem("cart",JSON.stringify(this.CartProduct))
    }
    // localStorage.setItem("cart",JSON.stringify(product))
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
