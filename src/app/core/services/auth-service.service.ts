import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private _HttpClient:HttpClient )  { }
  private readonly _Router = inject(Router)

  userData:any = null

  setRegisterFoem(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}Auth/loginDash`,data);
  }

  setloginFoem(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}Auth/loginDash`,data);
  }

  //  saveUserData():void{
  //   if(localStorage.getItem('userToken') !=null){

  //   this.userData =  jwtDecode(  localStorage.getItem('userToken')!  )
  //     console.log("userData" , this.userData);

  //   }
  //}
}
