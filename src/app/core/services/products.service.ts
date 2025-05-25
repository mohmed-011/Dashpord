import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //constructor() { }
  private readonly _HttpClient = inject(HttpClient);

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

  GetAllProduct(Sellerid:string | null):Observable<any>{

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    return this._HttpClient.get(`${environment.baseUrl}Products/GetFilteredProducts?sellerId=${Sellerid}`,
          {
            headers
          });
  }

  UpdateItemImage(itemId:string ,formData: FormData):Observable<any>{

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    return this._HttpClient.put(`${environment.baseUrl}Products/UpdateProductImage?ItemId=${itemId}`,formData,
          {
            headers
          });
  }

  // getSpecificProduct(num:number):Observable<any>{
  //   return this._HttpClient.get(``);
  // }



  private baseUrl = `${environment.baseUrl}Products/GetFilteredProducts`;


  getFilteredProducts(filters: any): Observable<any> {

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
      });

    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '' && value !== false) {
        params = params.set(key, value.toString());
      }
    });
    return this._HttpClient.get<any[]>(this.baseUrl, { params ,headers }  );
  }
}
