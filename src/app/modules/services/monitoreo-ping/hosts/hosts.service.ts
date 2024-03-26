import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/hosts"

@Injectable({
  providedIn: 'root'
})
export class HostsService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getHosts() {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/listar-host`;
    return this.http.get(endpoint, { headers });
  }

  saveHost(body: any) {
    if (body.idHost !== null) {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/guardar-host`;
      return this.http.post(endpoint, body, { headers });
    } else {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/editar-host`;
      return this.http.put(endpoint, body, { headers });
    }
  }

  newPing(body: any) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/hacer-ping`;
    return this.http.post(endpoint, body, { headers });
  }

  deleteHost(idHost: number) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-host/${idHost}`;
    return this.http.delete(endpoint, { headers });
  }

  editHost(body: any) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/editar-host`;
    return this.http.put(endpoint, body, { headers });
  }
}
