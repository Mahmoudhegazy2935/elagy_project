import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/product.service/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  productForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      amount: [0, Validators.required],
      imagePath: [''],
      image: [null]
    });
  }

  get f() {
    return this.productForm.controls;
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ [controlName]: file });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.entries(this.productForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    this.productService.createProduct(formData).subscribe({
      next: (response: any) => {
        this.successMessage = 'تم إضافة المنتج بنجاح!';
        this.productForm.reset();
        this.submitted = false;
        this.router.navigate(['/products']);
      },
      error: (error: any) => {
        this.errorMessage = 'حدث خطأ أثناء إضافة المنتج.';
        console.error(error);
      }
    });
  }
}
