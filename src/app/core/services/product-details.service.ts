import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private readonly _HttpClient = inject(HttpClient);

  constructor() { }

  addPhoneProduct(formData: any,itemid:string):Observable<any>{

      const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
        });

      return this._HttpClient.post(`${environment.baseUrl}Details/AddPhoneDetails?item_ID=${itemid}`,formData,
            {
              headers
            });
          }
}
