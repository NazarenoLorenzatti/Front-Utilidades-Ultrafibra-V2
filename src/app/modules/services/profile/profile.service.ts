import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1/usuario"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public token: any;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  getUser(idUsuario: number) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/buscar-usuario/${idUsuario}`;
    return this.http.get(endpoint, { headers });
  }

  deleteUser(idUsuario: number) {
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/eliminar-usuario/${idUsuario}`;
    return this.http.delete(endpoint, { headers });
  }

  saveUser(body: any) {

    if (body.idHost !== null) {
      console.log(body);
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/crear-usuario`;
      return this.http.post(endpoint, body, { headers });
    } else {
      const headers = {
        Authorization: 'Bearer ' + this.token,
      };
      const endpoint = `${base_url}/actualizar-usuario`;
      return this.http.put(endpoint, body, { headers });
    }
  }

  uploadPic(formData: FormData){
    const headers = {
      Authorization: 'Bearer ' + this.token,
    };
    const endpoint = `${base_url}/subir-foto-perfil`;
    return this.http.put(endpoint, formData, { headers });
  }

}
