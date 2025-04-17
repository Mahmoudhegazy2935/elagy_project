import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl0='http://localhost:5208';
  private apiUrl = `${this.apiurl0}/Registration`; // Replace with your actual API URL
  private apiUrl1 = `${this.apiurl0}/Login`; // Replace with your actual API URL
  private apiUrl2 = `${this.apiurl0}/api/Pharmacy`;
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }

 RegistrationAsPharmacy(userData: any): Observable<any> {
  return this.http.post(this.apiUrl2, userData); // بدون responseType أو خليه 'json'
}

// RegistrationAsPharmacy(userData: any): Observable<HttpResponse<any>> {
//   return this.http.post<any>(this.apiUrl2, userData, { observe: 'response' });
// }



  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl1, credentials,{ responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
