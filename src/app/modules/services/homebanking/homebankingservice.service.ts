import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/homebanking"
@Injectable({
  providedIn: 'root'
})
export class HomebankingService {
  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  uploadFile(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/importar-excel`;
    return this.http.post(endpoint, formData, { headers });
  }

  uploadFileResponse(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/importar-respuesta`;
    return this.http.post(endpoint, formData, { headers });
  }

  downloadTxtBanelco(nameFile: string){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/descargar-base/${nameFile}`;
    return this.http.get(endpoint, { headers, responseType: 'text' });
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

  downloadTxtLink(nameFile: string) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/descargar-baselink/${nameFile}`;
    return this.http.get(endpoint, { headers, responseType: 'arraybuffer', observe: 'response' });    
  }

  downloadXls(nameFile: string) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/descargar-baserespuestaXls/${nameFile}`;
    return this.http.get(endpoint, { headers, responseType: 'arraybuffer'});    
  }

  
}
