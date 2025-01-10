import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/Interfaces/iproduct';

@Component({
  selector: 'app-product-stock',
  standalone: true,
  imports: [],
  templateUrl: './product-stock.component.html',
  styleUrl: './product-stock.component.scss'
})
export class ProductStockComponent implements OnInit {

  _ProductsService =inject(ProductsService);
  productList:IProduct[]=[]

    ngOnInit(): void {

      this._ProductsService.getAllProduct().subscribe({
        next:(res)=>{
          this.productList = res
          console.log(this.productList)
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
}
