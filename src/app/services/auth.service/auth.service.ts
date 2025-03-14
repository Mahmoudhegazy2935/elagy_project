import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'https://localhost:7074/Registration'; // Replace with your actual API URL
  private apiUrl1 = 'https://localhost:7074/Login'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }


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
