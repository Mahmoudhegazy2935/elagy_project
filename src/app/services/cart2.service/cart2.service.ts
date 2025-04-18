import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.service';

@Injectable({
  providedIn: 'root'
})
export class Cart2Service {

  constructor(private http:HttpClient) { }

  createNewCart(orderModel:any) {
    return this.http.post(environment.baseApi + 'Cart' , orderModel,{responseType: 'text'} )
  }
}
