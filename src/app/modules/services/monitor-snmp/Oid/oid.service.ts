import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/oids"

@Injectable({
  providedIn: 'root'
})
export class OidService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  saveOid(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/guardar-oid`;
    return this.http.post(endpoint, body, { headers });
  }

  editOid(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/editar-oid`;
    return this.http.put(endpoint, body, { headers });
  }


  deleteOid(idOid: number){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-oid/${idOid}`;
    return this.http.delete(endpoint, { headers });
  }
}
