import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TopService {

    constructor(private _HttpClient:HttpClient )  { }


   GetTopRated(Sellerid:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.get(`${environment.baseUrl}TopDash/TopRated?Seller_ID=${Sellerid}`,
            {
              headers
            });
    }

    GetTopSold(Sellerid:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.get(`${environment.baseUrl}TopDash/TopSold?Seller_ID=${Sellerid}`,
            {
              headers
            });
    }

    GetTrending(Sellerid:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.get(`${environment.baseUrl}TopDash/Trending?Seller_ID=${Sellerid}`,
            {
              headers
            });
    }

    GetMostViewed(Sellerid:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.get(`${environment.baseUrl}TopDash/MostViewed?Seller_ID=${Sellerid}`,
            {
              headers
            });
    }
    GetMostSelas(Sellerid:number | null):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.get(`${environment.baseUrl}TopDash/MostSelas?Seller_ID=${Sellerid}`,
            {
              headers
            });
    }
}
