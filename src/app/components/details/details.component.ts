import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import {  FormsModule, NgModel } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
// customOptionsCat: OwlOptions = {
//     loop: true,
//     mouseDrag: true,
//     touchDrag: false,
//     pullDrag: false,
//     dots: true,
//     dotsEach:true,
//     navSpeed: 700,
//     autoplay:true,
//     margin:8,
//     merge:true,
//     autoplayTimeout:4000,
//     autoplayHoverPause:true,
//     navText: ['', ''],
//     responsive: {
//       0: {
//         items: 1
//       },
//       400: {
//         items: 2
//       },
//       740: {
//         items: 3
//       },
//       940: {
//         items: 4
//       },
//       1100: {
//         items: 6
//       }
//     },
//     nav: false
//   }
private readonly _ProductsService = inject(ProductsService)

// @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;

selectedFile: File | null = null; // تخزين الملف هنا

onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(formValues: any) {

   if (!this.selectedFile) {
      console.error('يرجى اختيار صورة');
      return;
    }

    const formData = new FormData();

    formData.append('Item_ID', formValues.Item_ID);
    formData.append('Item_Name', formValues.Item_Name);
    formData.append('Description', formValues.Description);
    formData.append('Quantity', formValues.Quantity);
    formData.append('Price_in', formValues.Price_in);
    formData.append('Price_out', formValues.Price_out);
    formData.append('Discount', formValues.Discount);
    formData.append('Rate',"0");
    formData.append('Category_ID', formValues.Category_ID);
    formData.append('Sub_Category_ID', formValues.Sub_Category_ID);
    formData.append('Seller_ID', "1");
    formData.append('Image', this.selectedFile ); // إضافة الصورة

            formData.forEach((value, key) => {
  console.log(key, value);
});

    this._ProductsService.addOneProduct(formData).subscribe({
      next: (res) => {
          if(res.message  == "success"){

            console.log('Product added:', res)
          }
      } ,
      error: (error) => console.error('Error:', error),
    });

  }

  selectedOption: string = 'Select Sub Category';
}
