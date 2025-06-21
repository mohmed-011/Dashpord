import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
    private readonly _HttpClient = inject(HttpClient);

    constructor() { }

    GetUserOrders(UserId: number):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetUserOrders?UserId=${UserId}`);
    }

    GetOrderItems(IDFromPaymob: number):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetOrderItems?IDFromPaymob=${IDFromPaymob}`);
    }

    GetٍSellerOrders(SellerId: number|null):Observable<any>{
      return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetSellerOrders?saller=${SellerId}`);
  }


  GetOrderItemsForSeller(IDFromPaymob: string|null,SellerId: number|null ):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetOrderItemsForSeller?IDFromPaymob=${IDFromPaymob}&sellerid=${SellerId}`);
}
}
