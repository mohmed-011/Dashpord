import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CarouselModule,FormsModule , ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {


  private readonly _ProductsService = inject(ProductsService)
  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _ProductDetailsService = inject(ProductDetailsService)
  private  itemId :any
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
      this.itemId = formValues.Item_ID
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
      formData.append('Seller_ID', this._AuthServiceService.userData.nameid);
      formData.append('Image', this.selectedFile ); // إضافة الصورة

      this._ProductsService.addOneProduct(formData).subscribe({
        next: (res) => {
            if(res.message  == "success"){
              this.SetPhoneForm()
              console.log('Product added:', res)

            }
        } ,
        error: (error) => console.error('Error:', error),
      });

    }


    PhoneForm:FormGroup = new FormGroup({
      ram: new FormControl(null , [Validators.required]),
      memory: new FormControl(null , [Validators.required ]),
      cpu: new FormControl(null , [Validators.required ]),
      color: new FormControl(null , [Validators.required ]),
      screen_Size: new FormControl(null , [Validators.required ]),
      })

      SetPhoneForm():void{
           if(this.PhoneForm.valid){
            this._ProductDetailsService.addPhoneProduct(this.PhoneForm.value,this.itemId).subscribe({
              next:(res)=>{
                if(res.message  == "success"){
                  console.log(res);
                }
              },
              error:(err:HttpErrorResponse)=>{
                // show error in html to user
                // this.mgerror = err.error.message;
                // this.isLoding=false;
                console.log(err);
              }
            })

             console.log(this.PhoneForm);
             console.log(this.PhoneForm.value);
          }
          else{
            this.PhoneForm.markAllAsTouched();
          }

        }
    selectedOption: string = 'Select Sub Category';
    selectedCatOption: string = 'Select Category';


}
