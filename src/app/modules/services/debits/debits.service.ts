import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/debitos"

@Injectable({
  providedIn: 'root'
})
export class DebitsService {
  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  // EXTRACTO DE DEBITOS PARA EL BANCO

  uploadFile(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/importar-excel`;
    return this.http.post(endpoint, formData, { headers });
  }

  getAll(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/obtener-tabla`;
    return this.http.get(endpoint, { headers });
  }

  deleteAll(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/vaciar`;
    return this.http.delete(endpoint, { headers });
  }

  downloadExtract(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/descargar-extracto`;
    return this.http.post(endpoint, formData, { headers,  responseType: 'arraybuffer' });
  }

  // RESPUESTA BANCARIA

  uploadFileTxt(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/importar-txt`;
    return this.http.post(endpoint, formData, { headers });
  }

  getAllResp(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/obtener-tabla-respuesta`;
    return this.http.get(endpoint, { headers });
  }

  deleteAllResp(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/vaciar-respuesta`;
    return this.http.delete(endpoint, { headers });
  }

  downloadResponse(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/descargar-respuesta`;
    return this.http.get(endpoint, { headers,  responseType: 'arraybuffer' });
  }
}
