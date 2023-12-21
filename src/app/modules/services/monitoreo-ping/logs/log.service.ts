import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/logs"

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwMzI2MTA5Nn0.a4njYoPTbMgGn_xjB2Tp886puo0GPM5oLfrVAiBQWaHV-zMGLi_HvkdiVrWQpS6ze1w7gsNXrcYKRRU-2rLsg4hny3wxe2ox-gv2eXR3WYi95LJUk1SFHCqKCeSJAUV8lI2tReK08-xZG012O5NPBoi0qsXJrV6eOMSHwCMQUjTAm4hqZgp3PSjS8gaml9qjeg-Q7bCYoPJW2mKbQAfDu02GuDyQgkJFJAlbOzOe7Dozg1F6nrg8lr5S2S1wqW-5_UActmDpm_30hb9uJf-jSh7MY7iJWjsnTxqJ0bW14lBFWTQuBY7L4s5ttTDCNpNTdw5Suc-uHwMwb-vTJKZbyQ";
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  getLogs(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/buscar-log`;
    return this.http.post(endpoint,  body,  { headers });
  }

  getLogsForMonth(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/buscar-log-mes`;
    return this.http.post(endpoint, body,  { headers });
  }

  getLastLog(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/ultimo-log`;
    return this.http.post(endpoint, body,  { headers });
  }

}
