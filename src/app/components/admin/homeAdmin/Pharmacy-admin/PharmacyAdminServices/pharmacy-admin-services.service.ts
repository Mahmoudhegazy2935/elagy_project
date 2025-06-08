import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PharmacyAdminModels } from '../PharmacyAdminModels/pharmacy-admin-models';
import { Observable } from 'rxjs';
import { PharmacyAdminModelsregister } from '../PharmacyAdminModels/pharmacy-admin-modelsregister';

@Injectable({
  providedIn: 'root'
})
export class PharmacyAdminServicesService {
  PharmacyAdminModelsregister() {
    throw new Error('Method not implemented.');
  }


  private baseUrl = 'https://elagy-apii.runasp.net/api/Pharmacy';
  private apiUrl2='https://elagy-apii.runasp.net/api/User/Pharmacies'; // GET Pharmacy
  constructor(private http: HttpClient) {}

  getPharmacies(): Observable<PharmacyAdminModels[]> {
    return this.http.get<PharmacyAdminModels[]>(this.baseUrl);
  }

  getPharmaciesregister(): Observable<PharmacyAdminModelsregister[]> {
    return this.http.get<PharmacyAdminModelsregister[]>(this.apiUrl2);
  }

  deletePharmacy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
