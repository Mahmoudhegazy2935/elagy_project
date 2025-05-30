import { Component } from '@angular/core';
import { Product } from '../../../../../models/product';
import { ProductService } from '../../../../../services/product.service/product.service';
import { NavebarAdminComponent } from '../../../navebar-admin/navebar-admin/navebar-admin.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NavebarAdminComponent, RouterModule,FormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  searchTerm: string = '';
  products: Product[] = [];
  selectedProduct?: Product;
  showEditForm = false;

  // خاصية لتخزين الصورة المختارة
  selectedImageFile?: File;

  constructor(private productService: ProductService) {}

  search() {
    this.productService.searchProduct(this.searchTerm).subscribe((result) => {
      this.products = result;
    });
  }

  selectProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.showEditForm = true;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        if (this.selectedProduct) {
          this.selectedProduct.imagePath = reader.result as string; // عرض الصورة مؤقتًا
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    if (!this.selectedProduct) return;

    const formData = new FormData();
    formData.append('id', this.selectedProduct.id.toString());
    formData.append('name', this.selectedProduct.name);
    formData.append('description', this.selectedProduct.description || '');
    formData.append('price', this.selectedProduct.price.toString());
    formData.append('quantity', this.selectedProduct.quantity.toString());

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.productService.updateProduct(this.selectedProduct.id, formData).subscribe(() => {
      this.showEditForm = false;
      this.selectedImageFile = undefined;
      this.search();
    });
  }

  deleteProduct(id: number) {
    if (confirm('هل أنت متأكد من حذف المنتج؟')) {
      this.productService.deleteproduct(id.toString()).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }

  cancelEdit() {
    this.showEditForm = false;
    this.selectedProduct = undefined;
  }
}
