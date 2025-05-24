import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/Interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink],
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
    this._ProductsService.GetAllProduct( userId ).subscribe({
      next:(res)=>{
        if(res.message == "success"){
           console.log(res)
         for (const item of res.products) {
          this.productList.push(item);
        }
        for (const item of this.productList) {
        console.log(item)
        }
        }
        console.log(res)
         for (const item of res) {
          this.productList.push(item);
        }
        for (const item of this.productList) {
        console.log(item)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
