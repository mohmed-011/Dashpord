import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(private _HttpClient:HttpClient )  { }
  private readonly _Router = inject(Router)

  userData:any = null

  setRegisterFoem(data:object):Observable<any>{
    return this._HttpClient.post(`http://sm-ecommerce.runasp.net/Auth/loginDash`,data);
  }

  setloginFoem(data:object):Observable<any>{
    return this._HttpClient.post(`http://sm-ecommerce.runasp.net/Auth/loginDash`,data);
  }

  //  saveUserData():void{
  //   if(localStorage.getItem('userToken') !=null){

  //   this.userData =  jwtDecode(  localStorage.getItem('userToken')!  )
  //     console.log("userData" , this.userData);

  //   }
  //}
}
