import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/administrativo"

@Injectable({
  providedIn: 'root'
})
export class RepService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getRep(body: any) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/buscar-administrativo-usuario`;
    return this.http.post(endpoint, body, { headers });
  }

  saveRep(body: any) {
    if (body.idHost !== null) {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/crear-administrativo`;
      return this.http.post(endpoint, body, { headers });
    } else {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/editar-administrativo`;
      return this.http.put(endpoint, body, { headers });
    }
  }

}
