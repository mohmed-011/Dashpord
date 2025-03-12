import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SelectFiltersService {

  constructor() { }
    private readonly _HttpClient = inject(HttpClient);

    GetAllCategory():Observable<any>{

        const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
          });

        return this._HttpClient.get(`${environment.baseUrl}Category/GetAllCategory`,
              {
                headers
              });
      }

      GetAllSubCategoryByCat(CategoryId :number):Observable<any>{

        const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
          });

        return this._HttpClient.get(`${environment.baseUrl}Category/GetSubCategoryByCategory?categoryId=${CategoryId}`,
              {
                headers
              });
      }

      GetSubCategoryBrands(SubCategoryId :number):Observable<any>{

        const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage

          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
          });

        return this._HttpClient.get(`${environment.baseUrl}Category/GetSubCategoryDetails?subCategoryId=${SubCategoryId}`,
              {
                headers
              });
      }


}
