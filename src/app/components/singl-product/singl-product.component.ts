import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service/product.service';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';
import { NavebarComponent } from "../navebar/navebar.component";

@Component({
  selector: 'app-singl-product',
  standalone: true,
  imports: [NavebarComponent],
  templateUrl: './singl-product.component.html',
  styleUrl: './singl-product.component.css'
})
export class SinglProductComponent {
  product: Product | undefined;
  CartProduct:any[]=[];
  panadolimages: string='https://tse4.mm.bing.net/th?id=OIP._hfjck2DY3y4rDCzHUEd7AHaHa&pid=Api';
  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private productsrvice: ProductService,
  ) {}
  ngOnInit(): void {
    this.getProduct();
    this.getProductbyname();
  }

  getProduct(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.productsrvice.getproductbyid(id.toString()).subscribe((product) => {
      this.product = product;  // <== FIXED
    });
  }

  getProductbyname(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.productsrvice.getProductByName(name).subscribe((products) => {
        if (products.length > 0) {
          this.product = products[0];
        } else {
          this.product = undefined;
        }
      });
    }
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
      console.log(product)
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

}
