import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FavoriteService } from '../../core/services/favorite.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorits',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './favorits.component.html',
  styleUrl: './favorits.component.scss'
})
export class FavoritsComponent implements OnInit {

  productList:Ifav [] =[]
  private readonly _FavoriteService = inject(FavoriteService)
      constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;

    this._FavoriteService.GetFavoriteItemsBySeller(userId).subscribe({
      next:(res)=>{
        this.productList = res.data
        console.log(this.productList );

      },
      error:()=>{}
    })
  }


  DeletfromFav(ItemID:string|null){
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;

    this._FavoriteService.DeleteFavoriteItemBySeller(userId ,ItemID ).subscribe({
      next:(res)=>{
        console.log(res );
        this.toastr.warning("Product removed from Favorites", 'Done');
        this.ngOnInit()

      },
      error:()=>{}
    })
  }

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
}
 interface Ifav {
  Item_ID: string
  Item_Name: string
  Price_out: number
  Image_Cover: string
  Description: string
  Quantity: number
}
