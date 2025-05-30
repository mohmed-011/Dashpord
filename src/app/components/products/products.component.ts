import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/Interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICategory } from '../../core/Interfaces/icategory';
import { ISubCategory } from '../../core/Interfaces/isub-category';
import { IBrand } from '../../core/Interfaces/ibrand';
import { SelectFiltersService } from '../../core/services/select-filters.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly fb = inject(FormBuilder);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _AuthServiceService = inject(AuthServiceService);
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

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');

    this.filterForm = this.fb.group({
      sellerId: [this.userId],
      minPrice: [1000],
      maxPrice: [2000],
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
  }
  applyFilters() {
    this.showFilters = false;

    this.filterForm.patchValue({
      sellerId: this.userId,
      categry:this.categoryId === 0 ? null : this.categoryId,
      subCategry: this.subCategoryId === 0 ? null : this.subCategoryId
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


  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsEach: true,
    navSpeed: 700,
    autoplay: true,
    margin: 8,
    merge: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
      1100: { items: 6 }
    },
    nav: false
  };
}

