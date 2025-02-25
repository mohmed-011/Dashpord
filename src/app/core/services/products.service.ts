import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  getAllProduct():Observable<any>{
    return this._HttpClient.get(`https://localhost:7221/Products/GetAllProducts`);
  }

  addOneProduct(formData: FormData):Observable<any>{

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    return this._HttpClient.post(`${environment.baseUrl}Products/PostProduct`,formData,
          {
            headers
          });
  }

  GetOneProduct(id:string | null):Observable<any>{

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    return this._HttpClient.get(`${environment.baseUrl}Products/GetProductById?id=${id}`,
          {
            headers
          });
  }

  GetAllProduct(Sellerid:string):Observable<any>{

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    return this._HttpClient.get(`${environment.baseUrl}Products/GetFilteredProducts?sellerId=${Sellerid}`,
          {
            headers
          });
  }

  // getSpecificProduct(num:number):Observable<any>{
  //   return this._HttpClient.get(``);
  // }
}
