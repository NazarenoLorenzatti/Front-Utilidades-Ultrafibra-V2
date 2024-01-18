import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

 postLogin(body: any){
    const endpoint = `${base_url}/login`;
    return this.http.post(endpoint, body);
  }

 postConfirm(body: any){
    const endpoint = `${base_url}/confirm`;
    return this.http.post(endpoint, body);
  }
}
