import { Component, ElementRef, inject, model, OnInit, ViewChild } from '@angular/core';
import {  FormsModule, NgModel } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/Interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:( P )=>{
          console.log(P.get("id"))

        this._ProductsService.GetOneProduct(P.get("id")).subscribe({
          next:(res)=>{
            this.detalisProduct=res
            console.log(this.detalisProduct)
          }
        })


      }
    })
  }


private readonly _ProductsService = inject(ProductsService)
private readonly _ActivatedRoute = inject(ActivatedRoute)



  detalisProduct:IProduct = {} as IProduct

selectedFile: File | null = null; 

onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onEdit() {
    console.log('بدايه  ');
   if (!this.selectedFile) {
      console.error('يرجى اختيار صورة');
      return;
    }

    const formData = new FormData();
    // formData.append('Item_ID', formValues.Item_ID);
    // formData.append('Item_Name', formValues.Item_Name);
    // formData.append('Description', formValues.Description);
    // formData.append('Quantity', formValues.Quantity);
    // formData.append('Price_in', formValues.Price_in);
    // formData.append('Price_out', formValues.Price_out);
    // formData.append('Discount', formValues.Discount);
    // formData.append('Rate',"0");
    // formData.append('Category_ID', formValues.Category_ID);
    // formData.append('Sub_Category_ID', formValues.Sub_Category_ID);
    // formData.append('Seller_ID', this._AuthServiceService.userData.nameid);
    formData.append('Itemimage', this.selectedFile ); // إضافة الصورة
    console.log('formData  ',formData);
    console.log('Item_ID  ',this.detalisProduct.Data.Item_ID);


    this._ProductsService.UpdateItemImage( this.detalisProduct.Data.Item_ID,formData).subscribe({
      next: (res) => {
          if(res.message  == "success"){
            console.log('Product added:', res)
          }
      } ,
      error: (error) => console.error('Error:', error),
    });

  }

  onEdit2() {
    const updatedProduct = {
      item_ID: this.detalisProduct.Data.Item_ID,
      image_Cover: this.detalisProduct.Data.Image_Cover,
      item_Name: this.detalisProduct.Data.Item_Name,
      description: this.detalisProduct.Data.Description,
      quantity: this.detalisProduct.Data.Quantity,
      price_in: this.detalisProduct.Data.Price_in,
      price_out: this.detalisProduct.Data.Price_out,
      discount: this.detalisProduct.Data.Discount,
      category_ID: this.detalisProduct.Data.Category_ID,
      sub_Category_ID: this.detalisProduct.Data.Sub_Category_ID,
      brand_ID: this.detalisProduct.Data.Brand_ID,
      crate_Date: this.detalisProduct.Data.Crate_Date,
    };

    this._ProductsService.UpdateProduct(updatedProduct).subscribe({
      next: (res) => {
        if (res.message === "success") {
          console.log('تم تعديل المنتج بنجاح');
        }
      },
      error: (err) => {
        console.error('حدث خطأ أثناء تعديل المنتج:', err);
      }
    });
  }
  DeleteItem(id :string | null){
    this._ProductsService.DeleteProduct(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{}

    })
  }
  selectedOption: string = 'Select Sub Category';
  selectedCatOption: string = 'Select Category';


}
