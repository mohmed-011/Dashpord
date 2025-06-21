import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [DatePipe ,RouterLink],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.scss'
})
export class OrderdetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  orderDetels:IorderDetels[]=[];
  ngOnInit(): void {
    let userId: number | null = localStorage.getItem('userID') !== null
  ? Number(localStorage.getItem('userID'))
  : null;
    this._ActivatedRoute.paramMap.subscribe({
      next:( P )=>{
          console.log(P.get("id"))

        this._OrdersService.GetOrderItemsForSeller(P.get("id") , userId).subscribe({
          next:(res)=>{
            this.orderDetels = res.data
            console.log(
              this.orderDetels
            );

          }
        })

      }
    })
  }
}
 interface IorderDetels {
  Order_ID: number
  Item_ID: string
  Quantity: number
  Price_out: number
  Discount: number
  Item_Name: string
  Rate: number
  Image_Cover: string
  Category_Image: string
  Sub_Category_Name: string
  Buyer_Name: string
  phone: string
  Book_Date: string
}
