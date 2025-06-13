import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private baseUrl = 'https://your-api-base-url.com/api/Reports';

  constructor(private http: HttpClient) {}

  getDailySalesReport(Sellerid:number | null):Observable<any>{

        // const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        //   const headers = new HttpHeaders({
        //     'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        //   });

        return this.http.get(`${environment.baseUrl}api/Reports/GetSellerOrdersByDateGroup?Seller_ID=${Sellerid}&GroupType=Daily`);
  }

  getmonthlySalesReport(Sellerid:number | null):Observable<any>{

        return this.http.get(`${environment.baseUrl}api/Reports/GetSellerOrdersByDateGroup?Seller_ID=${Sellerid}&GroupType=Monthly`);
  }

  getAllOrdersReport(Sellerid:number | null):Observable<any>{

    return this.http.get(`${environment.baseUrl}api/Reports/GetSellerOrders?Seller_ID=${Sellerid}`);
  }

  GetSellerOrdersByCity(Sellerid:number | null):Observable<any>{

    return this.http.get(`${environment.baseUrl}api/Reports/GetSellerOrdersByCity?Seller_ID=${Sellerid}`);
  }

  GetTopProfitItemsBySeller(Sellerid:number | null):Observable<any>{

    return this.http.get(`${environment.baseUrl}api/Reports/GetTopProfitItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetUnsoldItemsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetUnsoldItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetOutOfStockItemsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetOutOfStockItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetDiscountedItemsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetDiscountedItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetTopWishlistedItemsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetTopWishlistedItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetTopComparedItemsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetTopComparedItemsBySeller?Seller_ID=${Sellerid}`);
  }
  GetTopSoldItemsBySeller(Sellerid:number | null):Observable<any>{
     const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
          });
    return this.http.get(`${environment.baseUrl}TopDash/TopSold?Seller_ID=${Sellerid}`,{
      headers
    });
  }
  GetMostViewedProductsBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetMostViewedProductsBySeller?Seller_ID=${Sellerid}`);
  }

  GetCartToPurchaseRate(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetCartToPurchaseRate?Seller_ID=${Sellerid}`);
  }
  GetWishlistToPurchaseRate(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetWishlistToPurchaseRate?Seller_ID=${Sellerid}`);
  }
  GetViewToBuyConversion(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetViewToBuyConversion?Seller_ID=${Sellerid}`);
  }
  
  GetTopViewersBySeller(Sellerid:number | null):Observable<any>{
    return this.http.get(`${environment.baseUrl}api/Reports/GetTopViewersBySeller?Seller_ID=${Sellerid}`);
  }
}
