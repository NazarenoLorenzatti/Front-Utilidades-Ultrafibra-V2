import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/eventos"

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getEventos(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/listar-eventos`;
    return this.http.get(endpoint, { headers });
  }

  saveEvents(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/registrar-evento`;
    return this.http.post(endpoint, body, { headers });
  }

  deleteEvents(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-eventos`;
    return this.http.post(endpoint, body, { headers });
  }

  deleteEvent(idEvento: number){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-evento/${idEvento}`;
    return this.http.delete(endpoint, { headers });
  }
}
