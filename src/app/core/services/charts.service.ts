import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private _HttpClient:HttpClient )  { }
    private readonly _Router = inject(Router)

  userToken:any = localStorage.getItem("userToken")

    GetMonthImports(id:number):Observable<any>{
      
      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
        return this._HttpClient.get(`http://sm-ecommerce.runasp.net/Dashboard/GetSellerProfits?Seller_id=${id}`,
          {
            headers
          }
        );
      }
}
