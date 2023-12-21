import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/eventos"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwMjg0OTczM30.ZGmU6lnMPdq31Y3mAt0HdNAkUXptIFwG2_m2dchQfApPqBb7mx80lrS_PfuWcT_FpM_dd6nZBgAHUnHd5MQ4Xvet7UAzGqn6vLBSnUpgoBrsF789Yeb4OJNcXMECMBObThnGit0OQ9uAigV0eZisZ-KOBcQUPWPvCGqYY1EIzGzWGv5ZZ4CXzmYOT9Q8YPugg3QGEgMfBUV80JXIe9X4p7X837GANy-bhaLGDLvF5XNNiRmPYElHy3RX6imEXL-0Kn3bOioV30dGN2WuLU_SKP3Adf02oR3hKoP7uv7VG69pM4Tj2yBIWtOfCWMmm51mEipIlP6mLVqURHnVGag4EA";
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
}
