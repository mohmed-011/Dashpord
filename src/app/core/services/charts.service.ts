import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private _HttpClient:HttpClient )  { }




    GetMonthImports(id:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
        return this._HttpClient.get(`${environment.baseUrl}Dashboard/GetSellerProfits?Seller_id=${id}`,
          {
            headers
          }
        );
      }

      GetMonthItemsComp(id1:string , id2:string):Observable<any>{
        const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });
          return this._HttpClient.get(`${environment.baseUrl}Comparison/GetTwoItemsComp?id1=${id1}&id2=${id2}`,
            {
              headers
            },
          );
        }


        GetSellerNumbers(id:number | null):Observable<any>{

          const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });
            return this._HttpClient.get(`${environment.baseUrl}api/Reports/GetSellerNumbers?Seller_ID=${id}`,
              {
                headers
              }
            );
          }

}
