import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/tecnicos"

@Injectable({
  providedIn: 'root'
})
export class TechniciansService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getTechnicians() {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/listar-tecnicos`;
    return this.http.get(endpoint, { headers });
  }

  saveTechnician(body: any) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    if (body.idTecnico) {
      const endpoint = `${base_url}/guardar-tecnico`;
      return this.http.post(endpoint, body, { headers });
    } else {
      const endpoint = `${base_url}/editar-tecnico`;
      return this.http.put(endpoint, body, { headers });
    }

  }

  deleteTechnician(idTecnico: number) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-tecnico/${idTecnico}`;
    return this.http.delete(endpoint, { headers });
  }
}
