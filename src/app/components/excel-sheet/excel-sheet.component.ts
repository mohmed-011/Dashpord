import { Component, inject } from '@angular/core';
import { ICategory } from '../../core/Interfaces/icategory';
import { ISubCategory } from '../../core/Interfaces/isub-category';
import { IBrand } from '../../core/Interfaces/ibrand';
import { SelectFiltersService } from '../../core/services/select-filters.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ExcelService } from '../../core/services/excel.service';

@Component({
  selector: 'app-excel-sheet',
  standalone: true,
  imports: [CarouselModule,FormsModule , ReactiveFormsModule],
  templateUrl: './excel-sheet.component.html',
  styleUrl: './excel-sheet.component.scss'
})
export class ExcelSheetComponent {
    private readonly _SelectFiltersService = inject(SelectFiltersService)

    categoryList:ICategory[]=[]
    subCategoryList:ISubCategory[]=[]
    brandList:IBrand[]=[]
    selectedOption: string = 'Select Sub Category';
    selectedCatOption: string = 'Select Category';
    categoryId :number =0
    subCategoryId :number =0


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
    this.categoryId =categoryId;
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
   this.subCategoryId =subCategoryId;
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
 selectedBrandId: number | null = null;

 selectedFile: File | null = null;
  message = '';
private readonly _ExcelService = inject(ExcelService)
  constructor() {}

  onFileChange(event: any): void {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  upload(): void {
    // if (!this.selectedFile) {
    //   this.message = 'Please select a file.';
    //   return;
    // }
    let userId: number | null = localStorage.getItem('userID') !== null
  ? Number(localStorage.getItem('userID'))
  : null;

    console.log( "categoryId :",this.categoryId)
    console.log("selectedBrandId :",this.selectedBrandId)
    console.log("subCategoryId :",this.subCategoryId)
    console.log("userId :",userId)

    if(this.subCategoryId == 1){
      this._ExcelService.uploadFilePhones(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
    }
    else if(this.subCategoryId == 2){
      this._ExcelService.uploadFileLaptops(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
    }
    else if(this.subCategoryId == 4){
      this._ExcelService.uploadFileSmartWatchs(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
    }
    else if(this.subCategoryId == 7){
      this._ExcelService.uploadFileTVs(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
    }
    else if(this.subCategoryId == 19){
      this._ExcelService.uploadFilePCs(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
    }

    this._ExcelService.uploadFileLaptops(this.selectedFile, userId, this.selectedBrandId)
      .subscribe({
        next: () => this.message = 'File uploaded successfully!',
      });
  }
}
