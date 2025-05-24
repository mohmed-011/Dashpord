import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) {}

  uploadFileLaptops(file: File|null, sellerId: number|null, brandId: number|null): Observable<any> {
    const formData = new FormData();
    formData.append('file', file!);

    const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
    });
    return this.http.post(`${environment.baseUrl}Excel/PostLaptops?SellerId=${sellerId}&BrandID=${brandId}`, formData,
      {
        headers
      }
    );
}

uploadFilePhones(file: File|null, sellerId: number|null, brandId: number|null): Observable<any> {
  const formData = new FormData();
  formData.append('file', file!);

  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
  return this.http.post(`${environment.baseUrl}Excel/PostPhones?SellerId=${sellerId}&BrandID=${brandId}`, formData,
    {
      headers
    }
  );
}

uploadFileTVs(file: File|null, sellerId: number|null, brandId: number|null): Observable<any> {
  const formData = new FormData();
  formData.append('file', file!);

  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
  return this.http.post(`${environment.baseUrl}Excel/PostTVs?SellerId=${sellerId}&BrandID=${brandId}`, formData,
    {
      headers
    }
  );
}

uploadFilePCs(file: File|null, sellerId: number|null, brandId: number|null): Observable<any> {
  const formData = new FormData();
  formData.append('file', file!);

  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
  return this.http.post(`${environment.baseUrl}Excel/PostPCs?SellerId=${sellerId}&BrandID=${brandId}`, formData,
    {
      headers
    }
  );
}

uploadFileSmartWatchs(file: File|null, sellerId: number|null, brandId: number|null): Observable<any> {
  const formData = new FormData();
  formData.append('file', file!);

  const token = localStorage.getItem('userToken'); // استرجاع التوكن من Local Storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`  // إضافة التوكن في الهيدر
  });
  return this.http.post(`${environment.baseUrl}Excel/PostSmartWatches?SellerId=${sellerId}&BrandID=${brandId}`, formData,
    {
      headers
    }
  );
}
}

