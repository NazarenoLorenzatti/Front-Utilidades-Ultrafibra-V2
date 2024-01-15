import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/oids"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNTA5OTMxNn0.VJyPFpEQdiYkanOtjQlWVNtUGqrrcmOX6ITjbKbxXMakvlHoYO0m6II50RcmEnorTYRTOAMPiy4ak2acsKrg19VufXDfqsUq5W3xOI2L05Fq5RaNZAIKlHzAfQwZ09M9DN1FVYqpXbWmHiwPks5Np6riAwIGtQ_CcR0wngXMoAnhusqG7Fl62WIKPxcD8iLY4rv_aLOo1sJXbrQ3geL9NbvxGbx2asZt3jGdlWwVElDh5woBdyW4mWtBzen5VZQeq4QqBv29JPWRK03iYihTpITeQdfWx-p-hWq_gtX2izwkBBtSMaYocH06C-3TQCEUYIgjROFxeCPSQq-2vQGmKA";

@Injectable({
  providedIn: 'root'
})
export class OidService {

  constructor(private http: HttpClient) { }

  saveOid(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/guardar-oid`;
    return this.http.post(endpoint, body, { headers });
  }

  editOid(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/editar-oid`;
    return this.http.put(endpoint, body, { headers });
  }


  deleteOid(idOid: number){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/eliminar-oid/${idOid}`;
    return this.http.delete(endpoint, { headers });
  }
}