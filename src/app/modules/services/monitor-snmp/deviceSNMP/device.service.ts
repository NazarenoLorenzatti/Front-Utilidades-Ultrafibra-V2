import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/snmp"

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getDevices(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/listar-dispositivos`;
    return this.http.get(endpoint, { headers });
  }

  findDevice(idDevice: number){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/buscar-dispositivo/${idDevice}`;
    return this.http.get(endpoint, { headers });
  }

  saveDevice(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/guardar-dispositivo`;
    return this.http.post(endpoint, body, { headers });
  }

  editDevice(body: any){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/editar-dispositivo`;
    return this.http.put(endpoint, body, { headers });
  }

  
  deleteDevices(idDevice: number){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-dispositivo/${idDevice}`;
    return this.http.delete(endpoint, { headers });
  }

  getSnmpControl(){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/monitor-snmp`;
    return this.http.get(endpoint, { headers });
  }

}
