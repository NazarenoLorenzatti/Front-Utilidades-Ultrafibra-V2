import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = "http://localhost:8080/api/v1/hosts"
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcwMzI2MTA5Nn0.a4njYoPTbMgGn_xjB2Tp886puo0GPM5oLfrVAiBQWaHV-zMGLi_HvkdiVrWQpS6ze1w7gsNXrcYKRRU-2rLsg4hny3wxe2ox-gv2eXR3WYi95LJUk1SFHCqKCeSJAUV8lI2tReK08-xZG012O5NPBoi0qsXJrV6eOMSHwCMQUjTAm4hqZgp3PSjS8gaml9qjeg-Q7bCYoPJW2mKbQAfDu02GuDyQgkJFJAlbOzOe7Dozg1F6nrg8lr5S2S1wqW-5_UActmDpm_30hb9uJf-jSh7MY7iJWjsnTxqJ0bW14lBFWTQuBY7L4s5ttTDCNpNTdw5Suc-uHwMwb-vTJKZbyQ";
@Injectable({
  providedIn: 'root'
})
export class HostsService {

  constructor(private http: HttpClient) { }

  getHosts(){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/listar-host`;
    return this.http.get(endpoint, { headers });
  }

  saveHost(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/guardar-host`;
    return this.http.post(endpoint, body, { headers });
  }
  
  newPing(ipHost: string){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/hacer-ping/${ipHost}`;
    return this.http.get(endpoint, { headers });
  }

  deleteHost(idHost: number){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/eliminar-host/${idHost}`;
    return this.http.delete(endpoint, { headers });
  }

  editHost(body: any){
    const headers = {
      Authorization: 'Bearer ' + token,
      //Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    const endpoint = `${base_url}/editar-host`;
    return this.http.put(endpoint, body, { headers });
  }
}
