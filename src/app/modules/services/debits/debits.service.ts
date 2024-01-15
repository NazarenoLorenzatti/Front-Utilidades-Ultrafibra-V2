import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/debitos"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNDU1NjI0Mn0.R2hgqXu1ckbU7JjZNDOeRrb9yaV5sYUIGtZbgD9P99Z_SeeS0JGdak5KzYZY61JG2HOjvYV-gRIohXiZ8dVVGoOePABY94vI5awVK9RPxChlkm7RL6cq_LsbyHtlx7qKdH6VTws0AQjfJ4supmRCpi4A2zCve93Pwtx0DJ_5NQ3NcQqcspb43qkJdW_O6tW10c9WxG4FrmCSD_bhWV-st33CzR7XLPduaKqL0DO0hahMTVYbtT6ipbcoTwkyVTrmiQJjTwYpdKUwTxs44L18Tp0_UeRyI4Jm3_Pdidn35DNjYAzG6cTiMDTR5mHlGFo_mFK_Clmr4p44w4VaKGYJ3g";
@Injectable({
  providedIn: 'root'
})
export class DebitsService {

  constructor(private http: HttpClient) { }

  // EXTRACTO DE DEBITOS PARA EL BANCO

  uploadFile(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/importar-excel`;
    return this.http.post(endpoint, formData, { headers });
  }

  getAll(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/obtener-tabla`;
    return this.http.get(endpoint, { headers });
  }

  deleteAll(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/vaciar`;
    return this.http.delete(endpoint, { headers });
  }

  downloadExtract(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/descargar-extracto`;
    return this.http.post(endpoint, formData, { headers,  responseType: 'arraybuffer' });
  }

  // RESPUESTA BANCARIA

  uploadFileTxt(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/importar-txt`;
    return this.http.post(endpoint, formData, { headers });
  }

  getAllResp(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/obtener-tabla-respuesta`;
    return this.http.get(endpoint, { headers });
  }

  deleteAllResp(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/vaciar-respuesta`;
    return this.http.delete(endpoint, { headers });
  }

  downloadResponse(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/descargar-respuesta`;
    return this.http.get(endpoint, { headers,  responseType: 'arraybuffer' });
  }
}
