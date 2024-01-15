import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/homebanking"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwNDU1NjI0Mn0.R2hgqXu1ckbU7JjZNDOeRrb9yaV5sYUIGtZbgD9P99Z_SeeS0JGdak5KzYZY61JG2HOjvYV-gRIohXiZ8dVVGoOePABY94vI5awVK9RPxChlkm7RL6cq_LsbyHtlx7qKdH6VTws0AQjfJ4supmRCpi4A2zCve93Pwtx0DJ_5NQ3NcQqcspb43qkJdW_O6tW10c9WxG4FrmCSD_bhWV-st33CzR7XLPduaKqL0DO0hahMTVYbtT6ipbcoTwkyVTrmiQJjTwYpdKUwTxs44L18Tp0_UeRyI4Jm3_Pdidn35DNjYAzG6cTiMDTR5mHlGFo_mFK_Clmr4p44w4VaKGYJ3g";
@Injectable({
  providedIn: 'root'
})
export class HomebankingService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/importar-excel`;
    return this.http.post(endpoint, formData, { headers });
  }

  downloadTxtBanelco(nameFile: string){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/descargar-base/${nameFile}`;
    return this.http.get(endpoint, { headers, responseType: 'text' });
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

  downloadTxtLink(nameFile: string) {
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/descargar-baselink/${nameFile}`;
    return this.http.get(endpoint, { headers, responseType: 'arraybuffer', observe: 'response' });    
  }
  
}
