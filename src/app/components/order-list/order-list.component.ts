import { Component, inject, OnInit } from '@angular/core';
import { FilterOptionComponent } from "../filter-option/filter-option.component";
import { OrdersService } from '../../core/services/orders.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { log } from 'console';
import { Iorder } from '../../core/Interfaces/iorder';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FilterOptionComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {

private readonly _OrdersService = inject(OrdersService);
private readonly _AuthServiceService = inject(AuthServiceService)

orderList:Iorder[]=[]

ngOnInit(): void {
  let userId: number | null = localStorage.getItem('userID') !== null
  ? Number(localStorage.getItem('userID'))
  : null;
 this._OrdersService.GetٍSellerOrders( userId ).subscribe({
  next:(res)=>{
    this.orderList = res.data
    console.log(res)
    console.log(this.orderList)
  },
  error:(err)=>{
    console.log(err)
  }
 })
}
}
