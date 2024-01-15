import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/eventos"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNTA5OTMxNn0.VJyPFpEQdiYkanOtjQlWVNtUGqrrcmOX6ITjbKbxXMakvlHoYO0m6II50RcmEnorTYRTOAMPiy4ak2acsKrg19VufXDfqsUq5W3xOI2L05Fq5RaNZAIKlHzAfQwZ09M9DN1FVYqpXbWmHiwPks5Np6riAwIGtQ_CcR0wngXMoAnhusqG7Fl62WIKPxcD8iLY4rv_aLOo1sJXbrQ3geL9NbvxGbx2asZt3jGdlWwVElDh5woBdyW4mWtBzen5VZQeq4QqBv29JPWRK03iYihTpITeQdfWx-p-hWq_gtX2izwkBBtSMaYocH06C-3TQCEUYIgjROFxeCPSQq-2vQGmKA";
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEventos(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/listar-eventos`;
    return this.http.get(endpoint, { headers });
  }

  deleteEvents(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/eliminar-eventos`;
    return this.http.post(endpoint, body, { headers });
  }

  deleteEvent(idEvento: number){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/eliminar-evento/${idEvento}`;
    return this.http.delete(endpoint, { headers });
  }
}
