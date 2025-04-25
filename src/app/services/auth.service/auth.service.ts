import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  [key: string]: any; // for flexible structure
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl0='http://localhost:5208';
  private apiUrl = `${this.apiurl0}/Registration`; // Replace with your actual API URL
  private apiUrl1 = `${this.apiurl0}/Login`; // Replace with your actual API URL
  private apiUrl2 = `${this.apiurl0}/api/Pharmacy`;
  private apiUrl3 = `${this.apiurl0}/RegistrationAsPharmacy`;
  constructor(private http: HttpClient) {}

  getRoleFromToken(token: string): string {
    const decoded: JwtPayload = jwtDecode(token);
    const nameField = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    if (Array.isArray(nameField) && nameField.length > 0) {
      return nameField[0]; // 'user', 'pharmacy', or 'admin'
    }

    return 'unknown';
  }


  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }
  addpharmacy(userData2: any): Observable<any> {
    const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl3, userData2,{ headers ,responseType: 'text'  });
  }
  RegistrationAsPharmacy(userData: any): Observable<any> {
    return this.http.post(this.apiUrl2, userData , { responseType: 'text' });
  }


  // login(credentials: { email: string; password: string }): Observable<any> {
  //   return this.http.post(this.apiUrl1, credentials,{ responseType: 'text' });
  // }

  // logout() {
  //   localStorage.removeItem('authToken');
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('authToken');
  // }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl1, credentials, { responseType: 'text' });
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  logout1() {
    localStorage.clear(); // يمسح كل حاجة في localStorage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

}


