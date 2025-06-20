import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private _HttpClient:HttpClient )  { }


  GetSellerProfile(Sellerid:number | null):Observable<any>{
      //  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      //    const headers = new HttpHeaders({
      //      'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      //    });

       return this._HttpClient.get(`${environment.baseUrl}api/Profile/GetSellerProfile?id=${Sellerid}`);
     }

     UpdateSellerProfile(data:any):Observable<any>{
      //  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      //    const headers = new HttpHeaders({
      //      'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      //    });

       return this._HttpClient.put(`${environment.baseUrl}api/Profile/UpdateSellerProfile`,data);
     }
}
