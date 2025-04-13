import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PharmacyAdminModels } from '../PharmacyAdminModels/pharmacy-admin-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PharmacyAdminServicesService {


  private baseUrl = 'http://localhost:5208/api/Pharmacy';

  constructor(private http: HttpClient) {}

  getPharmacies(): Observable<PharmacyAdminModels[]> {
    return this.http.get<PharmacyAdminModels[]>(this.baseUrl);
  }

  deletePharmacy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
