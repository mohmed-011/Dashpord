import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  getAllProduct():Observable<any>{
    return this._HttpClient.get(`https://localhost:7221/Products/GetAllProducts`);
  }

  // getSpecificProduct(num:number):Observable<any>{
  //   return this._HttpClient.get(``);
  // }
}
