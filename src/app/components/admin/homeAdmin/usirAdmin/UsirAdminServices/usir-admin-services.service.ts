import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsirAdminModels } from '../UsirAdminModels/usir-admin-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsirAdminServicesService {

  private baseUrl = 'http://localhost:5208/api/User/user';

  constructor(private http: HttpClient) {}

  getuser(): Observable<UsirAdminModels[]> {
    return this.http.get<UsirAdminModels[]>(this.baseUrl);
  }
}
