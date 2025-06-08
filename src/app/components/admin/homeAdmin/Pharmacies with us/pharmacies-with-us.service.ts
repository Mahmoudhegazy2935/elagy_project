import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsirAdminModels } from '../usirAdmin/UsirAdminModels/usir-admin-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesWithUsService {
  private baseUrl='https://elagy-apii.runasp.net/api/User/Pharmacies';
  constructor(private http: HttpClient) {}

  getuser(): Observable<UsirAdminModels[]> {
    return this.http.get<UsirAdminModels[]>(this.baseUrl);
  }

}
