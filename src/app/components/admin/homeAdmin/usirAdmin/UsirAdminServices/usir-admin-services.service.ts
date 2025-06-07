import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsirAdminModels } from '../UsirAdminModels/usir-admin-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsirAdminServicesService {

  private baseUrl = 'https://elagy-apii.runasp.net/api/User/user';
 private daleteUrl='https://elagy-apii.runasp.net/api/User';
  constructor(private http: HttpClient) {}

  getuser(): Observable<UsirAdminModels[]> {
    return this.http.get<UsirAdminModels[]>(this.baseUrl);
  }

  deleteuser(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.daleteUrl, { params });
  }
  
  
}
