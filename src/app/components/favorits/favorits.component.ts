import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-favorits',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './favorits.component.html',
  styleUrl: './favorits.component.scss'
})
export class FavoritsComponent {

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
