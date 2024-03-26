import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/logs"

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getLogs(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/buscar-log`;
    return this.http.post(endpoint,  body,  { headers });
  }

  getLogsForMonth(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/buscar-log-mes`;
    return this.http.post(endpoint, body,  { headers });
  }

  getLastLog(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/ultimo-log`;
    return this.http.post(endpoint, body,  { headers });
  }

  deleteLog(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-log-hostg`;
    return this.http.post(endpoint, body,  { headers });
  }

}
