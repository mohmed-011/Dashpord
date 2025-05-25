import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/Interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink,ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  customOptionsCat: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    dotsEach:true,
    navSpeed: 700,
    autoplay:true,
    margin:8,
    merge:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100: {
        items: 6
      }
    },
    nav: false
  }
  private readonly _ProductsService = inject(ProductsService)
  private readonly _AuthServiceService = inject(AuthServiceService)


productList:IProduct[]=[]

  ngOnInit(): void {
    let userId: string | null = localStorage.getItem('userID') !== null
    ? (localStorage.getItem('userID'))
    : null;
    // this._ProductsService.GetAllProduct( userId ).subscribe({
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

    this. getProducts();
  }
  showFilters = false;

  applyFilters() {
    this.getProducts();
    this.showFilters = false; // إغلاق المودال بعد التطبيق
  }


  filterForm: FormGroup;
  products: any[] = [];

  constructor(private fb: FormBuilder, private productService: ProductsService) {
    let userId: string | null = localStorage.getItem('userID') !== null
    ? (localStorage.getItem('userID'))
    : null;

    this.filterForm = this.fb.group({
      sellerId: [userId],
      minPrice: [1000],
      maxPrice: [2000],
      category: [''],
      subCategory: [],
      minRate: [0],
      mostViewed: [false],
      newest: [false],
      mostSold: [false],
      searchQuery: [''],
      pageNumber: [1],
      pageSize: [10]
    });
  }
  getProducts() {
    const filters = this.filterForm.value;
    this.productService.getFilteredProducts(filters).subscribe(
      {
        next: (res) => {
          // تأكد من شكل الريسبونس، هل في res.products؟ ولا res بس؟
          console.log('Response:', res);

          // امسح القائمة القديمة
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
        error:()=>{}

      }
    );
  }
}
