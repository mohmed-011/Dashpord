import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

   private readonly _HttpClient = inject(HttpClient);

    constructor() { }

    sendToChatbot(data: object):Observable<any>{
        return this._HttpClient.post(`https://marktingchatbot.up.railway.app/chat`,data);
            }
}
