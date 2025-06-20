import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

    constructor(private http: HttpClient) {}


    GetFavoriteItemsBySeller(Sellerid:number | null):Observable<any>{
      return this.http.get(`${environment.baseUrl}api/FavoriteList/GetFavoriteItemsBySeller?sellerId=${Sellerid}`);
    }

    AddFavoriteItemBySeller(Sellerid:number | null , ItemID:string | null):Observable<any>{
      return this.http.post(`${environment.baseUrl}api/FavoriteList/AddFavoriteItem?sellerId=${Sellerid}&itemId=${ItemID}`,{});
    }

    DeleteFavoriteItemBySeller(Sellerid:number | null , ItemID:string | null):Observable<any>{
      return this.http.delete(`${environment.baseUrl}api/FavoriteList/DeleteFavoriteItem?sellerId=${Sellerid}&itemId=${ItemID}`,{});
    }
}
