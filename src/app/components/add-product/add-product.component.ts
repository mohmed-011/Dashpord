import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductDetailsService } from '../../core/services/product-details.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SelectFiltersService } from '../../core/services/select-filters.service';
import { ICategory } from '../../core/Interfaces/icategory';
import { ISubCategory } from '../../core/Interfaces/isub-category';
import { IBrand } from '../../core/Interfaces/ibrand';
import { ImageUploaderComponent } from '../app-image-uploader/app-image-uploader.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CarouselModule,FormsModule , ReactiveFormsModule  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{

    categoryList:ICategory[]=[]
    subCategoryList:ISubCategory[]=[]
    brandList:IBrand[]=[]



  ngOnInit(): void {
    this._SelectFiltersService.GetAllCategory().subscribe({
      next:(res)=>{
        this.categoryList = res
        console.log(this.categoryList);

      }
    })
  }

  onCategoryChange(event: Event) {
     const target = event.target as HTMLSelectElement; // تحويل target إلى HTMLSelectElement
    const categoryId = Number(target.value); // استخراج القيمة وتحويلها إلى رقم

    if (categoryId) {
      console.log(categoryId);
      this._SelectFiltersService.GetAllSubCategoryByCat(categoryId).subscribe({
        next:(res)=>{
          this.subCategoryList = res
          console.log(res);
        }
      })
    }
  }
    onSubCategoryChange(event: Event) {
     const target = event.target as HTMLSelectElement; // تحويل target إلى HTMLSelectElement
    const subCategoryId = Number(target.value); // استخراج القيمة وتحويلها إلى رقم

    if (subCategoryId) {
      console.log(subCategoryId);
      this._SelectFiltersService.GetSubCategoryBrands(subCategoryId).subscribe({
        next:(res)=>{
          this.brandList = res.Brands
          console.log(this.brandList);
        }
      })
    }
  }

  private readonly _ProductsService = inject(ProductsService)
  private readonly _SelectFiltersService = inject(SelectFiltersService)

  private readonly _AuthServiceService = inject(AuthServiceService)
  private readonly _ProductDetailsService = inject(ProductDetailsService)
  private  itemId :any
  // @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;

  selectedFile:  File | null = null; // تخزين الملف هنا 0
  selectedFile1: File | null = null; // تخزين الملف هنا 1
  selectedFile2: File | null = null; // تخزين الملف هنا 2
  selectedFile3: File | null = null; // تخزين الملف هنا 3
  selectedFile4: File | null = null; // تخزين الملف هنا 4

  onFileSelected1(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile1 = input.files[0];
      }
    }
  onFileSelected2(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile2 = input.files[0];
      }
    }
  onFileSelected3(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile3 = input.files[0];
      }
    }
  onFileSelected4(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile4 = input.files[0];
      }
    }
  onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }

    onSubmit(formValues: any) {
      let userId: number | null = localStorage.getItem('userID') !== null
      ? Number(localStorage.getItem('userID'))
      : null;
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
      formData.append('Seller_ID', userId !== null ? userId.toString() : '');
      formData.append('Brand_ID', formValues.Brand_ID);
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
             console.log(this.PhoneForm.value);
          }
          else{
            this.PhoneForm.markAllAsTouched();
          }

        }
    selectedOption: string = 'Select Sub Category';
    selectedCatOption: string = 'Select Category';




imageUrlMain: string | null = null;
imageUrl1: string | null = null;
imageUrl2: string | null = null;
imageUrl3: string | null = null;
imageUrl4: string | null = null;


onFileSelectedImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrlMain = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
onFileSelectedImage1(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl1 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
onFileSelectedImage2(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl2 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
onFileSelectedImage3(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl3 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
onFileSelectedImage4(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl4 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}


}
