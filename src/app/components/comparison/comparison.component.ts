import { Data } from './../../core/Interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { IProduct } from '../../core/Interfaces/iproduct';
import { ICompare } from '../../core/Interfaces/icompare';
import { ChartsService } from '../../core/services/charts.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFiltersService } from '../../core/services/select-filters.service';
import { ICategory } from '../../core/Interfaces/icategory';
import { ISubCategory } from '../../core/Interfaces/isub-category';
import { IBrand } from '../../core/Interfaces/ibrand';
Chart.register(...registerables)

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent implements OnInit {
    private readonly _ProductsService = inject(ProductsService)
    private readonly _AuthServiceService = inject(AuthServiceService)
    private readonly _ChartsService = inject(ChartsService)
  private readonly fb = inject(FormBuilder);
  private readonly _SelectFiltersService = inject(SelectFiltersService);
  filterForm!: FormGroup;
  productList: IProduct[] = [];
  categoryList: ICategory[] = [];
  subCategoryList: ISubCategory[] = [];
  brandList: IBrand[] = [];

  selectedOption: string = 'Select Sub Category';
  selectedCatOption: string = 'Select Category';
  categoryId: number = 0;
  subCategoryId: number = 0;
  userId: string | null = '';
  showFilters = false;


  applyFilters() {
    this.showFilters = false;

    this.filterForm.patchValue({
      sellerId: this.userId,
      categry: this.categoryId,
      subCategry: this.subCategoryId
    });
    this.filterForm.get('mostViewed')?.valueChanges.subscribe(val => {
      console.log('✅ mostViewed changed:', val);
    });

    this.filterForm.get('newwest')?.valueChanges.subscribe(val => {
      console.log('✅ newwest changed:', val);
    });

    this.filterForm.get('mostSold')?.valueChanges.subscribe(val => {
      console.log('✅ mostSold changed:', val);
    });
    console.log("categoryId:", this.categoryId);
    console.log("subCategoryId:", this.subCategoryId);

    this.getProducts();
  }
  getProducts() {
    const filters = this.filterForm.value;
    console.log('Filters sent to API:', filters);
    this._ProductsService.getFilteredProducts(filters).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        this.productList = [];

        if (res.message === "success" && res.products) {
          this.productList = res.products;
        } else if (Array.isArray(res)) {
          this.productList = res;
        } else {
          console.warn("Unexpected response format", res);
        }

        console.log('Updated product list:', this.productList);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  onCategoryChange(event: Event) {
    const categoryId = this.filterForm.get('categry')?.value;
    this.categoryId = categoryId;

    if (categoryId) {
      console.log(categoryId);
      this._SelectFiltersService.GetAllSubCategoryByCat(categoryId).subscribe({
        next: (res) => {
          this.subCategoryList = res;
          console.log(res);
        }
      });
    }
  }
  onSubCategoryChange(event: Event) {
    const subCategoryId = this.filterForm.get('subCategry')?.value;
    this.subCategoryId = subCategoryId;

    if (subCategoryId) {
      console.log(subCategoryId);
      this._SelectFiltersService.GetSubCategoryBrands(subCategoryId).subscribe({
        next: (res) => {
          this.brandList = res.Brands;
          console.log(this.brandList);
        }
      });
    }
  }



  comparList:ICompare[]=[]



   ngOnInit(): void {
    this.userId = localStorage.getItem('userID');

    this.filterForm = this.fb.group({
      sellerId: [this.userId],
      minPrice: [null],
      maxPrice: [null],
      categry: [null],
      subCategry: [null],
      minRate: [0],
      mostViewed: [false],
      newwest: [false],
      mostSold: [false],
      searchQuery: [''],
      pageNumber: [1],
      pageSize: [10]
    });



    this._SelectFiltersService.GetAllCategory().subscribe({
      next: (res) => {
        this.categoryList = res;
        console.log(this.categoryList);
      }
    });

    this.getProducts();
    //  this._ProductsService.GetAllProduct( this._AuthServiceService.userData.nameid).subscribe({
    //   next:(res)=>{
    //     if(res.message == "success"){
    //        console.log(res)
    //      for (const item of res.products) {
    //       this.productList.push(item);
    //     }
    //     for (const item of this.productList) {
    //     console.log(item)
    //     }
    //     }
    //     console.log(res)
    //      for (const item of res) {
    //       this.productList.push(item);
    //     }
    //     for (const item of this.productList) {
    //     console.log(item)
    //     }
    //   },
    //   error:(err)=>{
    //     console.log(err)
    //   }
    // })

   }

   selectedValues: string[] = [];
    itemOneSalesList: number[] = []
    itemTwoSalesList: number[] = []


  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value; // بيسيبها string بدون تحويل

    if (input.checked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }
  }

  sendSelected() {
    console.log('Selected IDs 1:', this.selectedValues[0]);
    console.log('Selected IDs 2:', this.selectedValues[1]);
    this._ChartsService.GetMonthItemsComp(this.selectedValues[0],this.selectedValues[1]).subscribe({
      next:(res)=>{
        console.log(res)
        this.comparList = res.data
        console.log(this.comparList)
        this.itemOneSalesList = this.comparList.map(item => item.ItemOne_Sales);
        this.itemTwoSalesList = this.comparList.map(item => item.ItemTwo_Sales);

        console.log(this.itemOneSalesList)
        console.log(this.itemTwoSalesList)

        this.renderChart();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
   renderChart():void{

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'product1',
      data: this.itemOneSalesList,
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: this.itemTwoSalesList,
      borderColor: '#ea1a1a',
      backgroundColor: '#ea1a1a',
    }
  ]
};
const data2 = {
  labels: labels,
  datasets: [
    {
      label: 'product1',
      data: this.itemOneSalesList,
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: this.itemTwoSalesList,
      borderColor: '#ea1a1a',
      backgroundColor: '#ea1a1a',
    }
  ]
};

const chart = new Chart('lineChartComp', {
   type: 'line',
  data: data2,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },

    }
  },

})
const chart2 = new Chart('barChartComp', {
   type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },

    }
  },

})


  }
}
